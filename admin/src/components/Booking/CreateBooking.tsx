"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Booking } from "@/types/booking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config";
import FloatingLabelInput from "../Input";

const CreateBooking: React.FC = () => {
  const [bookingData, setBookingData] = useState<Booking>({
    _id: "",
    name: "",
    email: "",
    mobile: "",
    livingCountry: "",
    nationality: "",
    destination: "",
    arrivalDate: "",
    departureDate: "",
    packageType: "",
    totalPrice: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(bookingData); 
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error:", response.status, errorMessage);
        throw new Error("Failed to create booking");
      }

      const createdBooking = await response.json();
      toast.success("Booking created successfully!");
      setBookingData({
        _id: "",
        name: "",
        email: "",
        mobile: "",
        livingCountry: "",
        nationality: "",
        destination: "",
        arrivalDate: "",
        departureDate: "",
        packageType: "silver",
        totalPrice: 0,
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    const yyyy = formattedDate.getFullYear();
    const mm = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(formattedDate.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
      <div className="mb-4 border-b border-gray">
        <h1 className="text-3xl font-extrabold text-black-2">Create Booking</h1>
        <p>Fill all required fields</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FloatingLabelInput
            id="name"
            name="name"
            placeholder="Full Name"
            value={bookingData.name}
            onChange={handleChange}
          />
          <FloatingLabelInput
            id="email"
            name="email"
            placeholder="Email"
            value={bookingData.email}
            onChange={handleChange}
          />
          <FloatingLabelInput
            id="mobile"
            name="mobile"
            placeholder="Mobile"
            value={bookingData.mobile}
            onChange={handleChange}
          />
          <FloatingLabelInput
            id="livingCountry"
            name="livingCountry"
            placeholder="Living Country"
            value={bookingData.livingCountry}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-gray-600">Nationality:</label>
          <select
            className="border-gray-300 w-full rounded-lg border p-3"
            name="nationality"
            value={bookingData.nationality}
            onChange={handleChange}
          >
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="United States">United States</option>
          </select>

          <label className="text-gray-600">Destination:</label>
          <select
            className="border-gray-300 w-full rounded-lg border p-3"
            name="destination"
            value={bookingData.destination}
            onChange={handleChange}
          >
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="United States">United States</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <FloatingLabelInput
            id="arrivalDate"
            name="arrivalDate"
            type="date"
            placeholder="Arrival Date"
            value={formatDate(bookingData.arrivalDate)}
            onChange={handleChange}
          />
          <FloatingLabelInput
            id="departureDate"
            name="departureDate"
            type="date"
            placeholder="Departure Date"
            value={formatDate(bookingData.departureDate)}
            onChange={handleChange}
          />
          <FloatingLabelInput
            id="totalPrice"
            name="totalPrice"
            placeholder="Total Price"
            value={String(bookingData.totalPrice)}
            onChange={handleChange}
          />
        </div>

        <div className="my-4 border-b border-gray">
          <h1 className="text-3xl font-extrabold text-black-2">Package Details</h1>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="silver"
              name="packageType"
              value="silver"
              checked={bookingData.packageType === "silver"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="silver" className="text-gray-600">Silver</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="gold"
              name="packageType"
              value="gold"
              checked={bookingData.packageType === "gold"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="gold" className="text-gray-600">Gold</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="platinum"
              name="packageType"
              value="platinum"
              checked={bookingData.packageType === "platinum"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="platinum" className="text-gray-600">Platinum</label>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            Create Booking
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateBooking;
