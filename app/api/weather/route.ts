import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { localities } from "@/lib/localities";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locality_id = searchParams.get("locality_id");

  if (!locality_id) {
    return NextResponse.json(
      { error: "Locality ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
      {
        params: { locality_id },
        headers: {
          "X-Zomato-Api-Key": process.env.ZOMATO_API_KEY,
        },
      }
    );

    if (response.data.status == 200) {
      const locality = localities.find((l) => l.localityId === locality_id);
      if (locality) {
        const weatherData = {
          ...response.data.locality_weather_data,
          localityName: locality.localityName,
          cityName: locality.cityName,
        };
        return NextResponse.json(weatherData);
      } else {
        return NextResponse.json(
          { error: "Locality information not found." },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Failed to fetch weather data. Please try again." },
        { status: response.data.status }
      );
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching weather data." },
      { status: 500 }
    );
  }
}
