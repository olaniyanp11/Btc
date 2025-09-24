import Image from "next/image";
import { FcDataBackup } from "react-icons/fc";
import { BiSupport, BiShield, BiBitcoin, BiBarChart } from "react-icons/bi";
import { FaRegRegistered } from "react-icons/fa";
import { GiFingerPrint } from "react-icons/gi";

const featuresData = [
  {
    icon: <FcDataBackup size={120} />,
    title: "Data Protection",
    description:
      "All investment data on our systems including user personal data are highly encrypted using top level codes and metrics.",
  },
  {
    icon: <BiSupport size={120} />,
    title: "Support 24/7",
    description:
      "We are always available to assist you with any walk through you might be needing.",
  },
  {
    icon: <FaRegRegistered size={120} />,
    title: "Registered Company",
    description:
      "Always work with a registered company. We are 100% registered under the UK companies house.",
  },
  {
    icon: <BiShield size={120} />,
    title: "Security Protected",
    description:
      "Proper measures have been taken to ensure maximum security of our servers, users dashboard and login details.",
  },
  {
    icon: <BiBitcoin size={120} />,
    title: "Payment Methods",
    description:
      "We have a very unique payment method for sending and receiving payments automatically.",
  },
  {
    icon: <GiFingerPrint size={120} />,
    title: "Secured Company",
    description:
      "All our activities are checkmated, licensed and regulated by matured group of individuals.",
  },
  {
    icon: <BiBarChart size={120} />,
    title: "Mt4/Mt5 Tool",
    description:
      "We also enable bots that help us place good forex trades, to ensure maximum profits for all investors trading with us.",
  },
];

const Features = () => {
  return (
    <div className=" w-full bg-primary py-32">
      <section className="features grid grid-cols-1 md:grid-cols-3 gap-6 my-10 p-4">
        {/* First Image */}
        <div className="w-full relative">
          <Image
            src="/images/40.jpg"
            alt="Features"
            width={500}
            height={500}
            className="mx-auto rounded-lg shadow-md"
          />
        </div>

        {/* Features */}
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="feature text-white text-center p-6 rounded-lg shadow-sm bg-opacity-10 flex flex-col items-center justify-center"
          >
            {feature.icon}
            <h3 className="text-lg  text-center font-semibold mt-4">
              {feature.title}
            </h3>
            <p className="mt-2 text-center text-gray-200">
              {feature.description}
            </p>
          </div>
        ))}

        {/* Second Image */}
        <div className="w-full relative">
          <Image
            src="/images/42.jpg"
            alt="Features"
            width={500}
            height={500}
            className="mx-auto rounded-lg shadow-md"
          />
        </div>
      </section>
    </div>
  );
};

export default Features;
