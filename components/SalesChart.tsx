"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SaleRecord } from "@/lib/api";

function formatMonth(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function formatPrice(value: number) {
  return `$${(value / 1000).toFixed(0)}k`;
}

export default function SalesChart({ sales }: { sales: SaleRecord[] }) {
  const byMonth: Record<string, number[]> = {};

  sales.forEach((s) => {
    const price = parseInt(s.sale_price);
    if (price < 10000) return;
    const month = formatMonth(s.sale_date);
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(price);
  });

  const data = Object.entries(byMonth).map(([month, prices]) => ({
    month,
    avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
  }));

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mt-6">
      <h2 className="text-white font-semibold mb-4">Average Sale Price by Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9CA3AF" tickFormatter={formatPrice} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Avg Price"]}
            contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }}
            labelStyle={{ color: "#F9FAFB" }}
          />
          <Line type="monotone" dataKey="avg" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}