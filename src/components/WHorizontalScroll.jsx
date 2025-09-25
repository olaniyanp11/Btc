import Image from "next/image";
import { CgArrowDown } from "react-icons/cg";

const coins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$113,000.89",
    change: "+216.31 (0.19%)",
    changeType: "up",
    icon: "/images/bit.png",
  },
  {
    name: " Bitcoin Gold ",
    symbol: "BTG",
    price: "$1.1385",
    change: "-0.3597 (-24.01%)",
    changeType: "down",
    icon: "/images/bit-g.png",
  },
  {
    name: " Dash ",
    symbol: "DASH",
    price: "$21.26",
    change: "+0.1181 (0.56%)",
    changeType: "up",
    icon: "/images/dash.png",
  },
  {
    name: "Ethereum Classic",
    symbol: "ETC",
    price: "$4,195.52 ",
    change: "$18.98  0.3605 (1.94%)",
    changeType: "down",
    icon: "/images/eth.png",
  },
  {
    name: "Ethereum ",
    symbol: "ETH",
    price: "$4,195.52 ",
    change: "-0.5932 (-0.01%)",
    changeType: "down",
    icon: "/images/eth (2).png",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: "$180.25",
    change: "+5.01 (0.45%)",
    changeType: "up",
    icon: "/images/lit.png",
  },
  {
    name: "Tether ",
    symbol: "USDT",
    price: "$1.0007  ",
    change: "-0.00019117 (-0.02%)",
    changeType: "down",
    icon: "/images/lit.png",
  },
  {
    name: "Monero  ",
    symbol: "XMR",
    price: "$292.43",
    change: "-6.7721 (-2.26%)",
    changeType: "down",
    icon: "/images/XMR.png",
  },
  {
    name: "XRP ",
    symbol: "XRP",
    price: "$2.8638",
    change: "0.01589013 (0.56%)",
    changeType: "up",
    icon: "/images/xrp.png",
  },
  {
    name: "Solana ",
    symbol: "SOL",
    price: "$219.96 ",
    change: "-3.0960 (-1.39%)",
    changeType: "down",
    icon: "/images/SOL.png",
  },
  {
    name: "Binance Coin ",
    symbol: "BNB",
    price: "$1,018.70 ",
    change: "-3.5358 (-0.35%)",
    changeType: "down",
    icon: "/images/SOL.png",
  },
  {
    name: "TRON",
    symbol: "TRX",
    price: "$0.3360",
    change: "-0.00514510 (-1.51%)",
    changeType: "down",
    icon: "/images/SOL.png",
  },
];

const WHorizontalScroll = () => {
  return (
    <div className="bg-white py-2  w-full overflow-x-hidden text-blue-600">
      <div className="flex animate-scroll hover:animate-none whitespace-nowrap">
        {coins.map((coin, i) => (
          <div key={i} className="flex flex-col items-start px-3">
            {/* Coin Header */}
            <div className="flex items-center text-sm font-medium mb-1">
              <Image
                src={coin.icon}
                alt={coin.symbol}
                width={20}
                height={20}
                className="inline-block mr-2 rounded-lg"
              />
              {coin.name} ({coin.symbol})
            </div>

            {/* Coin Price + Change */}
            <div className="flex items-center space-x-2 text-sm">
              <span>{coin.price}</span>
              <span
                className={`flex items-center font-semibold ${
                  coin.changeType === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                <CgArrowDown
                  className={`${
                    coin.changeType === "up" ? "rotate-180" : ""
                  } mr-1`}
                />
                {coin.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WHorizontalScroll;
