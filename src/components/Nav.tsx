"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CgShoppingCart, CgMenu, CgClose } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

type DropdownItem = {
  label: string;
  href: string;
};

const Dropdown = ({
  label,
  items,
}: {
  label: string;
  items: DropdownItem[];
}) => {
  return (
    <div className="relative group">
      {/* Trigger */}
      <button className="flex items-center text-primary hover:text-accent focus:outline-none">
        {label}
        <MdKeyboardArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 z-10 mt-2 w-44 bg-white border border-gray-200 border-t-accent border-t-2 shadow-lg  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="block px-4 py-2 hover:bg-gray-100 border-b border-b-gray-200 last:border-none"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <nav className="w-full bg-white text-primary border-b border-gray-200 px-4 relative">
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex">
          <Image src="/images/logo.png" alt="Logo" width={200} height={40} />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Dropdown
            label="Account"
            items={[
              { label: "My Account", href: "/account/profile" },
              { label: "Login", href: "/login" },
              { label: "Register", href: "/register" },
              { label: "Forget Password", href: "/forgot-password" },
            ]}
          />

          <Dropdown
            label="Documents"
            items={[
              { label: "About Us", href: "/about" },
              { label: "privacy Policy", href: "/privacy-policy" },
              { label: "Terms and conditions", href: "/terms-and-conditions" },
            ]}
          />

          <Link href="/contact" className="hover:text-blue-600">
            Contact Us
          </Link>

          <Link
            href="/about"
            className="hover:text-blue-600 flex items-center justify-between"
          >
            <CgShoppingCart />
            <span className="bg-accent px-1 text-white ml-1 rounded-sm">0</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none flex  items-center gap-2 hover:border p-4 transition-all transition-2 hover:border-accent hover:text-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <CgClose className="hover:text-accent" />
          ) : (
            <CgMenu className="hover:text-accent" />
          )}
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col space-y-4 px-2 pb-4 overflow-hidden"
          >
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            {/* Account Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full font-semibold"
                onClick={() => toggleSection("account")}
              >
                Account
                {openSection === "account" ? <FiMinus /> : <FiPlus />}
              </button>
              <AnimatePresence>
                {openSection === "account" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex flex-col space-y-2 overflow-hidden"
                  >
                    <Link href="/">My Account</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                    <Link href="/forgot-password">Forget Password</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Documents Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full font-semibold"
                onClick={() => toggleSection("docs")}
              >
                Documents
                {openSection === "docs" ? <FiMinus /> : <FiPlus />}
              </button>
              <AnimatePresence>
                {openSection === "docs" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex flex-col space-y-2 overflow-hidden"
                  >
                    <Link href="/about">About Us</Link>
                    <Link href="/privacy-policy">privacy Policy</Link>
                    <Link href="/terms-and-conditions">Terms and conditions</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contact" className="hover:text-blue-600">
              Contact Us
            </Link>

            <Link
              href="/about"
              className="flex items-center hover:text-blue-600"
            >
              <CgShoppingCart />
              <span className="bg-accent px-1 text-white ml-1 rounded-sm">
                0
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
