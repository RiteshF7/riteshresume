import { NextResponse } from 'next/server';

// API endpoint to display/retrieve stored location data
export async function GET() {
  try {
    // In a real application, this would fetch from a database
    // For demonstration, we'll return sample data
    const sampleLocationData = {
      locations: [
        {
          id: '1',
          latitude: 40.7128,
          longitude: -74.0060,
          timestamp: new Date().toISOString(),
          address: 'New York, NY, USA',
          googleMapsUrl: `https://www.google.com/maps?q=40.7128,-74.0060&z=15`
        }
      ],
      total: 1,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Location data retrieved successfully',
      data: sampleLocationData
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve location data' },
      { status: 500 }
    );
  }
}
