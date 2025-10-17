"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiHome, FiLogOut, FiList, FiCreditCard, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

const VerticalSidebar = ({ user }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);

  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { id: "transactions", label: "Transactions History", icon: <FiList /> },
    { id: "addresses", label: "Addresses", icon: <FiCreditCard /> },
    { id: "account", label: "Account Details", icon: <FiUser /> },
    { id: "logout", label: "Logout", icon: <FiLogOut /> },
  ];

  const buttonClass = (tabId) =>
    `flex items-center gap-2 px-4 py-3 rounded-md font-semibold hover:border-accent hover:border cursor-pointer ${
      activeTab === tabId
        ? "border border-accent text-gray-700"
        : "text-gray-700"
    }`;

  const handleLogout = async () => {
    try {
      const res = await fetch(`${dbUrl}/logout.php`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("user");
        sessionStorage.clear();
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

const loadtransactions = async () => {
  if (!user?.id) return;
  try {
    const res = await fetch(`${dbUrl}/get_transactions.php?user_id=${user.id}`);
    const data = await res.json();

    if (data.success) {
      setTransactions(data.transactions);
    } else {
      toast.error(data.message || "Failed to load transactions");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error fetching transactions");
  }
};

 useEffect(() => {
   if (user?.id) {
     loadtransactions();
   }
 }, [user?.id]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 bg-gray-50 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200 text-center">
          <div className="text-xl font-bold">{user?.username || "User"}</div>
        </div>
        <div className="flex-1 flex flex-col">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={buttonClass(tab.id)}
              onClick={() =>
                tab.id === "logout" ? handleLogout() : setActiveTab(tab.id)
              }
            >
              {tab.icon}
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <p>
              Welcome back, {user?.username}! From your account dashboard you
              can view your recent Transactions History, manage your . ., and
              edit your password and account details.
            </p>
          </div>
        )}
        {activeTab === "transactions" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Transactions History
            </h2>

            <Button
              onClick={async () => {
                try {
                  const res = await fetch(
                    `${dbUrl}/get_transactions.php?user_id=${user?.id}`
                  );
                  const data = await res.json();

                  if (data.success) {
                    setTransactions(data.transactions);
                    toast.success("Transactions loaded");
                  } else {
                    toast.error(data.message || "Failed to load transactions");
                  }
                } catch (error) {
                  console.error(error);
                  toast.error("Error fetching transactions");
                }
              }}
              className="mb-4"
            >
              Load Transactions
            </Button>

            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Amount</th>
                      <th className="p-2 border">plan_name</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => {
                      const isWithdrawal = tx.transaction_type === "withdrawal";
                      const statusColor =
                        tx.status === "approved"
                          ? "text-green-600"
                          : tx.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600";

                      return (
                        <tr
                          key={tx.id}
                          className={isWithdrawal ? "bg-red-50" : "bg-green-50"}
                        >
                          <td className="p-2 border text-center font-semibold">
                            #{tx.id}
                          </td>
                          <td className="p-2 border text-center">
                            ${tx.amount.toLocaleString()}
                          </td>

                          <td className="p-2 border text-center capitalize">
                            {isWithdrawal
                              ? "Withdrawal"
                              : tx.plan_name || "Deposit"}
                          </td>

                          <td
                            className={`p-2 border text-center font-semibold ${statusColor}`}
                          >
                            {isWithdrawal ? tx.withdrawal_status :  tx.transation_status}
                          </td>

                          <td className="p-2 border text-center text-gray-600">
                            {new Date(tx.created_at).toLocaleString()}
                          </td>

                          {/* ✅ Optional: show wallet address for withdrawals only */}
                          {isWithdrawal && (
                            <td className="p-2 border text-center text-gray-800">
                              {tx.target_address || "No wallet provided"}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No transactions found.</p>
            )}
          </div>
        )}

        {activeTab === "addresses" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Addresses</h2>
            <p>Manage your saved addresses here.</p>
          </div>
        )}
        {activeTab === "account" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
            {user?.username}
            <br />
            {user?.phone}
            <br></br>
            {user?.bitcoin_address}
          </div>
        )}
        {activeTab === "logout" && (
          <div>
            <h2 className="text-red-500 font-semibold">Logging out...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalSidebar;
