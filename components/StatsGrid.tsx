type Stats = {
  median: number;
  avgPsf: number;
  totalSales: number;
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function StatsGrid({ stats }: { stats: Stats }) {
  const items = [
    { label: "Median Sale Price", value: formatCurrency(stats.median) },
    { label: "Avg Price per Sqft", value: formatCurrency(stats.avgPsf) },
    { label: "Total Sales (dataset)", value: stats.totalSales.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((stat) => (
        <div key={stat.label} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 text-sm">{stat.label}</p>
          <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}