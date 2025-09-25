import Image from "next/image";
import { BiBarChart } from "react-icons/bi";
import { BsClockFill, BsBarChartFill } from "react-icons/bs";
import { GiProfit } from "react-icons/gi";
import Link from "next/link";
import WHorizontalScroll from "./WHorizontalScroll";

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

const InvestmentPlan = () => {
  return (
    <div className="w-full bg-white px-3 text-primary py-32 text-2xl md:text-5xl font-bold text-center">
      <h1 className="text-primary">Investment Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3  mt-10  space-y-5 items-center justify-center">
        {plans.map((plan, index) => (
          <section
            key={index}
            className="bg-primary py-6 shadow-md flex flex-col items-center"
          >
            <Image
              src="/images/plan.png"
              alt={plan.name}
              width={100}
              height={100}
              className="mb-4 w-full"
            />
            <h2 className="text-white text-2xl mb-4 text-shadow-2xs">
              {plan.name}
            </h2>
            <WHorizontalScroll />
            <div className="flex flex-col gap-3 text-left w-full">
              <div className="flex items-center gap-2">
                <BsBarChartFill className="text-white w-6 h-6" />
                <p className="text-white text-md md:text-2xl">
                  Minimum: ${plan.minimum}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BiBarChart className="text-white w-6 h-6" />
                <p className="text-white text-md md:text-2xl">
                  Maximum: ${plan.maximum}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BiBarChart className="text-white w-6 h-6" />
                <p className="text-white text-md md:text-2xl">
                  Referral: {plan.referral}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BsClockFill className="text-white w-6 h-6" />
                <p className="text-white text-md md:text-2xl">
                  Duration: {plan.duration}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <GiProfit className="text-white w-6 h-6" />
                <p className="text-white text-md md:text-2xl">
                  Profit: {plan.profit}
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className="text-white bg-gradient-to-r from-primary to-accent text-lg px-5 py-2 mt-2 "
            >
              Register
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPlan;
