"use client";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

function GetQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    livingCountry: "",
    nationality: "",
    destination: "",
    arrivalDate: "",
    departureDate: "",
    packageType: "silver",
    totalPrice: 15000, // Example total price
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (response.ok) {
        alert("Booking created successfully!");
      } else {
        alert("Failed to create booking.");
        console.log(formData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white border border-blue-700 p-6 w-full mt-8 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        Personal Details
      </h2>
      <div className="space-y-4">
        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div>
          <label className="block text-gray-600 mb-2">Mobile:</label>
          <div className="flex">
            <div className="flex items-center border border-gray-300 p-3 rounded-l-lg bg-gray-100">
              <span>+1</span>
            </div>
            <input
              className="w-full border border-gray-300 p-3 rounded-r-lg focus:border-blue-500"
              type="text"
              placeholder="0000000000"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Living Country:</label>
          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
            name="livingCountry"
            value={formData.livingCountry}
            onChange={handleChange}
          >
            <option value="Australia">Australia</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            {/* Add more country options here */}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Nationality:</label>
          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          >
            <option value="sri lanka">Sri Lanka</option>
            <option value="india">India</option>
            <option value="united states">United States</option>
            {/* Add more nationality options here */}
          </select>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">
        Tour Details
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">Destination:</label>
          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          >
            <option className="" value="sri lanka">
              {" "}
              Sri Lanka{" "}
            </option>
            <option value="india">India </option>
            <option value="Pakisthan">Pakisthan </option>
            <option value="Sri Lanka ">Sri Lanka </option>

            {/* Add more destination options here */}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Arrival Date:</label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Departure Date:</label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">
        Package Details
      </h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="radio"
            id="silver"
            name="packageType"
            value="silver"
            checked={formData.packageType === "silver"}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="silver" className="text-gray-600">
            silver
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="gold"
            name="packageType"
            value="gold" // Change "Gold" to "gold"
            checked={formData.packageType === "gold"}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="gold" className="text-gray-600">
            gold
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="platinum"
            name="packageType"
            value="platinum"
            checked={formData.packageType === "platinum"}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="platinum" className="text-gray-600">
            platinum
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center my-6 font-bold text-lg text-gray-700">
        <span>Total</span>
        <span className="text-black">${formData.totalPrice}</span>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-3 rounded-lg w-full mr-3 flex items-center justify-center"
        >
          Book Now <AiOutlineArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default GetQuote;
