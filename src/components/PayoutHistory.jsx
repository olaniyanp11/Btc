"use client";

import Link from "next/link";

const payouts = [
  {
    userId: "CTG2836",
    plan: "Starter Plan",
    invested: 50,
    profits: 144,
    date: "24 September 2025",
    status: "Paid",
    transaction: "GTC457600421 TCG",
  },
  {
    userId: "CTG7542",
    plan: "Gold Plan",
    invested: 1527,
    profits: 810,
    date: "24 September 2025",
    status: "Paid",
    transaction: "GTC410579015 TCG",
  },
  {
    userId: "CTG4427",
    plan: "Silver Plan",
    invested: 7615,
    profits: 13385,
    date: "24 September 2025",
    status: "Paid",
    transaction: "GTC446739896 TCG",
  },
  {
    userId: "CTG906",
    plan: "Diamond Plan",
    invested: 7724,
    profits: 20384,
    date: "24 September 2025",
    status: "Paid",
    transaction: "GTC495382155 TCG",
  },
  {
    userId: "CTG5603",
    plan: "Starter Plan",
    invested: 471,
    profits: 346,
    date: "24 September 2025",
    status: "Paid",
    transaction: "GTC437070609 TCG",
  },
  {
    userId: "CTG2844",
    plan: "Gold Plan",
    invested: 967,
    profits: 1710,
    date: "24 September 2025",
    status: "Paid",
    transaction: "GTC462066182 TCG",
  },
  {
    userId: "CTG2786",
    plan: "Silver Plan",
    invested: 5794,
    profits: 13178,
    date: "24 September 2025",
    status: "Paid",
    transaction: "GTC419868652 TCG",
  },
];

const PayoutHistory = () => {
  return (
    <section className="max-w-full mx-auto px-1 py-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Instant Payout History
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-lg">
          <thead className="bg-primary text-white py-3">
            <tr className="">
              <th className="px-4 py-2 text-left">User Id</th>
              <th className="px-4 py-2 text-left">Investment Plan</th>
              <th className="px-4 py-2 text-left">Amount Invested</th>
              <th className="px-4 py-2 text-left">Total Profits</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Payout Status</th>
              <th className="px-4 py-2 text-left">Transaction Code</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 1
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } border-b py-3`}
              >
                <td className="px-4 py-6">{p.userId}</td>
                <td className="px-4 py-6">{p.plan}</td>
                <td className="px-4 py-6">${p.invested.toLocaleString()}</td>
                <td className="px-4 py-6">${p.profits.toLocaleString()}</td>
                <td className="px-4 py-6">{p.date}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    p.status === "Paid" ? "text-green-400" : "text-red-600"
                  }`}
                >
                  {p.status}
                </td>
                <td className="px-4 py-2">{p.transaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-center">
        <Link
          href={"/register"}
          className="mt-6 text-center text-lg font-medium bg-gradient-to-r from-primary to-accent p-3 text-white"
        >
          Start Receiving Automated Profits.
        </Link>
      </div>
    </section>
  );
};

export default PayoutHistory;
