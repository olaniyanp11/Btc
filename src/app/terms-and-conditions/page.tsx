"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <h1 className="text-3xl md:text-6xl font-semibold text-white bg-primary py-16 text-center">
        Terms & Conditions (Agreement)
      </h1>
      <Image
        src={"/images/image.svg"}
        alt="icon"
        width={200}
        height={200}
        className="w-screen h-16 mt-[-20px] opacity-90"
      />
      <main className="py-9 flex justify-center w-full bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Terms & Conditions (Agreement)
          </h1>

          {/* Intro */}
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">
            This Agreement is entered into by and these Terms & Conditions
            (hereinafter referred to as the “Agreement”) shall regulate the
            relationship between <strong>cryptodeskgain</strong> and the user (a
            natural or legal entity) (hereinafter referred to as the “Client”)
            of <strong>www.cryptodeskgain.com</strong> (hereinafter referred as
            the “Website”).
          </p>

          <p className="text-gray-700 mb-4 text-sm leading-relaxed">
            The Client confirms that he/she has read, understood and accepted
            all information, conditions and terms set out on the Website which
            are open to be reviewed and can be examined by the public and which
            include important legal Information.
          </p>

          <p className="text-gray-700 mb-6 text-sm leading-relaxed">
            By accepting this Agreement, the Client agrees and irrevocably
            accepts the terms and conditions contained in this Agreement, its
            annexes and/or appendices as well as other documentation/information
            published on the Website, including without limitation to the
            Privacy Policy, Payment Policy, Withdrawal & Refund Policy, Code of
            Conduct, Order Execution Policy and Anti-Money Laundering Policy.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Terms</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
            <li>
              <strong>Account –</strong> means unique personified account
              registered in the name of the Client and which contains all of the
              Client’s transactions/operations on the Trading Platform.
            </li>
            <li>
              <strong>Ask –</strong> means the higher price in a quote. The
              price the Client may buy at.
            </li>
            <li>
              <strong>Bid –</strong> means the lower price in a quote. The price
              the Client may sell at.
            </li>
            <li>
              <strong>CFD (Contract for Difference) –</strong> means a tradeable
              contract entered into between the Client and the Company.
            </li>
            <li>
              <strong>Digital Option Contract –</strong> means a type of
              derivative instrument where the Client earns a payout if they
              correctly predict the price movement of the underlying asset at
              expiry.
            </li>
            <li>
              <strong>Execution –</strong> means the execution of Client
              order(s) by the Company acting as the Client’s counterparty.
            </li>
            <li>
              <strong>KYC Documents –</strong> means the documents to be
              provided by the Client, including without limitation passport/ID
              and utility bill for individuals or certificates showing
              management and ownership for legal entities.
            </li>
            <li>
              <strong>Trading Platform –</strong> means an electronic system
              that presents quotes in real-time, allows
              placement/modification/deletion of orders and calculates
              obligations of Client and Company.
            </li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            2. Subject of the Agreement
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            The subject of the Agreement shall be the provision of Services to
            the Client by the Company under the Agreement and through the
            Trading Platform. The Company shall carry out all transactions as
            provided in this Agreement on an execution-only basis, neither
            managing the account nor advising the Client.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            The Investment and Ancillary Services which the Company should
            provide under the terms of the Agreement are stated below, and the
            Company will provide them in its capacity as a market maker under
            the terms of this Agreement.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
