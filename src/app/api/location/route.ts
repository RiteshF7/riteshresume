import { NextRequest, NextResponse } from 'next/server';

// API endpoint to get location data
export async function GET() {
  try {
    // In a real application, you would get this from a database
    // For now, we'll return a mock response since localStorage is client-side only
    return NextResponse.json({
      success: true,
      message: 'Location API endpoint ready. Use POST to store location data.',
      data: null
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch location data' },
      { status: 500 }
    );
  }
}

// API endpoint to store location data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, timestamp } = body;

    if (!latitude || !longitude) {
      return NextResponse.json(
        { success: false, error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // In a real application, you would store this in a database
    // For now, we'll just return success
    const locationData = {
      latitude,
      longitude,
      timestamp: timestamp || new Date().toISOString(),
      id: Date.now().toString(),
      googleMapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}&z=15`
    };

    return NextResponse.json({
      success: true,
      message: 'Location data received',
      data: locationData
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to store location data' },
      { status: 500 }
    );
  }
}
