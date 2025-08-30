// Service Worker for continuous location tracking
const CACHE_NAME = 'location-tracker-v1';
const LOCATION_STORAGE_KEY = 'backgroundLocationData';

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

// Background sync for location tracking
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-location-sync') {
    console.log('Background sync triggered for location tracking');
    event.waitUntil(handleBackgroundLocationSync());
  }
});

// Handle background location sync
async function handleBackgroundLocationSync() {
  try {
    const location = await getCurrentLocation();
    if (location) {
      await storeLocationData(location);
      await sendLocationToAPI(location);
      await notifyClients('location-updated', location);
    }
  } catch (error) {
    console.error('Background location sync failed:', error);
  }
}

// Get current location using geolocation API
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          id: Date.now().toString(),
          googleMapsUrl: `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&z=15`
        };
        resolve(locationData);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Store location data in IndexedDB
async function storeLocationData(locationData) {
  try {
    const existingData = await getStoredLocationData();
    existingData.push(locationData);
    
    // Keep only last 50 locations
    if (existingData.length > 50) {
      existingData.splice(0, existingData.length - 50);
    }
    
    await setStoredLocationData(existingData);
    console.log('Location data stored in background:', locationData);
  } catch (error) {
    console.error('Failed to store location data:', error);
  }
}

// Send location to API
async function sendLocationToAPI(locationData) {
  try {
    const response = await fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData)
    });
    
    if (response.ok) {
      console.log('Location sent to API successfully');
    } else {
      console.error('API request failed:', response.status);
    }
  } catch (error) {
    console.error('Failed to send location to API:', error);
    await storeFailedLocationData(locationData);
  }
}

// Store failed API requests for retry
async function storeFailedLocationData(locationData) {
  try {
    const failedData = await getFailedLocationData();
    failedData.push(locationData);
    await setFailedLocationData(failedData);
  } catch (error) {
    console.error('Failed to store failed location data:', error);
  }
}

// IndexedDB operations
async function getStoredLocationData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LocationTrackerDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['locations'], 'readonly');
      const store = transaction.objectStore('locations');
      const getRequest = store.get('locationData');
      
      getRequest.onsuccess = () => {
        resolve(getRequest.result || []);
      };
      getRequest.onerror = () => reject(getRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('locations')) {
        db.createObjectStore('locations');
      }
    };
  });
}

async function setStoredLocationData(data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LocationTrackerDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['locations'], 'readwrite');
      const store = transaction.objectStore('locations');
      const putRequest = store.put(data, 'locationData');
      
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('locations')) {
        db.createObjectStore('locations');
      }
    };
  });
}

async function getFailedLocationData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LocationTrackerDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['failedLocations'], 'readonly');
      const store = transaction.objectStore('failedLocations');
      const getRequest = store.get('failedData');
      
      getRequest.onsuccess = () => {
        resolve(getRequest.result || []);
      };
      getRequest.onerror = () => reject(getRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('failedLocations')) {
        db.createObjectStore('failedLocations');
      }
    };
  });
}

async function setFailedLocationData(data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LocationTrackerDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['failedLocations'], 'readwrite');
      const store = transaction.objectStore('failedLocations');
      const putRequest = store.put(data, 'failedData');
      
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('failedLocations')) {
        db.createObjectStore('failedLocations');
      }
    };
  });
}

// Notify all clients about location updates
async function notifyClients(type, data) {
  try {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: type,
        data: data,
        timestamp: Date.now()
      });
    });
  } catch (error) {
    console.error('Failed to notify clients:', error);
  }
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'START_BACKGROUND_TRACKING':
      console.log('Starting background location tracking');
      startBackgroundTracking();
      break;
    case 'STOP_BACKGROUND_TRACKING':
      console.log('Stopping background location tracking');
      stopBackgroundTracking();
      break;
    case 'GET_STORED_LOCATIONS':
      getStoredLocationData().then(locations => {
        event.ports[0].postMessage({ type: 'STORED_LOCATIONS', data: locations });
      });
      break;
  }
});

let backgroundTrackingInterval;

function startBackgroundTracking() {
  // Clear any existing interval
  if (backgroundTrackingInterval) {
    clearInterval(backgroundTrackingInterval);
  }
  
  // Start tracking every 30 seconds
  backgroundTrackingInterval = setInterval(async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        await storeLocationData(location);
        await sendLocationToAPI(location);
        await notifyClients('location-updated', location);
      }
    } catch (error) {
      console.error('Background tracking error:', error);
    }
  }, 30000); // 30 seconds
  
  console.log('Background location tracking started');
}

function stopBackgroundTracking() {
  if (backgroundTrackingInterval) {
    clearInterval(backgroundTrackingInterval);
    backgroundTrackingInterval = null;
    console.log('Background location tracking stopped');
  }
}

// Retry failed API requests
setInterval(async () => {
  try {
    const failedData = await getFailedLocationData();
    if (failedData.length > 0) {
      console.log(`Retrying ${failedData.length} failed location requests`);
      
      for (const locationData of failedData) {
        try {
          await sendLocationToAPI(locationData);
          // Remove from failed data if successful
          const updatedFailedData = failedData.filter(item => item.id !== locationData.id);
          await setFailedLocationData(updatedFailedData);
        } catch (error) {
          console.error('Retry failed for location:', locationData.id);
        }
      }
    }
  } catch (error) {
    console.error('Failed to retry location requests:', error);
  }
}, 60000); // Retry every minute
