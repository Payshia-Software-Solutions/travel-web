"use client";

import { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import UpdateBookingForm from "@/components/Booking/UpdateBookingForm";
import CreateTourForm from "@/components/Booking/CreateBooking";
import { Booking } from "@/types/bookings";
import Swal from "sweetalert2";
import config from "@/config";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import SideModel from "../Modal/SideModel";

const BookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isSideModelOpen, setIsSideModelOpen] = useState(false);
  const [isCreateTour, setIsCreateTour] = useState(false);

  const fetchBookings = () => {
    fetch(`${config.API_BASE_URL}/api/bookings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handler for updating a booking
  const handleUpdateClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCreateTour(false); // Set to false to open Update form
    setIsSideModelOpen(true);
  };

  const handleCreateTourClick = () => {
    setSelectedBooking(null);
    setIsCreateTour(true); // Set to true to open Create form
    setIsSideModelOpen(true);
  };

  // Handler for closing the update form
  const handleFormClose = () => {
    setSelectedBooking(null);
    setIsSideModelOpen(false);
    fetchBookings(); // Refresh the bookings list after update
  };

  // Handler for deleting a booking
  const handleDeleteClick = (bookingId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${config.API_BASE_URL}/api/bookings/${bookingId}`,
            {
              method: "DELETE",
            },
          );

          if (!response.ok) {
            throw new Error("Failed to delete booking");
          }

          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking._id !== bookingId),
          );
          Swal.fire("Deleted!", "The booking has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting booking:", error);
          Swal.fire(
            "Error!",
            "There was an issue deleting the booking.",
            "error",
          );
        }
      }
    });
  };

  return (
    <div>
      <Breadcrumb
        pageName="Tours"
        pageDesc="Find out the status of your bookings"
        btnName="+ Create Tour"
        onClick={handleCreateTourClick} // Opens Create form
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[70px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Tour
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Total Distance
                </th>
                <th className="min-w-[100px] px-4 py-4 text-center font-medium text-black  dark:text-white">
                  Package Type
                </th>
                <th className="min-w-[120px] px-4 py-4 text-center font-medium text-black  dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {booking.destination}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{booking.name}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {booking.totalPrice} USD
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {booking.packageType}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5  text-center dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        booking.status === "New Tour"
                          ? "bg-slate-400 text-slate-800"
                          : booking.status === "Payment"
                            ? "bg-orange-400 text-orange-800"
                            : booking.status === "Verify Payment"
                              ? "bg-green-400 text-green-800"
                              : booking.status === "Sent Back"
                                ? "bg-lime-400 text-lime-800"
                                : booking.status === "Cancelled"
                                  ? "bg-rose-400 text-rose-800"
                                  : ""
                      }`}
                    >
                      {booking.status || "New Tour"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleUpdateClick(booking)}
                        className="btn btn-info mx-1"
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(booking._id)}
                        className="btn btn-info mx-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SideModel isOpen={isSideModelOpen} onClose={handleFormClose}>
          {isCreateTour ? (
            <CreateTourForm />
          ) : (
            <UpdateBookingForm
              // booking={selectedBooking}
              itemData={selectedBooking}
              // onClose={handleFormClose}
            />
          )}
        </SideModel>
      </div>
    </div>
  );
};

export default BookingTable;
