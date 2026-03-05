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
  const url = `https://data.cityofnewyork.us/resource/usep-8jbt.json?borough=${code}&$where=sale_price>'10000'&$limit=500&$order=sale_date%20DESC`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch sales data");
  return res.json();
}

export function calcStats(sales: SaleRecord[]) {
  const prices = sales
    .map((s) => parseInt(s.sale_price))
    .filter((p) => p > 10000)
    .sort((a, b) => a - b);

  const sqftPrices = sales
    .filter((s) => parseInt(s.gross_square_feet) > 0)
    .map((s) => parseInt(s.sale_price) / parseInt(s.gross_square_feet))
    .filter((p) => p > 0);

  const median = prices[Math.floor(prices.length / 2)] ?? 0;
  const avgPsf = sqftPrices.reduce((a, b) => a + b, 0) / sqftPrices.length || 0;

  return {
    median,
    avgPsf,
    totalSales: prices.length,
  };
}