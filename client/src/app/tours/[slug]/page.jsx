// pages/tours/[slug]/page.jsx (Server Component)
import React from 'react';
import SingleClient from "./SingleClient";
import config from "../../../config";
import "./single-tours.css";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${config.API_BASE_URL}/api/tours`);
    if (!res.ok) throw new Error("Failed to fetch tours");
    const tours = await res.json();
    
    // Make sure to return slugs in the params
    return tours.map((tour) => ({ slug: tour.slug })); // Corrected to return slug
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

const SingleTour = async ({ params }) => {
  const { slug } = params;

  try {
    const res = await fetch(`${config.API_BASE_URL}/api/tours/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch tour with slug: ${slug}`);
    const tour = await res.json();

    return (
      <div>
        <div className="home-banner-main relative z-10">
          <img
            className="rounded lg:h-custom object-cover banner-img"
            src={`${config.API_BASE_URL}/public/uploads/tours/${tour.tourCover}`}
            alt="Tour banner"
          />
        </div>
        <SingleClient tour={tour} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching tour details:", error);
    return <div>Unable to load tour details. Please try again later.</div>;
  }
};

export const revalidate = 60;
export default SingleTour;
