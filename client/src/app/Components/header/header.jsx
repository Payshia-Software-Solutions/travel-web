"use client";
import React from "react";

import { useEffect, Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import ceylonOdessyLogo from "../../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import SignInModal from "../signin-modal/signin-model";
import SignUpModal from "../signup-modal/signup-modal";

const Header = () => {
  const router = useRouter();
  const currentPath = usePathname();

  // Bootstrap Model
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  //sign in
  const handleShowSignInModal = () => setShowSignInModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  //sign up
  const handleCloseSignUpModal = () => setShowSignUpModal(false);
  const handleShowSignUpModal = () => setShowSignUpModal(true);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [open, setOpen] = useState(false);
  const handleResize = () => {
    // Set isMobile to true when the window width is less than a certain value (e.g., 768px)
    setIsMobile(window.innerWidth < 768);
  };

  const navMenu = [
    {
      id: 1,
      link: "/",
      value: "Home",
    },
    {
      id: 2,
      link: "/tours/",
      value: "Tours",
    },
    {
      id: 3,
      link: "/about-us/",
      value: "About Us",
    },
    {
      id: 4,
      link: "/contact-us/",
      value: "Contact Us",
    },
    {
      id: 5,
      link: "/gallery/",
      value: "Gallery",
    },
    {
      id: 6,
      link: "/blog/",
      value: "Blog",
    },
  ];

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {/* Hardcoded Tab components */}
                      <Tab className="flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium text-gray-900">
                        <Image
                          src={ceylonOdessyLogo}
                          className="mr-2 h-6 sm:h-9"
                          alt="Ceylon Odyssey Logo"
                        />
                      </Tab>
                      {/* Add more Tab components for each category */}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {/* Hardcoded Tab.Panel for the first category */}
                    <Tab.Panel className="space-y-10 px-4 pb-8 pt-10">
                      <div className="grid grid-cols-2 gap-x-4">
                        {/* Hardcoded featured items */}
                        <div className="group relative text-sm z-10">
                          {navMenu.map((navItem, index) => (
                            <a
                              key={index}
                              href={navItem.link}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span className="" aria-hidden="true" />
                              {navItem.value}
                            </a>
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <button
                    onClick={handleShowSignUpModal}
                    className="w-[120px] h-[53px] bg-sky-500 bg-opacity-0 border-2 border-sky-900 "
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-sky-900 text-base font-bold font-Inter leading-7">
                        Signup
                      </div>
                    </div>
                  </button>
                  <div className="flow-root">
                    <button
                      onClick={handleShowSignInModal}
                      className="text-center text-black text-base font-bold font-Inter leading-7 ml-5"
                    >
                      <div>Sign in</div>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/*====Top Bar====*/}
      <header className="relative bg-white">
        <div className="flex h-12 items-center bg-[#06377B] px-4 sm:px-6 lg:px-8 text-[10px] md:text-[12px] lg:text-[14px] font-['Open Sans'] tracking-tight gap-10 hidden sm:flex">
          {/*====call us part====*/}
          <div className="my-1">
            <span className="text-white">Call us:</span>
            <span className="text-white tracking-tight"> </span>
            <span className="text-white tracking-tight">+1-518-555-0181</span>
          </div>
          {/*====mail us part====*/}
          <div className="my-1">
            <span className="text-white">Mail us:</span>
            <span className="text-white tracking-tight"> </span>
            <span className="text-white tracking-tight">
              hello@ceylonodessy.com
            </span>
          </div>
          {/*====social media icons====*/}
          <div className="ml-auto flex items-center gap-10">
            <div className="inline-flex flex-col items-center justify-center gap-10 rounded-[1000px] text-white text-[15px]">
              <button className="relative w-fit mt--1.00px">
                <FaFacebookF />
              </button>
            </div>
            <div className="inline-flex flex-col items-center justify-center gap-10 rounded-[1000px] text-white text-[15px]">
              <button className="relative w-fit mt--1.00px">
                <FaInstagram />
              </button>
            </div>
            <div className="inline-flex flex-col items-center justify-center gap-10 rounded-[1000px] text-white text-[15px]">
              <button className="relative w-fit mt--1.00px">
                <FaYoutube />
              </button>
            </div>
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full">
            <div className="flex h-24 justify-between items-center">
              {/* Logo */}
              <div className="sm:flex justify-start sm:w-full md:w-[100px] lg:w-[200px]">
                <a href="#">
                  <span className="sr-only">Ceylon Odessy</span>
                  <Image
                    src={ceylonOdessyLogo}
                    className="w-full sm:h-9"
                    alt="Ceylon Odyssey Logo"
                  />
                </a>
              </div>

              {/*===button===*/}
              <div className="lg:hidden flex justify-end w-full">
                <button
                  type="button"
                  className="relative rounded-md bg-white text-gray-400 lg:hidden justify-end bg"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex justify-between h-full space-x-8">
                  <Popover className="flex">
                    {({ open }) => (
                      <>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        ></Transition>
                      </>
                    )}
                  </Popover>

                  {navMenu.map((navItem) => (
                    <a
                      key={navItem.id} // Use unique id from navItem
                      href={navItem.link}
                      className={`flex items-center text-sm font-medium text-gray-700 hover:text-dark-blue uppercase hover:underline hover:underline-offset-[10px] hover:underline-4 ${
                        currentPath === navItem.link
                          ? "text-dark-blue underline underline-offset-[10px] underline-4"
                          : ""
                      }`}
                    >
                      {navItem.value}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <button
                    onClick={handleShowSignUpModal}
                    className="w-[120px] h-[49px] bg-sky-500 bg-opacity-0 border-2 border-sky-900 "
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-sky-900 text-base font-bold font-Inter leading-7">
                        Signup
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleShowSignInModal}
                    className="text-center text-black text-base font-bold font-Inter leading-7 ml-5"
                  >
                    <div>Sign in</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ===== Sign - In - Modal ===== */}
      <SignInModal
        showSignInModal={showSignInModal}
        handleCloseSignInModal={handleCloseSignInModal}
      />
      {/* ===== Sign - Up - Modal ===== */}

      {/* Sign Up Modal */}
      <SignUpModal
        showSignUpModal={showSignUpModal}
        handleCloseSignUpModal={handleCloseSignUpModal}
      />
    </div>
  );
};

export default Header;
