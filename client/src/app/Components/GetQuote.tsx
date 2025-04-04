"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

function GetQuote({tour}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+94", // Default country code
    livingCountry: "",
    nationality: "",
    destination: "",
    arrivalDate: "",
    departureDate: "",
    packageType: "",
    totalPrice: 0, // Example total price
  });

  const [countryCodes, setCountryCodes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [inclusions, setInclusions] = useState([]);  // Define inclusions state

  // Fetch country codes dynamically from an API
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countriesData = await response.json();

        // Map to extract country codes and names
        const codes = countriesData.map((country) => ({
          code: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
          name: country.name.common,
        }));
        setCountryCodes(codes.filter((c) => c.code)); // Filter out entries without codes
        setCountries(countriesData.map((c) => c.name.common).sort()); // Extract sorted country names
      } catch (error) {
        console.error("Failed to fetch country codes:", error);
      }
    };

    fetchCountryCodes();
  }, []);

  useEffect(() => {
    // Fetch inclusions for the tour
    if (tour?._id) {
      const fetchInclusions = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/inclusion/tour/${tour._id}`
          );
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched inclusions:", data); // Log the inclusions data
            setInclusions(data);  // Set inclusions in state
          } else {
            setError("Unable to load inclusions. Please try again later.");
          }
        } catch (err) {
          console.error("Error fetching inclusions:", err);
        }
      };

      fetchInclusions();
    }
  }, [tour?._id]);

  // Function to handle package selection
  const handlePackageSelect = (packageType, price) => {
    setFormData((prevData) => ({
      ...prevData,
      packageType: packageType, // Update the selected package
      totalPrice: price, // Update the total price based on the selected package
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

   
  

    // Filter countries based on the field being typed
    if (["livingCountry", "nationality", "destination"].includes(name)) {
      setActiveField(name); // Keep track of the active input
      if (value.length > 0) {
        setFilteredCountries(
          countries.filter((country) =>
            country.toLowerCase().startsWith(value.toLowerCase())
          )
        );
      } else {
        setFilteredCountries([]);
      }
    }
  };

  const handleSelect = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setFilteredCountries([]); // Clear suggestions
    setActiveField(""); // Reset active field
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const fullMobileNumber = `${formData.countryCode}${formData.mobile}`;
      const payload = { ...formData, mobile: fullMobileNumber };
  
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        
      });
      console.log(payload);
  
      if (response.ok) {
        alert("Booking created successfully! An email notification has been sent.");
      } else {
        alert("Failed to create booking.");
        console.error(await response.json());
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
              <select
                className="bg-gray-100 text-md rounded-l-lg w-28"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
              >
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.code} ({country.name})
                  </option>
                ))}
              </select>
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
        {["livingCountry", "nationality", "destination"].map((field, idx) => (
          <div key={idx}>
            <label
              className="block text-gray-600 mb-2 capitalize"
              htmlFor={field}
            >
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
              type="text"
              placeholder={`Type your ${field}`}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              autoComplete="off"
            />
            {activeField === field && filteredCountries.length > 0 && (
              <ul className="bg-white border mt-2 max-h-40 overflow-y-auto rounded-lg shadow-md">
                {filteredCountries.map((country, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(field, country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">
        Tour Details
      </h2>
      {/* Remaining fields: Destination, Arrival/Departure Dates, PackageType */}
      <div className="space-y-4">
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

      <div>
        <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">
          Package Details
        </h2>
        <div className="space-y-2">
          {/* Display package types with prices and radio buttons */}
          {inclusions
            .filter((inclusion) => inclusion.price !== undefined) // Filter out packages with undefined price
            .map((inclusion, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={inclusion.packageType}
                  name="packageType"
                  value={inclusion.packageType}
                  checked={formData.packageType === inclusion.packageType}
                  onChange={() =>
                    handlePackageSelect(inclusion.packageType, inclusion.price)
                  }
                  className="mr-2"
                />
                <label className="text-lg" htmlFor={inclusion.packageType}>
                  {inclusion.packageType}
                </label>
              </div>
            ))}
        </div>
        <div className="mt-4 flex justify-between">
          <span className="text-xl font-bold"> Total Price:</span>
          <span className="text-2xl">${formData.totalPrice}</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-3 rounded-lg w-full flex items-center justify-center"
      >
        Book Now 
        <AiOutlineArrowRight className="ml-2" />
      </button>
    </div>
  );
}

export default GetQuote;