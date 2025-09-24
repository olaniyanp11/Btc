import Image from "next/image";
import Section from "../components/Section";
import Nav from "../components/Nav";
import HorizontalScroll from "../components/HorizontalScroll";
import TwoColumnSection from "../components/TwoColumnSection"
import Features from "../components/Features";

export default function Home() {
  return (
    <>
      <Nav />
      <HorizontalScroll />
      <Section />
      <TwoColumnSection />
      <Features />
    </>
  );
}
