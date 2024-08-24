"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { localities } from "@/lib/localities";

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { cityName: string; localityName: string; localityId: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 2) {
      const filteredLocalities = localities.filter((locality) =>
        locality.localityName.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredLocalities);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (localityId: string) => {
    router.push(`/weather?locality_id=${encodeURIComponent(localityId)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-xl px-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a locality"
            className="w-full px-5 py-3 text-base text-gray-700 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.localityId}
                  onClick={() => handleSearch(suggestion.localityId)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion.localityName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            disabled={query.length === 0}
            onClick={() => handleSearch(suggestions[0]?.localityId)}
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-transparent rounded-md hover:border-gray-300 disabled:text-gray-300"
          >
            Weather Search
          </button>
          <button
            onClick={() => {
              const randomLocality =
                localities[Math.floor(Math.random() * localities.length)];
              handleSearch(randomLocality.localityId);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-transparent rounded-md hover:border-gray-300"
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </div>
    </div>
  );
}
