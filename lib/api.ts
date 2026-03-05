import { mockSales } from "./mockData";

export type SaleRecord = {
  borough: string;
  neighborhood: string;
  building_class_category: string;
  address: string;
  zip_code: string;
  sale_price: string;
  sale_date: string;
  gross_square_feet: string;
  residential_units: string;
};

const BOROUGH_CODES: Record<string, string> = {
  Manhattan: "1",
  Bronx: "2",
  Brooklyn: "3",
  Queens: "4",
  "Staten Island": "5",
};

export async function getSalesByBorough(borough: string): Promise<SaleRecord[]> {
  if (process.env.NODE_ENV === "development") {
    const code = BOROUGH_CODES[borough];
    return mockSales.filter((s) => s.borough === code);
  }

  const code = BOROUGH_CODES[borough];
  const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
const dateFilter = oneYearAgo.toISOString().split("T")[0];

const url = `https://data.cityofnewyork.us/resource/usep-8jbt.json?borough=${code}&$where=sale_price>'10000' AND sale_date>'${dateFilter}T00:00:00.000'&$limit=5000&$order=sale_date%20DESC`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch sales data");
  return res.json();
}

export function calcStats(sales: SaleRecord[]) {
  const prices = sales
    .map((s) => parseInt(s.sale_price))
    .filter((p) => p > 10000)
    .sort((a, b) => a - b);

  // IQR outlier filtering
  const q1 = prices[Math.floor(prices.length * 0.25)];
  const q3 = prices[Math.floor(prices.length * 0.75)];
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;
  const filtered = prices.filter((p) => p >= lower && p <= upper);

  const sqftPrices = sales
    .filter((s) => parseInt(s.gross_square_feet) > 0)
    .map((s) => parseInt(s.sale_price) / parseInt(s.gross_square_feet))
    .filter((p) => p > 0 && p < 10000);

  const median = filtered[Math.floor(filtered.length / 2)] ?? 0;
  const avgPsf = sqftPrices.reduce((a, b) => a + b, 0) / sqftPrices.length || 0;

  return {
    median,
    avgPsf,
    totalSales: filtered.length,
  };
}