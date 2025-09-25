// components/TwoColumnSection.tsx

import Image from "next/image";
import React from "react";

interface TwoColumnSectionProps {
  bgImage: string;
  sideImage: string;
  title: string;
  content: string;
}

const STwoColumnSection: React.FC<TwoColumnSectionProps> = ({
  bgImage,
  sideImage,
  title,
  content,
}) => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 px-2 md:px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white text-center">
        {title}
      </h2>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src={sideImage}
            alt="Explainer visual"
            width={590}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
        {/* Text Section */}
        <div className="text-white">
          <p className="text-lg leading-relaxed">{content}</p>
        </div>
      </div>
      <section className="max-w-5xl px-2 py-12 text-white">
        <div className="prose prose-lg">
          <p>
            We also provide retail brokers, small hedge funds and emerging
            market banks access to wholesale execution and liquidity, while
            providing high and medium frequency funds access to prime brokerage
            services.
          </p>

          <h3 id="no-crypto-wallet" className="mt-2 text-xl font-semibold">
            NO CRYPTO WALLET OR COLD STORAGE
          </h3>
          <p>
            Trading with Cryptodeskgain means that no physical delivery of the
            coin is required and profits are credited to your account instantly.
          </p>

          <h3 id="powerful-dashboard" className="mt-2 text-xl font-semibold">
            POWERFUL TRADING DASHBOARD
          </h3>
          <p>
            Micronized CFDs available on your dashboard allow trades to be
            placed in fractions and profits from each trade are sent to your
            account instantly.
          </p>

          <h3 id="expert-assist" className="mt-2 text-xl font-semibold">
            WE HAVE EXPERTS TO ASSIST YOU
          </h3>
          <p>
            Whether the price of the cryptocurrency goes up or down, you can
            take part in the action by investing with us and having our experts
            monitor the market for you.
          </p>

          <h3 id="best-execution" className="mt-2 text-xl font-semibold">
            COMMITMENT TO BEST EXECUTION
          </h3>
          <p>
            Cryptodeskgain is committed to continuously obtaining the best
            possible outcome for client orders. We enable our clients and the
            public to evaluate the quality of our execution practices and to
            identify the top five execution venues where client orders are
            executed in terms of trading volumes.
          </p>
        </div>
      </section>
    </section>
  );
};

export default STwoColumnSection;
