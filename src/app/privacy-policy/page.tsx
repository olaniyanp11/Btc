"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <h1 className="text-3xl md:text-6xl font-semibold text-white bg-primary py-16 text-center">
        Privacy Policy
      </h1>
      <Image
        src={"/images/image.svg"}
        alt="icon"
        width={200}
        height={200}
        className="w-screen h-16 mt-[-20px] opacity-90"
      />
      <main className="py-9 flex justify-center w-full bg-gray-50 px-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-700 leading-relaxed">
          <p>
            <strong>CryptodeskGain</strong> respects your privacy and is
            committed to protecting your personal data. This privacy policy aims
            to give you information on how we collect and process your personal
            data and how we look after it when you visit our website (regardless
            of where you visit it from). It also explains your privacy rights
            and how the law protects you. This version of the Privacy Policy
            takes effect on <strong>10 June, 2019</strong>.
          </p>

          <p>
            We strive to create the most secure infrastructure of any broker in
            the United States and worldwide. In this privacy policy we explain
            why you can trust us with your data and rest assured that your data
            is safe.
          </p>

          <p>
            It is important that you read this privacy policy together with any
            other privacy notices we may provide on specific occasions when we
            are collecting or processing data about you so that you are fully
            aware of how and why we are using your data.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              1. WHO WE ARE
            </h2>
            <p>
              CryptodeskGain is a company registered in the United States of
              America for crypto, forex, and other types of trading.
              CryptodeskGain Limited controls and is responsible for the data of
              its Clients disclosed when registering for a trading account
              and/or using services offered by the CryptodeskGain Limited Group
              through this Website (desktop and mobile versions).
            </p>
            <p>
              When we mention “CryptodeskGain”, “Company”, “we”, “us” or “our”,
              we are referring to the relevant company in the CryptodeskGain
              Limited group responsible for collecting and/or processing your
              data when you use the Trading Platform. All companies within the
              group are committed to protecting your data through legal,
              administrative, and technical safeguards.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              2. DATA USAGE
            </h2>
            <p>
              We may collect, use, store, and transfer different kinds of data
              about you, grouped together as follows:
            </p>
            <ol
              type="A"
              className="list-inside space-y-3 mt-4 text-gray-700 text-sm md:text-base"
            >
              <li>
                <strong className="font-semibold text-gray-900">
                  Identity Data:
                </strong>{" "}
                first name, last name, patronymic, ID number, photo ID.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Contact Data:
                </strong>{" "}
                billing address, email, phone numbers.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Financial Data:
                </strong>{" "}
                bitcoin or related wallet addresses.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Transaction Data:
                </strong>{" "}
                payments, withdrawals, trading history, profit, balance.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Technical Data:
                </strong>{" "}
                IP address, login data, browser, device, cookies.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Profile Data:
                </strong>{" "}
                account details, preferences, survey responses.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Usage Data:
                </strong>{" "}
                how you use the Website, services, complaints filed.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Marketing Data:
                </strong>{" "}
                preferences for receiving marketing and communication.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Sensitive Data:
                </strong>{" "}
                religious beliefs, criminal convictions.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Conformity Data:
                </strong>{" "}
                education, employment, trading experience.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Banking Data:
                </strong>{" "}
                payment wallet details, card details, issuing bank info.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  KYC Data:
                </strong>{" "}
                utility bills, identity cards, passports, driver’s license.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Economic Profile Data:
                </strong>{" "}
                annual income, net profit, sources of funds.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Location Data:
                </strong>{" "}
                residency, time zone, language settings.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  Audio Data:
                </strong>{" "}
                call recordings with our team.
              </li>
            </ol>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
