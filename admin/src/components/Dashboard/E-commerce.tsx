"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import DashboardTable from "../Tables/DashboardTable";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";

//icons
import { FaFire, FaClock } from "react-icons/fa";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { IoMdBookmarks } from "react-icons/io";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Total Views */}
        <CardDataStats title="Total Bookings" total="20">
          <FaFire className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>

        {/* Total Tours */}
        <CardDataStats title="Total Tours" total="10">
          <GiEarthAfricaEurope className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>

        {/* Pending Approvals */}
        <CardDataStats title="Pending Approvals" total="15">
          <FaClock className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>

        {/* Completed Tours */}
        <CardDataStats title="Completed Tours" total="35">
          <IoMdBookmarks className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-6">
          <DashboardTable />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <ChartOne />
        </div>
        {/* <ChartTwo />
        <ChartThree /> */}
        {/* <MapOne /> */}

        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
