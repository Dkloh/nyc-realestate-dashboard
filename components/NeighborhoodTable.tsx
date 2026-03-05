import { SaleRecord } from "@/lib/api";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function NeighborhoodTable({ sales }: { sales: SaleRecord[] }) {
  const byNeighborhood: Record<string, number[]> = {};

  const allPrices = sales
    .map((s) => parseInt(s.sale_price))
    .filter((p) => p > 10000)
    .sort((a, b) => a - b);

  const q1 = allPrices[Math.floor(allPrices.length * 0.25)];
  const q3 = allPrices[Math.floor(allPrices.length * 0.75)];
  const iqr = q3 - q1;
  const upper = q3 + 1.5 * iqr;

  sales.forEach((s) => {
    const price = parseInt(s.sale_price);
    if (price < 10000 || price > upper) return;
    const n = s.neighborhood;
    if (!byNeighborhood[n]) byNeighborhood[n] = [];
    byNeighborhood[n].push(price);
  });

  const rows = Object.entries(byNeighborhood)
    .map(([neighborhood, prices]) => ({
      neighborhood,
      sales: prices.length,
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      median: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)],
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mt-6">
      <h2 className="text-white font-semibold mb-4">Top Neighborhoods by Sales Volume</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="text-left py-2 pr-4">Neighborhood</th>
              <th className="text-right py-2 pr-4">Sales</th>
              <th className="text-right py-2 pr-4">Avg Price</th>
              <th className="text-right py-2">Median Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.neighborhood} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                <td className="py-3 pr-4 text-white font-medium">{row.neighborhood}</td>
                <td className="py-3 pr-4 text-right text-gray-300">{row.sales}</td>
                <td className="py-3 pr-4 text-right text-gray-300">{formatCurrency(row.avg)}</td>
                <td className="py-3 text-right text-gray-300">{formatCurrency(row.median)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}