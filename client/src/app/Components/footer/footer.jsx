"use client";
import React from "react";
import Image from "next/image";
import ceylonOdessyLogo from "../../assets/logo.svg";
import VisaLogo from "./visaLogo.svg";
import MasterLogo from "./masterLogo.svg";
import AmexLogo from "./amexLogo.svg";
import PayoneerLogo from "./payoneerLogo.svg";
import "./footer.css";

import { FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-solid border-[#b6a6a6]">
      <div className="container mx-auto px-9 py-16 relative">
        <div className="footer-image mb-4 mr-4">
          <img className="footer-bg-image" src="/images/footer-image.png" />
        </div>
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 relative">
          <div className="mb-8">
            <Image className="font-bold text-2xl mb-5" src={ceylonOdessyLogo} />
            <p className="text-justify text-gray-400">
              Welcome to Ceylon Odyssey, where the journey begins and memories
              are made! As a premier travel company dedicated to crafting
              unforgettable experiences, we invite you to embark on a thrilling
              adventure with us.
            </p>
            <div>
              <div className="mt-3">
                <div className="flex gap-3 items-center mb-3">
                  <FaEnvelope />
                  <span className="text-gray-400">hello@ceylonodyssey.com</span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <FaPhone />
                <span className="text-gray-400">+62 123 456 789</span>
              </div>
            </div>
            <div className="mt-4">Read more about Ceylon Odyssey</div>
          </div>
          <div className="mb-8">
            <div className="font-bold text-2xl mb-6">SiteMap</div>
            <div className="text-justify">
              <ul>
                <li className="mb-4">Adventures</li>
                <li className="mb-4">Hiking</li>
                <li className="mb-4">Day Tours</li>
                <li className="mb-4">Passport & Visa</li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <div className="font-bold text-2xl mb-6">Services</div>
            <ul className="space-y-4 mb-8">
              <li className="mb-4">Adventures</li>
              <li className="mb-4">Hiking</li>
              <li className="mb-4">Day Tours</li>
              <li className="mb-4">Passport & Visa</li>
            </ul>
          </div>
          <div className="mb-8">
            <div className="font-bold text-2xl mb-6">Newsletter</div>
            <p className="mb-6">
              Subscribe to get notified about product launches, special offers,
              and company news.
            </p>
            <div className="footer-content flex mt-3 mr-4">
              <input
                type="text"
                placeholder="Enter your email address"
                className="flex-1 py-2 px-2 bg-gray-100 outline-none"
              />
              <button className="bg-blue-700 text-white py-2 px-2">
                Subscribe
              </button>
            </div>
            <div className="mb-8">
              <div className="font-bold text-2xl mb-4 mt-10">We accept</div>
              <div className="inline-flex items-start gap-[13px] relative">
                <Image
                  className="relative w-[41px] h-[28px]"
                  alt="Payment method visa"
                  src={VisaLogo}
                />
                <Image
                  className="relative w-[41px] h-[28px]"
                  alt="Payment method master"
                  src={MasterLogo}
                />
                <Image
                  className="relative w-[42px] h-[28px]"
                  alt="Payment method amex"
                  src={AmexLogo}
                />
                <Image
                  className="relative w-[42px] h-[28px]"
                  alt="Payment method"
                  src={PayoneerLogo}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-below-text flex justify-between border-t border-solid border-[#8e8d8d] mt-7 pt-8">
          <p className="lg:text-xs md:text-xs text-[#858585]">
            © 2024 Ceylon Odyssey All right reserved
          </p>
          <p className="lg:text-xs md:text-xs text-[#858585]">
            Developed with <span className="footer-heart">♥</span> by
            Fagginapps.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
