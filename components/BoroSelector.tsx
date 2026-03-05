"use client";

import { useRouter } from "next/navigation";

const BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];

export default function BoroSelector({ selected }: { selected: string }) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-3">Select Borough</h2>
      <div className="flex gap-3 flex-wrap">
        {BOROUGHS.map((boro) => (
          <button
            key={boro}
            onClick={() => router.push(`/?borough=${boro}`)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selected === boro
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {boro}
          </button>
        ))}
      </div>
    </div>
  );
}