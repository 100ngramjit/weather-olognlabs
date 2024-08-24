"use client";

import { Suspense } from "react";
import WeatherContent from "./weather-content";

export default function WeatherPage() {
  return (
    <Suspense
      fallback={<p className="text-xl mb-4">Loading weather data...</p>}
    >
      <WeatherContent />
    </Suspense>
  );
}
