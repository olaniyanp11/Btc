"use client";

import { useEffect, useState } from "react";
import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";

type OHLCPoint = {
  date: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

const BitcoinChart = () => {
  const [mode, setMode] = useState<"area" | "candlestick">("area");
  const [chartData, setChartData] = useState<OHLCPoint[]>([]);

  // ✅ Fetch dynamic OHLC data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=365"
        );
        if (!res.ok) throw new Error("Failed to fetch chart data");
        const data: [number, number, number, number, number][] =
          await res.json();

        const formatted: OHLCPoint[] = data.map((d) => ({
          date: new Date(d[0]).toLocaleDateString(),
          open: d[1],
          high: d[2],
          low: d[3],
          close: d[4],
          price: d[4], // for area chart
        }));

        setChartData(formatted);
      } catch (err) {
        console.error("❌ Error fetching OHLC data:", err);
      }
    };

    fetchData();
  }, []);


  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Bitcoin Price Chart
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6">
        {/* ✅ Price summary header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="text-3xl font-bold text-primary">
            {chartData.length > 0
              ? `$${chartData[chartData.length - 1].close.toLocaleString()}`
              : "--"}
            {chartData.length > 1 && (
              <span className="text-green-600 text-lg font-semibold ml-2">
                {(
                  ((chartData[chartData.length - 1].close - chartData[0].open) /
                    chartData[0].open) *
                  100
                ).toFixed(2)}
                %
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <button
              onClick={() => setMode("area")}
              className={`px-4 py-1 border border-gray-300 rounded-md text-sm ${
                mode === "area"
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Log
            </button>
            <button
              onClick={() => setMode("candlestick")}
              className={`px-4 py-1 border border-gray-300 rounded-md text-sm ${
                mode === "candlestick"
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              OHLC
            </button>
          </div>
        </div>

        {/* ✅ Date range row */}
        {chartData.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>{chartData[0].date}</span>
            <span>{chartData[chartData.length - 1].date}</span>
          </div>
        )}

        {/* ✅ Main chart */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            {mode === "candlestick" ? (
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#374151" />
                <YAxis
                  stroke="#374151"
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                />
                <Tooltip />
                {/* Simulated candlestick with bars */}
                <Bar dataKey="high" fill="#16a34a" barSize={6} />
                <Bar dataKey="low" fill="#dc2626" barSize={6} />
                <Line type="monotone" dataKey="close" stroke="#2563eb" />
              </ComposedChart>
            ) : (
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#374151" />
                <YAxis
                  stroke="#374151"
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(val: number) => [
                    `$${val.toLocaleString()}`,
                    "Price",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  fill="#93c5fd"
                  fillOpacity={0.4}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default BitcoinChart;
