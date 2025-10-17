"use client";

import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const ranges = [
  { label: "1h", value: "1h" },
  { label: "24h", value: "1" },
  { label: "7d", value: "7" },
  { label: "1m", value: "30" },
  { label: "6m", value: "180" },
  { label: "1y", value: "365" },
  { label: "5y", value: "1825" },
  { label: "max", value: "max" },
];

export default function TwoColumnSection() {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("1"); // default 24h

  // Fetch table data (prices + market cap)
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dash,litecoin"
        );
        if (!res.ok) throw new Error("Failed to fetch table data");
        const data = await res.json();

        const formatted = data.map((coin) => ({
          name: coin.name,
          price: `$${coin.current_price.toLocaleString()}`,
          marketCap: `$${coin.market_cap.toLocaleString()}`,
        }));

        setTableData(formatted);
      } catch (err) {
        console.error("❌ Error fetching table data:", err);
      }
    };

    fetchTableData();
  }, []);

  // Fetch chart data depending on range
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        let url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${range}`;

        if (range === "1h") {
          url =
            "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=minute";
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch chart data");
        const data = await res.json();

        if (!data.prices) {
          console.error("⚠️ Chart data missing:", data);
          return;
        }

        const formatted = data.prices.map((p) => ({
          time:
            range === "1" || range === "1h"
              ? new Date(p[0]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : new Date(p[0]).toLocaleDateString(),
          price: p[1],
        }));

        setChartData(formatted);
      } catch (err) {
        console.error("❌ Error fetching chart data:", err);
      }
    };

    fetchChartData();
  }, [range]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Left Column - Video */}
      <div className="w-full">
        <iframe
          src="https://www.youtube.com/embed/YYcwS98_L8s?autoplay=1&mute=1&loop=1&controls=1&playlist=YYcwS98_L8s"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-xl shadow-lg w-full h-64 md:h-full"
        />
      </div>

      {/* Right Column - Chart + Table */}
      <div className="flex flex-col space-y-6">
        {/* Chart */}
        <div className="w-full bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">Bitcoin</h2>
            <div className="flex gap-2">
              {ranges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r.value)}
                  className={`px-2 py-1 rounded text-sm ${
                    range === r.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">Crypto Prices</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Name</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((coin, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{coin.name}</td>
                  <td className="py-2">{coin.price}</td>
                  <td className="py-2">{coin.marketCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
