"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CgArrowDown, CgShoppingCart } from "react-icons/cg";

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
        <CgArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 z-10 mt-2 w-44 bg-white border border-gray-200 border-t-accent border-t-2 shadow-lg  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="block px-4 py-2 hover:bg-gray-100 border-b  border-b-gray-200 last:border-none"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="w-full h-16 bg-white text-primary border-b border-gray-200 flex items-center justify-between px-4 relative">
      {/* Logo */}
      <div className="flex">
        <Image src="/images/logo.png" alt="Logo" width={300} height={50} />
      </div>

      {/* Links */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>

        <Dropdown
          label="Account"
          items={[
            { label: "My Account", href: "/account/profile" },
            { label: "Login", href: "/account/login" },
            { label: "Register", href: "/account/register" },
            { label: "Forget Password", href: "/account/forgot-password" },
          ]}
        />

        <Dropdown
          label="Documents"
          items={[
            { label: "Docs Home", href: "/docs" },
            { label: "API Guide", href: "/docs/api" },
            { label: "FAQ", href: "/docs/faq" },
          ]}
        />
        <Link href="/contact" className="hover:text-blue-600">
          Contact Us
        </Link>

        <Link href="/about" className="hover:text-blue-600 flex items-center justify-between">
          <CgShoppingCart />
          <span className=" bg-accent px-1 text-white ml-1">0</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
