"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiLogOut,
  FiHome,
  FiBarChart2,
  FiUser,
  FiPlus,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Auth/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [stats, setStats] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const { user, setUser, logout } = useAuth();
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

  const [newPayout, setNewPayout] = useState({
    user_id: "",
    investment_plan: "",
    amount_invested: "",
    total_profits: "",
    payout_date: "",
    payout_status: "",
    transaction_code: "",
  });
  const [editPayout, setEditPayout] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // helper
  const formatAmount = (val) => {
    if (val == null || val === "") return "0";
    const n = Number(val);
    if (!isFinite(n)) return val;
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(8).replace(/\.?0+$/, "");
  };

  // fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${dbUrl}/admin/dashboard.php`, {
        credentials: "include",
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      if (data.success) {
        const { user, stats, users, payouts } = data.data;
        setUser(user);
        setStats(stats || {});
        setUsersList(users || []);
        setPayouts(payouts || []);
      } else {
        toast.error(data.message || "Failed to load dashboard");
        logout();
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading dashboard");
      logout();
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [dbUrl]);

  // ================= TRANSACTIONS SECTION =================
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${dbUrl}/admin/get_transactions.php`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions);
        setFiltered(data.transactions);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;

const totalPages = Math.ceil(filtered.length / itemsPerPage);
const paginated = filtered.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);



 const updateStatus = async (id, newStatus) => {
   try {
     setLoading(true);
     const res = await fetch(`${dbUrl}/admin/update_transaction.php`, {
       method: "POST",
       credentials: "include",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ id, status: newStatus }),
     });
     const result = await res.json();
     if (result.success) {
       toast.success(result.message);

       // ✅ this updates the local transactions array properly
       setTransactions((prev) =>
         prev.map((tx) =>
           tx.id === id ? { ...tx, status: result.updated_status } : tx
         )
       );

       // ✅ re-fetches the dashboard (refreshes stats and users)
       fetchDashboard();
     } else {
       toast.error(result.message);
     }
   } catch (err) {
     toast.error("Error updating transaction");
   } finally {
     setLoading(false);
   }
 };


async function updateTransaction(userId, newBalance) {
  try {
    setLoading(true);
    const res = await fetch(`${dbUrl}/admin/update_transaction.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        balance: newBalance,
        manual: true,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success(`Balance updated: $${data.new_balance}`);
      fetchTransactions();
    } else {
      toast.error(data.message || "Failed to update balance");
    }
  } catch (err) {
    toast.error("Server error while updating balance");
  } finally {
    setLoading(false);
  }
}


