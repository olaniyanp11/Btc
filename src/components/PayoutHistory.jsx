"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PayoutHistory = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

  // Fetch payouts from DB
  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const res = await fetch(`${dbUrl}/get_payouts.php`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          setPayouts(data.data);
        } else {
          console.error("Error fetching payouts:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayouts();
  }, [dbUrl]);

  return (
    <section className="max-w-full mx-auto px-1 py-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Instant Payout History
      </h2>

      {loading ? (
        <p className="text-center">Loading payouts...</p>
      ) : payouts.length === 0 ? (
        <p className="text-center text-gray-500">No payouts found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-lg">
            <thead className="bg-primary text-white py-3">
              <tr>
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
                  key={p.id}
                  className={`${
                    i % 2 === 1
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } border-b py-3`}
                >
                  <td className="px-4 py-6">{p.user_id}</td>
                  <td className="px-4 py-6">{p.investment_plan}</td>
                  <td className="px-4 py-6">
                    ${Number(p.amount_invested).toLocaleString()}
                  </td>
                  <td className="px-4 py-6">
                    ${Number(p.total_profits).toLocaleString()}
                  </td>
                  <td className="px-4 py-6">{p.payout_date}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      p.payout_status === "Paid"
                        ? "text-green-400"
                        : "text-red-600"
                    }`}
                  >
                    {p.payout_status}
                  </td>
                  <td className="px-4 py-2">{p.transaction_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
