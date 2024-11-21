"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Tour } from "@/types/tours";
import CreateTourForm from "./createTourForm";
import UpdateTourForm from "./UpdateTourForm";
import SideModel from "../Modal/SideModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import config from "@/config";
import TourInfo from "./TourInfo";
import CreateInclusion from "./CreateInclusion"; // Import Inclusion component
import Swal from "sweetalert2";
import "./styles.css";
import { FaI } from "react-icons/fa6";
import UpdateTourForm from "./UpdateTourForm"; // Import the UpdateTourForm

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
  const [showUpdateForm, setShowUpdateForm] = useState(false); // New state for controlling the UpdateTourForm modal
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null); // Added state to store the selected tour id
  const [selectedTourData, setSelectedTourData] = useState<Tour | null>(null); // Store selected tour data for update

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
  }, []);

  const handleShowTourInfo = (tourId: string) => {
    setSelectedTourId(tourId); // Set the selected tour id for viewing
    setShowTourInfo(true);
  };

  const handleEditTour = (tourId: string) => {
    const tour = tours.find((tour) => tour._id === tourId);
    if (tour) {
      setSelectedTourData(tour);
      setEditMode(true);
      setShowCreateForm(true);
    }
  };

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

  const handleShowInclusion = (tourId: string) => {
    setSelectedTourId(tourId); // Set the selected tour id for inclusion form
    setShowInclusionForm(true);
  };

  const handleShowUpdateForm = (tour: Tour) => {
    setSelectedTourId(tour._id); // Set the selected tour id
    setSelectedTourData(tour); // Set the selected tour data
    setShowUpdateForm(true); // Open the UpdateTourForm modal
  };

  const handleTourCreated = (newTour: Tour) => {
    if (editMode) {
      setTours((prevTours) =>
        prevTours.map((tour) => (tour._id === newTour._id ? newTour : tour)),
      );
    } else {
      setTours((prevTours) => [...prevTours, newTour]);
    }
    setShowCreateForm(false);
    setEditMode(false);
    setSelectedTourData(null);
  };

  // console.log(selectedTourData);

  return (
    <div>
      <Breadcrumb
        pageName="Tours"
        pageDesc="Find out the status of your bookings"
        btnName="+ Create Tour"
        onClick={() => setShowCreateForm(true)}
      />

      <SideModel
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      >
        <CreateTourForm
          tourData={selectedTourData}
          onTourCreated={handleTourCreated}
        />
      </SideModel>

      <SideModel
        isOpen={showInclusionForm}
        onClose={() => setShowInclusionForm(false)}
      >
        <CreateInclusion tourId={selectedTourId} /> {/* Pass selectedTourId */}
      </SideModel>

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
                      className="btn btn-info mx-1"
                      onClick={() => handleShowTourInfo(tour._id)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleEditTour(tour._id)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleDeleteTour(tour._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="btn btn-info mx-1"
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ToursTable;