useEffect(() => {
  let filteredData = [...transactions];
  if (statusFilter !== "all") {
    filteredData = filteredData.filter((tx) => tx.status === statusFilter);
  }
  if (searchQuery.trim() !== "") {
    filteredData = filteredData.filter(
      (tx) =>
        tx.user_id.toString().includes(searchQuery) ||
        (tx.email && tx.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  setFiltered(filteredData);
}, [transactions, statusFilter, searchQuery]);

  // ================= PAYOUTS CRUD =================
  const handleAdd = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${dbUrl}/admin/add_payout.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayout),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Payout added");
        setNewPayout({
          user_id: "",
          investment_plan: "",
          amount_invested: "",
          total_profits: "",
          payout_date: "",
          payout_status: "",
          transaction_code: "",
        });
        setAddModalOpen(false);
        await fetchDashboard();
      } else {
        toast.error(data.message || "Failed to add payout");
      }
    } catch (err) {
      toast.error("Error adding payout");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (p) => {
    if (!p || !p.id) return toast.error("No payout selected");
    try {
      setSaving(true);
      const res = await fetch(`${dbUrl}/admin/update_payout.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Payout updated");
        setEditModalOpen(false);
        setEditPayout(null);
        await fetchDashboard();
      } else {
        toast.error(data.message || "Failed to update payout");
      }
    } catch (err) {
      toast.error("Error updating payout");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this payout?")) return;
    try {
      const res = await fetch(`${dbUrl}/admin/delete_payout.php?id=${id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Payout deleted");
        setPayouts((prev) => prev.filter((x) => x.id !== id));
      } else {
        toast.error(data.message || "Failed to delete payout");
      }
    } catch (err) {
      toast.error("Error deleting payout");
    }
  };

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
        await logout();
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      await logout();
      toast.error("Logout failed");
      router.push("/login");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          </div>

          <nav className="flex flex-col p-4 space-y-3">
            {[
              ["home", "Home", FiHome],
              ["analytics", "Analytics", FiBarChart2],
              ["users", "Users", FiUser],
              ["payouts", "Payouts", FiBarChart2],
              ["transactions", "Transactions", FiBarChart2],
              ["profile", "Profile", FiUser],
            ].map(([tab, label, Icon]) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "transactions") fetchTransactions();
                }}
                className={`flex items-center p-3 rounded-lg transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="mr-3" /> {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
          >
            <FiLogOut /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "home" && (
          <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome back, {user?.username || "Admin"} 👋
                </h1>
                <p className="text-gray-500 mt-1">
                  Here’s what’s happening today,
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Users",
                  value: stats.users_count || 0,
                  icon: "",
                  color: "from-blue-50 to-blue-100",
                },
                {
                  title: "Total Investments",
                  value: `$${formatAmount(stats.total_invested || 0)}`,
                  icon: "",
                  color: "from-green-50 to-green-100",
                },
                {
                  title: "Active Plans",
                  value: stats.active_plans || 3,
                  icon: "",
                  color: "from-purple-50 to-purple-100",
                },
                {
                  title: "Pending Payouts",
                  value: payouts.filter((p) => p.payout_status === "pending")
                    .length,
                  icon: "",
                  color: "from-yellow-50 to-yellow-100",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-b ${card.color} p-6 rounded-2xl shadow-md flex flex-col justify-between transition hover:shadow-lg`}
                >
                  <div className="text-4xl">{card.icon}</div>
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm font-medium">
                      {card.title}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                      {card.value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Investment Trends */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Investment Trends
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { month: "Jan", amount: 12000 },
                    { month: "Feb", amount: 19000 },
                    { month: "Mar", amount: 22000 },
                    { month: "Apr", amount: 18000 },
                    { month: "May", amount: 25000 },
                    { month: "Jun", amount: 28000 },
                  ]}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Top Investors */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Top Investors
              </h2>
              <ul className="divide-y divide-gray-200">
                {usersList.slice(0, 3).map((u, i) => (
                  <li
                    key={i}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{u.username}</p>
                      <p className="text-gray-500 text-sm">{u.email}</p>
                    </div>
                    <span className="font-semibold text-blue-600">
                      ${formatAmount(u.total_invested)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Table with scroll */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full min-w-[900px] border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-3">ID</th>
                <th className="border p-3">User Email</th>
                <th className="border p-3">Plan</th>
                <th className="border p-3">Transaction Type</th>
                <th className="border p-3">Target Address</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Transaction Status</th>
                <th className="border p-3">Withdrawal Status</th>
                <th className="border p-3">Change Status</th>
                <th className="border p-3">Update Balance</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-4 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                paginated.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="border p-3">{tx.id}</td>
                    <td className="border p-3">{tx.email}</td>
                    <td className="border p-3">{tx.plan_name || "—"}</td>
                    <td className="border p-3 capitalize">
                      {tx.transaction_type}
                    </td>
                    <td className="border p-3 break-words max-w-[200px]">
                      {tx.target_address || "—"}
                    </td>
                    <td className="border p-3 whitespace-nowrap">
                      {new Date(tx.created_at).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="border p-3 font-semibold text-green-700">
                      ₦{tx.amount}
                    </td>

                    {/* Transaction Status */}
                    <td
                      className={`border p-3 capitalize font-medium ${
                        tx.transaction_status === "approved"
                          ? "text-green-600"
                          : tx.transaction_status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {tx.transaction_status}
                    </td>

                    {/* Withdrawal Status */}
                    <td
                      className={`border p-3 capitalize font-medium ${
                        tx.withdrawal_status === "completed"
                          ? "text-green-600"
                          : tx.withdrawal_status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {tx.withdrawal_status || "—"}
                    </td>

                    {/* Change Status */}
                    <td className="border p-3">
                      <select
                        value={tx.transaction_status}
                        onChange={(e) => updateStatus(tx.id, e.target.value)}
                        disabled={loading}
                        className="border p-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>

                    {/* Update Balance */}
                    <td className="border p-3">
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                          type="number"
                          placeholder="New balance"
                          className="border rounded p-1 w-28 text-center"
                          value={tx.newBalance ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFiltered((prev) =>
                              prev.map((item) =>
                                item.id === tx.id
                                  ? { ...item, newBalance: val }
                                  : item
                              )
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const val = parseFloat(tx.newBalance);
                              if (!isNaN(val))
                                updateTransaction(tx.user_id, val);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          disabled={!tx.newBalance || loading}
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() => {
                            const val = parseFloat(tx.newBalance);
                            if (!isNaN(val)) updateTransaction(tx.user_id, val);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6 px-2">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            {usersList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="p-3 text-left">#</th>
                      <th className="p-3 text-left">Username</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Joined</th>
                      <th className="p-3 text-left">balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u, i) => (
                      <tr key={u.id} className="border-b hover:bg-gray-100">
                        <td className="p-3">{i + 1}</td>
                        <td className="p-3">{u.username}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">{u.created_at}</td>
                        <td className="p-3">{u.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No users found.</p>
            )}
          </div>
        )}
        {activeTab === "payouts" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Instant Payouts</h1>
              <Button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center gap-2"
              >
                <FiPlus /> Add Payout
              </Button>
              {/* Add Dialog (controlled) */}
              <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payout</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 mt-4">
                    {Object.keys(newPayout).map((k) => (
                      <div key={k}>
                        <Label className="capitalize">
                          {k.replace("_", " ")}
                        </Label>
                        <Input
                          value={newPayout[k]}
                          onChange={(e) =>
                            setNewPayout((s) => ({ ...s, [k]: e.target.value }))
                          }
                        />
                      </div>
                    ))}
                    <div className="flex gap-2 mt-3">
                      <Button onClick={handleAdd} disabled={saving}>
                        {saving ? "Adding..." : "Add"}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setAddModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "No",
                      "User ID",
                      "Investment Plan",
                      "Amount Invested",
                      "Total Profits",
                      "Payout Date",
                      "Status",
                      "Transaction Code",
                      "Actions",
                    ].map((h) => (
                      <th key={h} className="px-4 py-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payouts.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-6 text-center text-gray-600"
                      >
                        No payouts yet
                      </td>
                    </tr>
                  )}
                  {payouts.map((p, idx) => (
                    <tr key={p.id ?? idx} className="border-t">
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{p.user_id}</td>
                      <td className="px-4 py-2">{p.investment_plan}</td>
                      <td className="px-4 py-2">
                        ${formatAmount(p.amount_invested)}
                      </td>
                      <td className="px-4 py-2">
                        ${formatAmount(p.total_profits)}
                      </td>
                      <td className="px-4 py-2">{p.payout_date}</td>
                      <td className="px-4 py-2">{p.payout_status}</td>
                      <td className="px-4 py-2">{p.transaction_code}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditPayout(p);
                            setEditModalOpen(true);
                          }}
                        >
                          <FiEdit />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(p.id)}
                        >
                          <FiTrash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Edit Dialog (controlled) */}
            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Payout</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 mt-4">
                  {Object.keys(editPayout || {}).map((k) => (
                    <div key={k}>
                      <Label className="capitalize">
                        {k.replace("_", " ")}
                      </Label>
                      <Input
                        value={editPayout[k] ?? ""}
                        onChange={(e) =>
                          setEditPayout((s) => ({ ...s, [k]: e.target.value }))
                        }
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => handleSave(editPayout)}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditModalOpen(false);
                        setEditPayout(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {activeTab === "profile" && (
          <div className="max-w-lg bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">My Profile</h2>
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
            <p>
              <strong>Joined:</strong> {user?.created_at}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
