"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Tour } from "@/types/tours";
import CreateTourForm from "./createTourForm";
import SideModel from "../Modal/SideModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import config from "@/config";
import TourInfo from "./TourInfo";
import CreateInclusion from "./CreateInclusion"; // Import Inclusion component
import Swal from "sweetalert2";
import "./styles.css";
import UpdateTourForm from "./UpdateTourForm";
import { FaI } from "react-icons/fa6";
const ToursTable = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [tours, setTours] = useState<Tour[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showInclusionForm, setShowInclusionForm] = useState(false);
  const [showTourInfo, setShowTourInfo] = useState(false);

  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [selectedTourData, setSelectedTourData] = useState<Tour | null>(null);

  // Fetch tours from the server
  const fetchTours = () => {
    fetch(`${config.API_BASE_URL}/api/tours`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTours(Array.isArray(data) ? data : data.tours || []);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
        toast.error("Failed to fetch tours.");
      });
  };

  useEffect(() => {
    fetchTours();
    const interval = setInterval(fetchTours, 10000); // Poll every 10 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);


  // Delete a tour
  const handleDeleteTour = async (tourId: string) => {
    const tour = tours.find((tour) => tour._id === tourId);
    if (tour) {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete the tour "${tour.tourName}"? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              `${config.API_BASE_URL}/api/tours/${tourId}`,
              {
                method: "DELETE",
              },
            );

            if (!response.ok) {
              throw new Error("Failed to delete tour");
            }

            setTours((prevTours) => prevTours.filter((t) => t._id !== tourId));
            toast.success("Tour deleted successfully!");
          } catch (error) {
            console.error("Error deleting tour:", error);
            toast.error("Failed to delete tour.");
          }
        }
      });
    }
  };

  // Show inclusion modal
  const handleShowInclusion = (tourId: string) => {
    setSelectedTourId(tourId);
    setShowInclusionForm(true);
  };
  // Show tour info modal
  const handleShowTourInfo = (tour: Tour) => {
    if (!tour.slug) {
      toast.error("Tour slug is missing");
      console.error("Error: Missing slug for tour:", tour);
      return;
    }
    
    setSelectedTourId(tour);
    setShowTourInfo(true);
    console.log("Selected Tour Slug:", tour.slug);
  };

  // Show update form modal
  const handleShowUpdateForm = (tour: Tour) => {
    if (!tour.slug) {
      toast.error("Tour slug is missing. Cannot update this tour.");
      console.error("Error: Missing slug for tour:", tour);
      return;
    }
    setSelectedTourData(tour);
    setShowUpdateForm(true);
    console.log("Selected Tour Slug:", tour.slug);
  };

  return (
    <div>
      <Breadcrumb
        pageName="Tours"
        pageDesc="Find out the status of your bookings"
        btnName="+ Create Tour"
        onClick={() => setShowCreateForm(true)}
      />

      {/* Create Tour Form */}
      <SideModel
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      >
        <CreateTourForm
          tourData={selectedTourData}
          onTourCreated={(newTour) => {
            setTours((prevTours) => [...prevTours, newTour]);
            setShowCreateForm(false);
            toast.success("Tour created successfully!");
          }}
        />
      </SideModel>

      {/* Update Tour Form */}
      <SideModel
        isOpen={showUpdateForm}
        onClose={() => {
          setShowUpdateForm(false);
          setSelectedTourData(null);
        }}
      >
        <UpdateTourForm
          slug={selectedTourData?.slug}
          tourData={selectedTourData}
          onTourUpdated={(updatedTour) => {
            setTours((prevTours) =>
              prevTours.map((tour) =>
                tour.slug === updatedTour.slug ? updatedTour : tour,
              ),
            );
            setShowUpdateForm(false);
            toast.success("Tour updated successfully!");
          }}
        />
      </SideModel>

      {/* Inclusion Form */}
      <SideModel
        isOpen={showInclusionForm}
        onClose={() => setShowInclusionForm(false)}
      >
        <CreateInclusion tourId={selectedTourId} />
      </SideModel>

      {/* Tours Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Tour Name
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Participants
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Days
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr key={tour._id}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {tour.tourName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {tour.participants}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatter.format(tour.tourPrice)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {tour.noOfDays}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <button
                      className="mr-3 text-primary"
                      onClick={() => handleShowTourInfo(tour.slug)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="mr-3 text-primary"
                      onClick={() => handleShowUpdateForm(tour)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="text-danger"
                      onClick={() => handleDeleteTour(tour._id)}
                    >
                      <FaTrash />
                    </button>
                    {/*INclution button  */}
                    <button
                      className="text-primary"
                      onClick={() => handleShowInclusion(tour._id)}
                    >
                      <FaI />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tour Info Modal */}
      <SideModel isOpen={showTourInfo} onClose={() => setShowTourInfo(false)}>
        <TourInfo slug={selectedTourData?.slug} />
      </SideModel>

      <ToastContainer />
    </div>
  );
};

export default ToursTable;
