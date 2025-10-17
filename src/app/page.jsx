import Image from "next/image";
import Section from "../components/Section";
import Nav from "../components/Nav";
import HorizontalScroll from "../components/HorizontalScroll";
import TwoColumnSection from "../components/TwoColumnSection"
import Features from "../components/Features";
import InvestmentPlan from "../components/InvestmentPlan"
import VideoSection from "@/components/VideoSection";
import STwoColumnSection from "@/components/STwoColumnSection"
import PayoutHistory from "@/components/PayoutHistory"
import Footer from "@/components/Footer"
import BitcoinChart from "@/components/BitCoinChart";
export default function Home() {
  return (
    <>
      <div className="fixed bottom-3 left-3">
        <Image src="/images/wa.png" alt="whatsapp" width={70}  height={70}/>
      </div>
      <Nav />
      <HorizontalScroll />
      <Section />
      <TwoColumnSection />
      <Features />
      <InvestmentPlan />
      <VideoSection
        videoUrl="https://youtu.be/3QH7ZTibV-Q"
        title="How to Buy Bitcoin"
        description="   "
      />
      <STwoColumnSection
        bgImage="/images/bg.png"
        sideImage="/images/eth-1.jpg"
        title="Concise Explainer"
        bgImage="/images/bg.png"
        sideImage="/images/eth-1.jpg"
        title="Concise Explainer"
        content="Cryptodeskgain is a leading provider of online bitcoin foreign exchange (FX) trading located in west London, England. We focus more on CFD trading, spread betting and related services. The company’s mission is to provide global traders with access to the world’s largest and most liquid market by offering innovative trading tools, hiring excellent trading educators, investing, meeting strict financial standards and striving for the best online trading experience in the market. Clients have the advantage of mobile trading, one-click order execution and trading from real-time charts also from your dashboard it was designed to cash out to your wallet automatically at a fixed basis which depends on your investment package you registered on. In addition, Cryptodeskgain offers educational courses on Crypto FX trading and provides trading tools, proprietary data and premium resources."
      />
      <BitcoinChart/>
      <PayoutHistory />
      <Footer/>
    </>
  );
}
