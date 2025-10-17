"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        "http://localhost/btc/api/admin/get_transactions.php",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions);
        setFiltered(data.transactions);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ Update transaction status
  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost/btc/api/admin/update_transaction.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        }
      );
      const result = await res.json();
      if (result.success) {
        alert(result.message);
        // Update local state
        setTransactions((prev) =>
          prev.map((tx) =>
            tx.id === id ? { ...tx, status: result.updated_status } : tx
          )
        );
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Error updating transaction");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter & Search Logic
  useEffect(() => {
    let filteredData = [...transactions];

    if (statusFilter !== "all") {
      filteredData = filteredData.filter((tx) => tx.status === statusFilter);
    }

    if (searchQuery.trim() !== "") {
      filteredData = filteredData.filter(
        (tx) =>
          tx.user_id.toString().includes(searchQuery) ||
          (tx.email &&
            tx.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFiltered(filteredData);
  }, [transactions, statusFilter, searchQuery]);

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/admin")}
        className="text-white bg-blue-700 p-2 my-3 w-[200px] rounded-xl"
      >
        {" "}
        go back
      </button>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
         Manage Transactions
      </h2>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user ID or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg p-2 w-64"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="failed">Failed</option>
        </select>

        <button
          onClick={fetchTransactions}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* 📊 Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">User ID</th>
              <th className="border p-3">Plan</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="border p-3">{tx.id}</td>
                  <td className="border p-3">{tx.user_id}</td>
                  <td className="border p-3">{tx.plan_name}</td>
                  <td className="border p-3">${tx.amount}</td>
                  <td className="border p-3">{tx.status}</td>
                  <td className="border p-3">
                    <select
                      value={tx.status}
                      onChange={(e) => updateStatus(tx.id, e.target.value)}
                      disabled={loading}
                      className="border p-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
