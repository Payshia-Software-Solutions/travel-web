"use client";

import { useState } from "react";
import GetQuote from "../../Components/GetQuote";
import {
  FaArrowRight,
  FaHeart,
  FaStar,
  FaTrash,
  FaMapMarkedAlt,
  FaCalendarMinus,
  FaRegHeart,
} from "react-icons/fa";
import SectionTitle from "../../Components/section-title/section-title";

function ClientComponent({ inclusions, tour }) {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageClick = (packageType) => {
    setSelectedPackage(packageType === selectedPackage ? null : packageType);
  };

  return (
    <div className="">
      {/* Tab Navigation */}
      <div className="flex justify-between items-center border-b border-gray-300 mt-5">
        {/* Title and Private Tour Label */}
        <div className="flex items-center space-x-2 mt-6 mb-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Sri Lanka Tour Package 7 Days
          </h1>
          <span className="bg-green-500 text-white font-semibold text-sm px-2 py-1 rounded">
            Private Tour
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "itinerary"
                ? "border-t-4 border-green-500"
                : "border-none"
            }`}
            onClick={() => setActiveTab("itinerary")}
          >
            Itinerary
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "inclusions"
                ? "border-t-4 border-green-500"
                : "border-none"
            }`}
            onClick={() => setActiveTab("inclusions")}
          >
            Inclusions
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "summary"
                ? "border-t-4 border-green-500"
                : "border-none"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg lg:col-span-3">
          {/* Active Tab Content */}
          {activeTab === "itinerary" && (
            <div>
              {/* Itinerary content here */}
              <div className="grid ">
                <div className="rounded-lg lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="">
                      <div className="flex gap-4 flex-col">
                        <div className="text-justify text-stone-500 text-xl font-normal leading-normal">
                          {tour.tourDetails}
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="flex gap-2 text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar className="text-gray-300" />
                            <FaStar className="text-gray-300" />
                          </div>
                          <div className="text-blue-500">(20 Reviews)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <div className="mt-5">
                      <SectionTitle title="Schedule" />
                    </div>

                    <div className="w-full mt-2 text-black text-[40px] md:text-5xl font-medium font-['Noto Sans JP'] capitalize leading-[50px]">
                      Tour Day schedule
                    </div>

                    {/* Loop over tourSchedule */}
                    {tour.tourSchedule && tour.tourSchedule.length > 0 ? (
                      tour.tourSchedule.map((day, index) => (
                        <div key={index} className="mt-5 mb-0">
                          <SectionTitle title={`${index + 1}st Day`} />{" "}
                          {/* Dynamic day title */}
                          <div className="w-full text-black text-[30px] font-bold font-['Noto Sans JP'] capitalize leading-[50px]">
                            {day.dayTitle} {/* Dynamic day title */}
                          </div>
                          <div className="my-3">
                            <p className="text-lg leading">
                              {day.dayPlan} {/* Dynamic day plan */}
                            </p>

                            {/* If an image exists, display it */}
                            {day.image && (
                              <img
                                className="rounded-sm object-cover banner-img"
                                src={day.image}
                                alt={`Day ${day.dayId}`}
                              />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No schedule available</div> // If no schedule data is present
                    )}
                  </div>

                  {/*2nd Description */}

                  

                </div>
              </div>
            </div>
          )}
          {activeTab === "inclusions" && (
            <div className="bg-gray-100 rounded-2xl p-4  md:p-4">
              {/* Inclusions content here */}
              <h2 className="text-4xl my-6 text-black font-bold">Inclusions</h2>
              <div className="grid  grid-cols-1 md:grid-cols-4 gap-4">
                {["gold", "platinum", "silver", "bronze"].map((packageType) => (
                  <button
                    key={packageType}
                    onClick={() => handlePackageClick(packageType)}
                    className={`bg-gray-800 text-white hover:bg-blue-600 rounded-lg shadow-md p-4 ${
                      selectedPackage === packageType ? "active" : ""
                    }`}
                  >
                    {packageType.charAt(0).toUpperCase() + packageType.slice(1)}
                  </button>
                ))}
              </div>

              {selectedPackage && (
                <div style={{ marginTop: "1rem" }}>
                  <h3 className=" text-lg md:text-2xl font-semibold my-4">
                    {selectedPackage.charAt(0).toUpperCase() +
                      selectedPackage.slice(1)}{" "}
                    Package
                  </h3>
                  <div className="p-4">
                    <ul className=" text-md  md:text-xl">
                      {inclusions
                        .filter(
                          (inclusion) =>
                            inclusion.packageType === selectedPackage
                        )
                        .flatMap((inclusion) => inclusion.inclusions)
                        .map((item, index) => (
                          <li className="list-disc" key={index}>
                            {item.replace(/['"]+/g, "")}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === "summary" && (
            <div>
              <div className="grid ">
                <div className="rounded-lg lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="">
                      <div className="flex gap-4 flex-col">
                        <div className="text-justify text-stone-500 text-xl font-normal leading-normal">
                        {tour.highlightText}
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="flex gap-2 text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar className="text-gray-300" />
                            <FaStar className="text-gray-300" />
                          </div>
                          <div className="text-blue-500">(20 Reviews)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GetQuote Component - Always Visible */}
        <div className="rounded-lg sticky top-0">
          <h2 className="text-3xl font-bold text-blue-800 my-2">
            Tour Details
          </h2>
          <div className="w-full border-gray-300">
            <div className="border my-1 rounded-lg flex justify-between">
              <div className="text-blue-600 font-semibold text-2xl py-2 mx-1">
                9 Days
              </div>
              <div className="p-2 mx-1 text-right">
                <div className="text-blue-800 text-2xl font-bold">US$ 820</div>
                <p className="text-blue-800 text-sm">Per Person</p>
              </div>
            </div>
            <div className="bg-blue-600 text-white text-center py-2 cursor-pointer rounded-lg">
              Enquire Now
            </div>
          </div>

          <GetQuote />
        </div>
      </div>
    </div>
  );
}

export default ClientComponent;
