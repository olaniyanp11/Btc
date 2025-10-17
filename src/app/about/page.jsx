"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import { BsLinkedin } from "react-icons/bs";

export default function PrivacyPolicyPage() {
  const teamMembers = [
    {
      name: "Thomas P Anderson",
      title: "Managing Director B.Sc., MBA",
      description:
        "Thomas P Anderson is the founder and Managing Director of TRADE GAINS CRYPTO INVESTMENTS LTD. He has served as Director on several boards in Trinidad as well as across England.",
      image: "/images/1.jpg",
      linkedin: "https://www.linkedin.com/in/thomasanderson",
    },
    {
      name: "Brandon A Hughes",
      title: "ACIS, Grad Dip ABA/Stonier",
      description:
        "Brandon A Hughes joined the Board team in March 2019 as Investment Manager, bringing with him a wealth of treasury and investment experience.",
      image: "/images/2.jpg",
      linkedin: "https://www.linkedin.com/in/brandonhughes",
    },
    {
      name: "Jude S Hendov",
      title: "BSc. MSc. (Mathematics)",
      description:
        "Jude S Hendov is a strong financial expert and a crypto forex analyst at TRADE GAINS CRYPTO INVESTMENTS LTD London.",
      image: "/images/3.jpg",
      linkedin: "https://www.linkedin.com/in/judehendov",
    },
    {
      name: "Poppy K Nash",
      title: "ACIS, Account Manager",
      description:
        "Poppy K Nash is an accounting agent for over 6 years, with professional experience in corporate, finance, securities and business law.",
      image: "/images/4.jpg",
      linkedin: "https://www.linkedin.com/in/poppynash",
    },
  ];

  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="bg-primary py-20 text-center relative">
        <h1 className="text-3xl md:text-6xl font-semibold text-white relative z-10">
          About Us
        </h1>
        <Image
          src={"/images/coin-banner.jpg"}
          alt="Banner"
          className="w-full h-[220px] absolute top-0 left-0 opacity-40 object-cover"
          width={1200}
          height={220}
        />
      </div>

      {/* Divider Image */}
      <Image
        src={"/images/image.svg"}
        alt="icon"
        width={200}
        height={200}
        className="w-full h-16 -mt-6 opacity-50 transform scale-x-[-1]"
      />

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 text-center mt-8">
        <h2 className="text-xl font-medium text-primary">
          HOME OF SMART TRADERS
        </h2>
        <p className="text-sm leading-7 tracking-wide text-gray-600 mt-4 text-justify">
          CRYPTO DESK GAIN LTD is an investment company, located at Senator
          House, 85 Queen Victoria St, London EC4V 4AB, UK with company
          registration number 13048936, founded by commercial traders with five
          years experience of successful activity in the Forex market, as well
          as cryptocurrency exchanges. Since our team develops its own
          strategies of trading and currency exchange applying all professional
          knowledge, techniques and skills that allow us to generate stable cash
          flows with minimal risk of financial loss. Crypto Forex financial is
          also committed to providing the world class trading experience to our
          investors and making sure it all correspond to the guidelines set by
          our management and also make provision to an instant profit into the
          clients bitcoin address provided during registration.
        </p>
      </section>

      {/* Team Members */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold text-center text-primary mb-10">
          Team Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-primary rounded-xl shadow-lg p-8 flex flex-col items-center text-center group"
            >
              {/* Animated border wrapper */}
              <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-white group-hover:border-animate transition-all duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full "
                />
              </div>

              <h3 className="font-semibold mt-6 text-lg text-white">
                {member.name}
              </h3>
              <p className="text-sm text-white">{member.title}</p>
              <p className="mt-3 text-white text-sm">{member.description}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mt-4 inline-flex items-center gap-2 hover:text-orange-300 transition"
              >
                <BsLinkedin /> View LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Company Info */}
      <section className="max-w-5xl mx-auto px-6 mt-16 space-y-6">
        <p className="text-sm leading-7 tracking-wide text-gray-600 text-justify">
          Our award-winning Crypto Desk Gain platform gives you everything you
          need to make the most of your investments in Currencies, Cash
          Equities, Cash Indices, Metals, Energies, Oil and Gas and much more.
        </p>
        <p className="text-sm leading-7 tracking-wide text-gray-600 text-justify">
          Trading financial instruments carry a high level of risk and may not
          be suitable for all investors. Please ensure that you understand the
          risks involved as you may lose all your invested capital. Past
          performance of trading instruments is not a reliable indicator of
          future performance.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-6xl mx-auto px-6 mt-16 grid gap-12 md:grid-cols-2">
        <div className="space-y-3">
          <h1 className="text-primary text-xl font-semibold">
            Mission Statement
          </h1>
          <p className="text-gray-600 text-sm leading-7 text-justify">
            We provide crypto forex investment services, products to meet the
            needs of our clients and deliver superior returns. In doing so, the
            aspirations of our employees, clients and investors for growth and
            development are realized, and enhanced value achieved for all our
            investors.
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-primary text-xl font-semibold">
            Vision Statement
          </h1>
          <p className="text-gray-600 text-sm leading-7 text-justify">
            To be the preferred investment service provider to the clients we
            serve.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
