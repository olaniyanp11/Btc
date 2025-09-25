"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CgArrowDown } from "react-icons/cg";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
};

const HorizontalScroll = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,bitcoin-gold,dash,ethereum-classic,ethereum,litecoin,tether,monero,xrp,solana,binancecoin,tron&order=market_cap_desc&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("❌ Error fetching coins:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary py-2 px-1 w-full overflow-x-hidden text-white">
      <div className="flex animate-scroll hover:animate-none whitespace-nowrap">
        {coins.length === 0 ? (
          <p className="text-sm text-gray-300 px-2">Loading prices...</p>
        ) : (
          coins.map((coin, i) => (
            <div key={i} className="flex flex-col items-start px-2">
              {/* Coin Header */}
              <div className="flex items-center text-sm mb-1">
                <Image
                  src={coin.image}
                  alt={coin.symbol}
                  width={20}
                  height={20}
                  className="inline-block mr-2 rounded-lg"
                />
                {coin.name} ({coin.symbol.toUpperCase()})
              </div>

              {/* Coin Price + Change */}
              <div className="flex items-center space-x-2 text-sm">
                <span>${coin.current_price.toLocaleString()}</span>
                <span
                  className={`flex items-center ${
                    coin.price_change_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <CgArrowDown
                    className={`${
                      coin.price_change_24h >= 0 ? "rotate-180" : ""
                    } mr-1`}
                  />
                  {coin.price_change_24h.toFixed(2)} (
                  {coin.price_change_percentage_24h.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HorizontalScroll;
