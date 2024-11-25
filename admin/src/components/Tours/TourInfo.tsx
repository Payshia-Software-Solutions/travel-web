// TourInfo.tsx
import React, { useState, useEffect } from "react";
import { Tour } from "@/types/tours"; // Adjust the import path as necessary
import config from "@/config"; // Adjust the import path as necessary
import InfoCard from "./InfoCards";
import DayPlan from "./DayPlan";
import Tabs from "../Tabs/Tabs";

interface TourInfoProps {
  slug: string;
}

const TourInfo: React.FC<TourInfoProps> = ({ slug }) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/tours/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tour details");
        }
        const data = await response.json();
        setTour(data);
        if (data.tourCategory) {
          fetchCategoryName(data.tourCategory);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryName = async (categoryId: string) => {
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/api/tourcategories/${categoryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category details");
        }
        const categoryData = await response.json();
        setCategoryName(categoryData.categoryName);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchTour();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tour) return <div>No tour details available</div>;


  return (
    <div className="mx-auto my-8 rounded-lg bg-white p-6">
      <div>
        {/* Mobile View */}
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>
          <select
            id="Tab"
            className="border-gray-200 w-full rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="overview">Overview</option>
            <option value="schedule">Schedule</option>
            <option value="details">Gallery</option>
          </select>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
          <div className="border-gray-200 border-b">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <a
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-bold  ${
                  activeTab === "overview"
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("overview");
                }}
                aria-current={activeTab === "overview" ? "page" : undefined}
              >
                Overview
              </a>
              <a
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-bold ${
                  activeTab === "schedule"
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("schedule");
                }}
                aria-current={activeTab === "schedule" ? "page" : undefined}
              >
                Schedule
              </a>
              <a
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-bold ${
                  activeTab === "gallery"
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("gallery");
                }}
                aria-current={activeTab === "gallery" ? "page" : undefined}
              >
                Gallery
              </a>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === "overview" && (
            <div key="overview" className="tab-content">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-600">
                  {tour.tourName}
                </h2>
                <p className="text-gray-500 text-sm">{tour.highlightText}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className="col-span-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4">
                    <InfoCard label="Tour ID" value={tour.tourId} />
                    <InfoCard label="Participants" value={tour.participants} />
                    <InfoCard label="tourPrice" value={tour.tourPrice} />
                    <InfoCard label="Days" value={tour.noOfDays} />
                    <InfoCard label="Category" value={categoryName} />
                    <InfoCard
                      label="Status"
                      value={tour.isActive ? "Active" : "Inactive"}
                    />
                  </div>
                </div>
                <div>
                  <img
                    src={`${config.API_BASE_URL}/public/uploads/tours/${tour.tourCover}`}
                    className="w-full rounded-xl object-cover"
                    alt="Image"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <InfoCard label="Details" value={tour.tourDetails} />
                <InfoCard label="Tags" value={tour.tags} />
              </div>
            </div>
          )}
          {activeTab === "schedule" && (
            <div key="schedule" className="tab-content">
              <div className="mt-6">
                <strong className="text-gray-700 block">Tour Schedule</strong>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  {tour.tourSchedule.map((day, index) => (
                    <DayPlan
                      day={day.dayId}
                      dayTitle={day.dayTitle}
                      value={day.dayPlan}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "gallery" && (
            <div key="details" className="tab-content"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourInfo;
