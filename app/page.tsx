import NeighborhoodTable from "@/components/NeighborhoodTable";
import SalesChart from "@/components/SalesChart";
import { getSalesByBorough, calcStats } from "@/lib/api";
import BoroSelector from "@/components/BoroSelector";
import StatsGrid from "@/components/StatsGrid";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ borough?: string }>;
}) {
  const { borough = "Manhattan" } = await searchParams;
  const sales = await getSalesByBorough(borough);
  const stats = calcStats(sales);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400">NYC Real Estate Dashboard</h1>
          <p className="text-gray-400 mt-2">Market insights powered by NYC Open Data</p>
        </div>
        <BoroSelector selected={borough} />
        <StatsGrid stats={stats} />
        <SalesChart sales={sales} />
        <NeighborhoodTable sales={sales} />
      </div>
    </main>
  );
}