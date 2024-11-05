"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "../section-title/section-title";
import { HiUsers } from "react-icons/hi";
import config from "../../../config";

import {
  FaMapMarkedAlt,
  FaCalendarMinus,
  FaArrowRight,
  FaRegHeart,
} from "react-icons/fa";

interface Tour {
  _id: string;
  tourCover: string;
  tourName: string;
  noOfDays: string;
  basePlace: string;
  participants: string;
  tourPrice: string;
  tourDetails: string;
}

function ReadyToRide() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [tourCategories, setTourCategories] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/tours`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setTours(data);
      } catch (error) {
        setError("Failed to fetch tours");
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/tourcategories`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setTourCategories(data);
      } catch (error) {
        setError("Failed to fetch tour categories");
        console.error("Failed to fetch tour categories:", error);
      }
    };

    fetchCategories();
  }, []);

  console.log(tours);
  return (
    <div className="container-fluid">
      <div className="ready-to-ride mt-5">
        <div className="rtr-section mt-4">
          <SectionTitle title="ready to ride" />
          <div className="flex justify-between">
            <h1 className="lg:text-5xl sm:text-xl text-xl font-bold mb-4">
              Our Tour Lineup
            </h1>
            <h1 className="lg:text-2xl sm:text-xl text-xl font-bold mb-4 text-blue-700">
              View All
            </h1>
          </div>
        </div>
        {/* Apply package-container class to this div */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 ">
          {tours.slice(0, 4).map((tour) => (
            <div key={tour._id} className="">
              <div className="tour-card">
                <div className="relative">
                  <div className="h-[250px] rounded-xl">
                    <img
                      src={`${config.API_BASE_URL}/public/uploads/tours/${tour.tourCover}`}
                      alt={tour.tourName}
                      className="object-cover w-full h-full rounded-t-xl"
                    />
                  </div>

                  <div className="blue-div flex justify-center items-center">
                    <div className="package-info flex items-center">
                      <div className="flex items-center">
                        <FaCalendarMinus className="bluediv-icons" />
                        <p className="bluediv-text ml-1 text-nowrap">
                          {tour.noOfDays}D
                        </p>
                      </div>
                      <div className="vl"></div>
                      <div className="flex items-center">
                        <FaMapMarkedAlt className="bluediv-icons" />
                        <p className="bluediv-text ml-1">{tour.basePlace}</p>
                      </div>

                      <div className="vl"></div>
                      <div className="flex items-center">
                        <HiUsers className="bluediv-icons" />
                        <p className="bluediv-text ml-1 text-nowrap">
                          {tour.participants}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tour-card-content shadow-sm">
                  <h5 className="text-xl font-bold mt-5 pl-3">
                    <a href={`/tours/${tour._id}`}>{tour.tourName}</a>
                  </h5>
                  <div className="text-xl pl-3 font-bold text-end">
                    ${tour.tourPrice}
                  </div>

                  <p className="text-justify mt-2 pl-3 pr-3">
                    {tour.tourDetails}
                  </p>
                  <div className="rtr-bottom-div flex justify-around rounded pt-1 pb-1 mt-3">
                    <a href={`/tours/${tour._id}`}>
                      <button className="btn rtr-book-now flex py-2 px-4">
                        Open
                        <FaArrowRight className="bottom-button-icon ml-2 mt-1 " />
                      </button>
                    </a>
                    <div className="rtr-vl"></div>
                    <button className="btn rtr-wish-list flex py-2 px-4">
                      Wish List{" "}
                      <FaRegHeart className="bottom-button-icon ml-2 mt-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a href="/tours">
            <button className="button btn-color rounded-0 block btn-lg btn btn-outline-primary mt-5 px-3 py-2 border-2">
              View More
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ReadyToRide;
