// app/actions.ts
"use server";

import axios from "axios";
import { localities } from "@/lib/localities";

export async function fetchWeatherData(localityId: string) {
  try {
    const response = await axios.get(
      "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
      {
        params: { locality_id: localityId },
        headers: {
          "X-Zomato-Api-Key": process.env.ZOMATO_API_KEY,
        },
      }
    );

    if (response.data.status == 200) {
      const locality = localities.find((l) => l.localityId === localityId);
      if (locality) {
        return {
          ...response.data.locality_weather_data,
          localityName: locality.localityName,
          cityName: locality.cityName,
        };
      } else {
        throw new Error("Locality information not found.");
      }
    } else {
      throw new Error("Failed to fetch weather data. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("An error occurred while fetching weather data.");
  }
}
