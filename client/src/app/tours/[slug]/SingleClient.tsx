// Components/SingleTourDescription/SingleClient.jsx (Client Component)
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClientComponent from "../../Components/SingleTourDescription/ClientComponent";
import { FaArrowRight, FaHeart, FaStar, FaMapMarkedAlt, FaCalendarMinus, FaRegHeart } from "react-icons/fa";
import config from "../../../config";

const SingleClient = ({ tour }) => {
  const [inclusions, setInclusions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInclusions = async () => {
      try {
        const inclusionRes = await fetch(`${config.API_BASE_URL}/api/inclusion/tour/${tour._id}`);
        const inclusionData = inclusionRes.ok ? await inclusionRes.json() : [];
        setInclusions(inclusionData);
      } catch (err) {
        setError("Unable to load inclusions. Please try again later.");
        console.error("Error fetching inclusions:", err);
      }
    };

    fetchInclusions();
  }, [tour._id]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <ClientComponent inclusions={inclusions} tour={tour} />
    </div>
  );
};

export default SingleClient;
