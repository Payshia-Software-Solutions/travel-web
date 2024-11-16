"use client";
import React, { useEffect, useState } from "react";
import ClientComponent from "../../Components/SingleTourDescription/ClientComponent";
import config from "../../../config";

const SingleClient = ({ tour }) => {
  const [inclusions, setInclusions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Console log tour._id to check if it is accessible
    console.log("Tour ID:", tour?._id);

    if (tour?._id) {
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
    }
  }, [tour?._id]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <ClientComponent inclusions={inclusions} tour={tour} />
    </div>
  );
};

export default SingleClient;
