"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "../../../Auth/AuthContext";
import { toast } from "react-hot-toast";

const plans = [
  {
    name: "Starter plan",
    minimum: 200,
    maximum: 5000,
    referral: "5%",
    duration: "7 days",
    profit: "16% + Investment",
    category: "Investment Plan",
  },
  {
    name: "Silver plan",
    minimum: 5000,
    maximum: 11000,
    referral: "5%",
    duration: "2 weeks",
    profit: "25% + Investment",
    category: "Investment Plan",
  },
  {
    name: "Gold plan",
    minimum: 11000,
    maximum: 22000,
    referral: "5%",
    duration: "2 weeks",
    profit: "36% + Investment",
    category: "Investment Plan",
  },
  {
    name: "Diamond plan",
    minimum: 22000,
    maximum: 40000,
    referral: "5%",
    duration: "3 weeks",
    profit: "45% + Investment",
    category: "Investment Plan",
  },
  {
    name: "Platinum plan",
    minimum: 40000,
    maximum: 60000,
    referral: "5%",
    duration: "3 weeks",
    profit: "56% + Investment",
    category: "Investment Plan",
  },
];

// 🧩 Utility to make a clean slug (for URLs)
const slugify = (name) =>
  name
    

const InvestmentPlanPage = ({ params }) => {
  const router = useRouter();
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

  // decode plan name from URL
  const planName = decodeURIComponent(params.plan).replace(/-/g, " ");
  const plan = plans.find(
    (p) => p.name.toLowerCase() === planName.toLowerCase()
  );

  const [amount, setAmount] = useState("");

  if (!plan) return <p className="text-center mt-10 text-xl">Plan not found</p>;

  const relatedPlans = plans.filter((p) => p.name !== plan.name);

  // 🪙 Handle Investment
  const handleInvest = async () => {
    const investAmount = Number(amount);

    if (
      !investAmount ||
      investAmount < plan.minimum ||
      investAmount > plan.maximum
    ) {
      toast.error(
        `Enter an amount between $${plan.minimum} and $${plan.maximum}`
      );
      return;
    }

    try {
      const res = await fetch(`${dbUrl}/create_transaction.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          plan_name: plan.name,
          amount: investAmount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Investment successful!");
        router.push("/dashboard"); // redirect to dashboard or success page
      } else {
        toast.error(data.message || "Investment failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error occurred");
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 space-y-10">
        <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-4xl">
          {/* Main Plan Card */}
          <div className="bg-primary text-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col items-center">
            <Image
              src="/images/plan.png"
              width={150}
              height={150}
              alt={plan.name}
              className="mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{plan.name}</h1>

            <div className="flex flex-col gap-2 w-full text-left mb-4">
              <p>Minimum: ${plan.minimum}</p>
              <p>Maximum: ${plan.maximum}</p>
              <p>Referral: {plan.referral}</p>
              <p>Duration: {plan.duration}</p>
              <p>Profit: {plan.profit}</p>
              <p>Category: {plan.category}</p>
            </div>

            <div className="w-full mb-4">
              <label htmlFor="amount" className="block mb-1 font-semibold">
                Enter Your Amount $
              </label>
              <Input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Amount between ${plan.minimum} - ${plan.maximum}`}
                className="w-full border border-gray-300 rounded p-2 text-white"
              />
            </div>

            <Button
              className="w-full bg-accent text-white"
              onClick={handleInvest}
            >
              Invest Now
            </Button>
          </div>
        </div>

        {/* Related Plans */}
        <div className="space-y-4 w-full max-w-4xl">
          <h2 className="text-2xl font-bold">Related Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPlans.map((p) => (
              <div
                key={p.name}
                className="bg-primary text-white p-4 rounded-lg shadow-md text-center"
              >
                <Image
                  src="/images/plan.png"
                  width={150}
                  height={150}
                  alt={p.name}
                  className="mb-4 mx-auto"
                />
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm mb-2">Category: {p.category}</p>
                <Link
                  href={`/investment/${slugify(p.name)}`}
                  className="text-white bg-accent px-3 py-1 rounded mt-2 inline-block"
                >
                  Quick View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvestmentPlanPage;
