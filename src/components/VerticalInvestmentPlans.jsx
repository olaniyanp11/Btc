"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsBarChartFill, BsClockFill } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { GiProfit } from "react-icons/gi";
import Link from "next/link";

const plans = [
  {
    name: "Starter plan",
    minimum: 200,
    maximum: 5000,
    referral: "5%",
    duration: "7 days",
    profit: "16% + Investment",
  },
  {
    name: "Silver plan",
    minimum: 5000,
    maximum: 11000,
    referral: "5%",
    duration: "2 weeks",
    profit: "25% + Investment",
  },
  {
    name: "Gold plan",
    minimum: 11000,
    maximum: 22000,
    referral: "5%",
    duration: "2 weeks",
    profit: "36% + Investment",
  },
  {
    name: "Diamond plan",
    minimum: 22000,
    maximum: 40000,
    referral: "5%",
    duration: "3 weeks",
    profit: "45% + Investment",
  },
  {
    name: "Platinum plan",
    minimum: 40000,
    maximum: 60000,
    referral: "5%",
    duration: "3 weeks",
    profit: "56% + Investment",
  },
];

const VerticalInvestmentPlans = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm text-white">Deposit Funds</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Investment Plans</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-4">
          {plans.map((plan, index) => (
            <Link key={index} href={`/investment/${encodeURIComponent(plan.name)}`} className="bg-primary p-4 rounded-lg flex flex-col items-center text-white shadow-md">
              <Image
                src="/images/plan.png"
                width={200}
                height={200}
                alt={plan.name}
                className="mb-2"
              />
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <div className="flex flex-col gap-1 mt-2 w-full text-left">
                <p>Minimum: ${plan.minimum}</p>
                <p>Maximum: ${plan.maximum}</p>
                <p>Referral: {plan.referral}</p>
                <p>Duration: {plan.duration}</p>
                <p>Profit: {plan.profit}</p>
              </div>
              <Button className="mt-2 w-full bg-accent text-white">
                Invest Under {plan.name}
              </Button>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerticalInvestmentPlans;
