// Components/SingleTourDescription/SingleTour.jsx (Client Component)
"use client";
import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi";
import "./single-tours.css";
import GetQuote from "../../Components/GetQuote";
import {
  FaArrowRight,
  FaHeart,
  FaStar,
  FaMapMarkedAlt,
  FaCalendarMinus,
  FaRegHeart,
} from "react-icons/fa";
import SectionTitle from "../../Components/section-title/section-title";
import ClientComponent from "./ClientComponent";
import config from "../../../config";

const SingleClient = ({ params }) => {
  const { slug } = params;
  const [tour, setTour] = useState(null);
  const [inclusions, setInclusions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/tours/${slug}`);
        if (!res.ok) throw new Error("Tour not found.");
        const tourData = await res.json();
        setTour(tourData);

        const inclusionRes = await fetch(
          `${config.API_BASE_URL}/api/inclusion/tour/${slug}`
        );
        const inclusionData = inclusionRes.ok ? await inclusionRes.json() : [];
        setInclusions(inclusionData);
      } catch (err) {
        setError("Unable to load tour details. Please try again later.");
        console.error("Error fetching tour or inclusions:", err);
      }
    };

    fetchTourData();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!tour) return <div>Loading tour details...</div>;

  return (
    <div>
      <div className="home-banner-main relative z-10">
        <img
          className="rounded lg:h-custom object-cover banner-img"
          src={`${config.API_BASE_URL}/public/uploads/tours/${tour.tourCover}`}
          alt="home banner"
        />
      </div>

      <div>
        <ClientComponent inclusions={inclusions} />
      </div>
    </div>
  );
};

export default SingleClient;
