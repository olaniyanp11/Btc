"use client";

import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import BitcoinChart from "../../components/BitCoinChart";
import { FiPieChart, FiBarChart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdMoney } from "react-icons/md";
import Profile from "../../components/Profile";
import VerticalSidebar from "../../components/VerticalSidebar";
import VerticalInvestmentPlans from "../../components/VerticalInvestmentPlans";
import { useAuth } from "../../Auth/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import ProtetedRoute from "../ProtectedRoute";
const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${dbUrl}/dashboard.php`, {
          credentials: "include",
        });

        if (res.status === 401) {
          // Not logged in → redirect
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.data.user)); // optional
          setUser(data.data.user);
          console.log(data.data);
        } else {
          toast.error(data.message);
          setUser(null);
          router.push("/login");
        }
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      }
    };

    fetchDashboard();
  }, [dbUrl]);

  const loadtransactions = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(
        `${dbUrl}/get_transactions.php?user_id=${user.id}`
      );
      const data = await res.json();

      if (data.success) {
        const transactions = data.transactions;

        // ✅ Calculate balance for all approved transactions
        const bal = transactions.reduce((sum, tx) => {
          if (tx.status.toLowerCase() === "approved") {
            return sum + Number(tx.amount);
          }
          return sum;
        }, 0);

        setBalance(bal);
        console.log("✅ Balance:", bal);
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
  // Withdrawal data
  const [withdrawData, setWithdrawData] = useState({
    username: user?.name || "Shezy",
    email: user?.email || "shezy@example.com",
    bitcoinAddress: "",
    amount: "",
  });

  // Update fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawData((prev) => ({ ...prev, [name]: value }));
  };

  // Withdraw logic
  const handleWithdraw = async () => {
    if (!withdrawData.bitcoinAddress || !withdrawData.amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${dbUrl}/withdraw.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bitcoinAddress: withdrawData.bitcoinAddress.trim(),
          amount: parseFloat(withdrawData.amount),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setWithdrawData((prev) => ({
          ...prev,
          bitcoinAddress: "",
          amount: "",
        }));
        await loadtransactions(); // reload balance
      } else {
        toast.error(data.message || "Withdrawal failed");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error("Error submitting withdrawal");
    }
  };

  return (
    <>
      <ProtetedRoute>
        <Nav />
        <section className="min-h-screen bg-white py-10 px-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Available Balance */}
            <div className="bg-gray-50 rounded-2xl shadow p-6 flex items-center justify-between gap-4">
              <div className="bg-primary p-3 rounded-full">
                <MdMoney className="text-white text-xl" />
              </div>
              <div className="text-primary ">${ user.balance}</div>
              <div>
                <Button className="text-sm text-white">
                  Available Balance
                </Button>
              </div>
            </div>

            {/* Referral Link */}
            <div className="bg-gray-50 rounded-2xl shadow p-6 flex items-center justify-between gap-4">
              <div className="bg-primary p-3 rounded-full">
                <CgProfile className="text-white text-xl" />
              </div>
              <div>
                <Button className="text-sm text-white">Referral Link</Button>
              </div>
            </div>
          </div>

          {/* Withdraw + Deposit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Withdraw Funds */}
            <div className="bg-gray-50 rounded-2xl shadow p-6 flex items-center justify-between gap-4">
              <div className="bg-primary p-3 rounded-full">
                <FiPieChart className="text-white text-xl" />
              </div>

              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="text-sm text-white">
                      Withdraw Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Username */}
                      <div>
                        <Label htmlFor="username">Username *</Label>
                        <Input
                          id="username"
                          name="username"
                          value={withdrawData.username}
                          disabled
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={withdrawData.email}
                          disabled
                        />
                      </div>

                      {/* Bitcoin Address */}
                      <div>
                        <Label htmlFor="bitcoinAddress">
                          Bitcoin Address *
                        </Label>
                        <Input
                          id="bitcoinAddress"
                          name="bitcoinAddress"
                          value={withdrawData.bitcoinAddress}
                          onChange={handleChange}
                          placeholder="Enter your BTC address"
                          required
                        />
                      </div>

                      {/* Amount */}
                      <div>
                        <Label htmlFor="amount">Amount *</Label>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          min="1"
                          value={withdrawData.amount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          required
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        className="w-full"
                        onClick={handleWithdraw}
                        disabled={
                          !withdrawData.bitcoinAddress || !withdrawData.amount
                        }
                      >
                        Withdraw
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Deposit Funds */}
            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between gap-4">
              <div className="bg-primary p-3 rounded-full">
                <FiBarChart className="text-white text-xl" />
              </div>
              <div>
                <VerticalInvestmentPlans />
              </div>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {user && <Profile user={user} setUser={setUser} />}
            {user && <VerticalSidebar user={user} />}
          </div>
          {/* Bitcoin Chart */}
          <BitcoinChart />
        </section>
        <Footer />
      </ProtetedRoute>
    </>
  );
};

export default Dashboard;
