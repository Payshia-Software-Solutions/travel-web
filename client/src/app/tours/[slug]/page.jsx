import React from "react";
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
import config from "../../../config";
import ClientComponent from "../../Components/SingleTourDescription/ClientComponent";

// Fetches the list of tours and generates static parameters for dynamic routes
export async function generateStaticParams() {
  try {
    const res = await fetch(`${config.API_BASE_URL}/api/tours`);
    const tours = await res.json();

    return tours.map((tour) => ({ slug: tour._id }));
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

// The single tour component
const SingleTour = async ({ params }) => {
  const { slug } = params;

  try {
    // Fetch the tour data using the slug (which is actually the tour's ID)
    const res = await fetch(`${config.API_BASE_URL}/api/tours/${slug}`);
    if (!res.ok) {
      throw new Error("Tour not found.");
    }
    const tour = await res.json();

    const tour_res = await fetch(`${config.API_BASE_URL}/api/tours`);
    const tours = await tour_res.json();

    return (
      <div>
        <div className="home-banner-main relative z-10">
          {/* <Image className="rounded lg:h-custom object-cover" src={HomeBanner} /> */}
          <img
            className="rounded lg:h-custom object-cover banner-img"
            src={`${config.API_BASE_URL}/public/uploads/tours/${tour.tourCover}`}
            alt="home banner"
          />
        </div>

        <div>
          <ClientComponent />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching tour:", error);
    return <div>{error.message}</div>;
  }
};

export default SingleTour;
