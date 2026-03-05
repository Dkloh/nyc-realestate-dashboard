# NYC Real Estate Market Dashboard

A full stack web application that visualizes NYC real estate sales data using the NYC Open Data API.

Built to demonstrate real-world data analysis skills combined with 10+ years of professional real estate experience.

## Live Demo
[nyc-realestate-dashboard.vercel.app](https://nyc-realestate-dashboard.vercel.app)

## Features
- Browse market data by borough (Manhattan, Brooklyn, Queens, Bronx, Staten Island)
- Key stats: median sale price, average price per square foot, total sales
- Line chart showing average sale price trends over the last 12 months
- Neighborhood breakdown table with sort toggle (by sales volume or median price)
- IQR-based outlier filtering to remove anomalous transactions
- Rolling 12-month date window — always current, no manual updates needed

## Tech Stack
- **Framework:** Next.js 16 + TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Data:** NYC Open Data — Rolling Calendar Sales API
- **Deployment:** Vercel

## Data Notes
- Source: [NYC Citywide Rolling Calendar Sales](https://data.cityofnewyork.us/City-Government/NYC-Citywide-Rolling-Calendar-Sales/usep-8jbt)
- Filters out non-arm's length transfers (sales under $10,000)
- Applies IQR outlier detection to remove statistical anomalies
- NYC Open Data has a 1-3 month reporting lag, so the most recent month shown may not reflect current market conditions

## Local Development
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Author
Derek — [GitHub](https://github.com/Dkloh) · [LinkedIn](https://linkedin.com/in/)