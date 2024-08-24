"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface WeatherData {
  localityName: string;
  cityName: string;
  temperature: number | null;
  humidity: number | null;
  wind_speed: number | null;
  wind_direction: number | null;
  rain_intensity: number | null;
  rain_accumulation: number | null;
}

export default function WeatherContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const localityId = searchParams.get("locality_id");
      if (localityId) {
        try {
          setIsLoading(true);
          const response = await fetch(
            `/api/weather?locality_id=${localityId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather:", error);
          setError("An error occurred while fetching weather data.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchWeather();
  }, [searchParams]);

  const formatValue = (value: number | null, unit: string): string => {
    if (value === null) return "Not available";
    return `${value.toFixed(1)}${unit}`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white justify-center py-2">
      {isLoading && <p className="text-xl mb-4">Loading weather data...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!isLoading && weatherData && (
        <div className="text-xl">
          <h2 className="text-3xl font-bold mb-4">
            {weatherData.localityName}, {weatherData.cityName}
          </h2>
          <p className="mb-2">
            Temperature: {formatValue(weatherData.temperature, "°C")}
          </p>
          <p className="mb-2">
            Humidity: {formatValue(weatherData.humidity, "%")}
          </p>
          <p className="mb-2">
            Wind Speed: {formatValue(weatherData.wind_speed, " m/s")}
          </p>
          <p className="mb-2">
            Wind Direction: {formatValue(weatherData.wind_direction, "°")}
          </p>
          <p className="mb-2">
            Rain Intensity: {formatValue(weatherData.rain_intensity, " mm/hr")}
          </p>
          <p className="mb-2">
            Rain Accumulation:{" "}
            {formatValue(weatherData.rain_accumulation, " mm")}
          </p>
        </div>
      )}
      <button
        onClick={() => router.push("/")}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search Again
      </button>
    </div>
  );
}
