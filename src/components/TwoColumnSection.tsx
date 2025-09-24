"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type CryptoRow = {
  name: string;
  price: string;
  marketCap: string;
};

export default function TwoColumnSection() {
  const [tableData, setTableData] = useState<CryptoRow[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  // ✅ Fetch table data (prices + market cap)
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dash,litecoin"
        );
        const data = await res.json();

        const formatted = data.map((coin: any) => ({
          name: coin.name,
          price: `$ ${coin.current_price.toLocaleString()}`,
          marketCap: `$ ${coin.market_cap.toLocaleString()}`,
        }));

        setTableData(formatted);
      } catch (err) {
        console.error("Error fetching table data:", err);
      }
    };

    fetchTableData();
  }, []);

  // ✅ Fetch chart data (Bitcoin last 24h)
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly"
        );
        const data = await res.json();

        const formatted = data.prices.map((p: [number, number]) => ({
          time: new Date(p[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: p[1],
        }));

        setChartData(formatted);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Left Column - Video */}
      <div className="w-full">
        <video
          src="/sample.mp4"
          controls
          autoPlay
          loop
          muted
          className="rounded-xl shadow-lg w-full"
        />
      </div>

      {/* Right Column - Chart + Table */}
      <div className="flex flex-col space-y-6">
        {/* Chart */}
        <div className="w-full h-64 bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">Bitcoin (24h)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
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
