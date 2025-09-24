"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    bg: "/images/hero2.jpg",
    position: "left",
    title: "Maximum profit from crypto Desk Gain",
  },
  {
    bg: "/images/hero.jpg",
    position: "right",
    title: "Gain from the volatile market Trends with high profits",
  },
];

// Parent animation (controls stagger of children)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // delay between letters
    },
  },
};

// Letter animation
const letterVariants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const Section = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-cover flex items-center transition-all duration-1000"
      style={{ backgroundImage: `url(${slide.bg})` }}
    >
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 p-8">
        {slide.position === "left" ? (
          <>
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <motion.h1
                className="text-4xl md:text-7xl font-bold text-white mb-4 flex flex-wrap"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {slide.title.split("").map((char, i) => (
                  <motion.span key={i} custom="left" variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className="bg-accent text-white text-2xl animate-pulse px-6 py-3 rounded-full"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-accent text-white text-2xl animate-pulse px-6 py-3 rounded-full"
                >
                  Register
                </Link>
              </div>
            </div>
            <div></div>
          </>
        ) : (
          <>
            <div></div>
            {/* Right Content */}
            <div className="flex flex-col justify-center items-end text-right">
              <motion.h1
                className="text-4xl md:text-7xl font-bold text-white mb-4 flex flex-wrap justify-end"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {slide.title.split("").map((char, i) => (
                  <motion.span key={i} custom="right" variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className="bg-accent text-white text-2xl animate-pulse px-6 py-3 rounded-full"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-accent text-white text-2xl animate-pulse px-6 py-3 rounded-full"
                >
                  Register
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Section;
