import React from "react";
import "./contact-us.css";
import HomeBannerMain from "../Components/HomeBanner/Hero";

const ContactUs = () => {
  return (
    <div>
      <HomeBannerMain />
      <div className="flex flex-col lg:flex-row mt-5">
        {/* Contact Left Box */}
        <div className="w-full lg:w-1/2 bg-sky-900 text-white p-8">
          <div className="pb-4">
            <div className="w-23 h-4 px-2 bg-white justify-start items-start gap-2.5 inline-flex mb-5">
              <div className="text-black text-xs font-medium uppercase leading-tight tracking-widest">
                contact
              </div>
            </div>
            <div className="text-3xl font-semibold capitalize leading-10">
              do you have any questions?
            </div>
          </div>
          <div className="text-white text-opacity-60 font-normal leading-normal">
            Sapien amet dui rutrum lectus accumsan morbi aliquam interdum. Nisl
            malesuada imperdiet nunc ultricies massa id urna sit. Elementum
            velit aliquam aliquet aliquam.
          </div>
          <div className="pt-8 flex flex-col lg:flex-row justify-between items-start">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="text-sm font-black"></div>
                <div className="text-base font-medium">
                  50A - Wetland Avenue Coastline Boulevard, NY USA
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-sm font-black"></div>
                <div className="text-base font-medium">+94 112 35 4453</div>
              </div>
              <div className="flex gap-4">
                <div className="text-sm font-black"></div>
                <div className="text-base font-medium">
                  info@ceylonodyssey.com
                </div>
              </div>
            </div>


          </div>

          <div className="bg-white p-2 rounded-lg mt-9 justify-center">
            <div className="flex gap-3">
              <img
                  className="w-20 h-20 rounded-full"
                  src="https://via.placeholder.com/75x75"
              />


              <div>
                <div className="justify-items-start">
                <span className="text-neutral-400 text-sm font-normal leading-snug">
                  Mondays - Sundays
                  <br/>
                </span>
                  <span className="text-neutral-700 text-sm font-medium leading-snug">
                  7am - 11pm ET | 4am - 8pm PT
                </span>
                </div>


              </div>

            </div>

            <div className="flex flex-col justify-items-end mt-3">
              <div className="text-neutral-900 text-base font-normal leading-tight">
                Need help?
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-snug">
                Call our product expert
              </div>
              <div className="text-sky-900 text-base font-normal leading-tight">
                +94 112 35 4453
              </div>
            </div>

            <div className="mt-4">
              <button
                  className="w-full sm:w-86 h-12 px-8 py-3 bg-white border border-sky-900 rounded flex items-center justify-center gap-2">
                <img
                    className="w-4 h-4"
                    src="https://via.placeholder.com/15x16"
                    alt="Chat Icon"
                />
                <span className="text-sky-900 text-base font-normal capitalize leading-normal">
                    Chat with us
                  </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side box */}
        <div className="w-full lg:w-1/2 p-8 bg-neutral-100">
          <div className=" flex flex-col justify-center items-start">
            <div className="flex flex-col gap-2 mt-20">
              <div className="text-3xl font-medium capitalize leading-9">
                send a message
              </div>
              <div className="text-base font-normal leading-normal">
                Laoreet scelerisque euismod egestas suspendisse aliquet
              </div>
            </div>

            {/* Include the previous component here */}
            <div className="w-full sm:max-w-[554px] mx-auto mt-4 sm:mt-0 flex-col justify-start items-start gap-4 inline-flex">
              <div className="w-full p-4 bg-white border border-black border-opacity-30 justify-start items-center gap-2 inline-flex">
                <div className="text-black text-opacity-30 text-[15px] font-normal leading-normal">
                  Name
                </div>
              </div>
              <div className="w-full p-4 bg-white border border-black border-opacity-30 justify-start items-center gap-2 inline-flex">
                <div className="text-black text-opacity-30 text-[15px] font-normal leading-normal">
                  Email address
                </div>
              </div>
              <div className="w-full px-4 pt-4 pb-16 bg-white border border-black border-opacity-30 justify-start items-center gap-2 inline-flex">
                <div className="text-black text-opacity-30 text-[15px] font-normal leading-normal">
                  Messages
                </div>
              </div>
              <div className="w-full h-[58px] px-8 py-4 bg-sky-900 justify-center items-center gap-2 inline-flex">
                <div className="text-white text-base font-medium capitalize leading-normal">
                  send message
                </div>
                <div className="text-white text-[15px] font-black uppercase leading-normal tracking-wide">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ */}
      <div className="relative w-full bg-white px-6 pt-10 pb-8 mt-8 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10 lg:max-w-6xl">
        <div className="mx-auto px-5">
          <div className="flex flex-col items-start">
            <div className="w-[93px] h-[26px] bg-sky-900">
              <div className="text-center text-white text-l font-medium uppercase tracking-[6.60px]">
                FAQs
              </div>
            </div>
            <p className="mt-3 text-xl text-neutral-500 md:text-xl">
              Your Journey Starts with Answers
            </p>
          </div>
          <div className="mx-auto mt-4 grid max-w-4xl ">
            {/*====quiz start===*/}
            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start bg-neutral-50 justify-between font-medium items-center shadow-lg ">
                  <span className="flex items-center gap-4">
                    <div className="w-full max-w-screen-xl mx-auto h-[71.37px] rounded-lg border-l-8 border-sky-900 flex items-center pl-4">
                      What documents do I need for international travel?
                    </div>
                  </span>
                  <span className="transition group-open:rotate-180 mr-5">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                  Springerdata offers a variety of billing options, including
                  monthly and annual subscription plans, as well as
                  pay-as-you-go pricing for certain services. Payment is
                  typically made through a credit card or other secure online
                  payment method.
                </p>
              </details>
            </div>

            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start bg-neutral-50 justify-between font-medium items-center shadow-lg">
                  <span className="flex items-center gap-4">
                    <div className="w-full max-w-screen-xl mx-auto h-[71.37px] rounded-lg border-l-8 border-sky-900 flex items-center pl-4">
                      What documents do I need for international travel?
                    </div>
                  </span>
                  <span className="transition group-open:rotate-180 mr-5 ">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                  Springerdata offers a variety of billing options, including
                  monthly and annual subscription plans, as well as
                  pay-as-you-go pricing for certain services. Payment is
                  typically made through a credit card or other secure online
                  payment method.
                </p>
              </details>
            </div>

            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start bg-neutral-50 justify-between font-medium items-center shadow-lg ">
                  <span className="flex items-center gap-4">
                    <div className="w-full max-w-screen-xl mx-auto h-[71.37px] rounded-lg border-l-8 border-sky-900 flex items-center pl-4">
                      What documents do I need for international travel?
                    </div>
                  </span>
                  <span className="transition group-open:rotate-180 mr-5">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                  Springerdata offers a variety of billing options, including
                  monthly and annual subscription plans, as well as
                  pay-as-you-go pricing for certain services. Payment is
                  typically made through a credit card or other secure online
                  payment method.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
