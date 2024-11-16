"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

function CreateInclusion({ tourId }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [tourDetails, setTourDetails] = useState("");
  const [price, setPrice] = useState(""); // State for price
  const [inclusionsList, setInclusionsList] = useState([]);

  useEffect(() => {
    if (tourId && selectedOption) {
      const fetchInclusions = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/inclusion/tour/${tourId}`,
          );
          const result = await response.json();

          if (response.ok) {
            const inclusion = result.find(
              (item) =>
                item.packageType.toLowerCase() === selectedOption.toLowerCase(),
            );
            if (inclusion) {
              setTourDetails(inclusion.inclusions.join("\n"));
              setPrice(inclusion.price || ""); // Populate price if available
            } else {
              setTourDetails("");
              setPrice("");
            }
          } else {
            toast.error(result.error || "Failed to fetch inclusions.");
          }
        } catch (error) {
          toast.error("An error occurred while fetching inclusions.");
        }
      };

      fetchInclusions();
    }
  }, [tourId, selectedOption]);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption || !tourDetails || !price || !tourId) {
      toast.error(
        "Please select a package type, enter tour details, provide a price, and ensure tour ID is provided.",
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/inclusion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourId,
          packageType: selectedOption.toLowerCase(),
          inclusions: tourDetails.split("\n").map((item) => item.trim()), // Split by new lines
          price: parseFloat(price), // Convert price to a number
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Inclusion created successfully!");

        // Add the new inclusion to the list
        setInclusionsList((prevList) => [
          ...prevList,
          {
            packageType: selectedOption,
            inclusions: tourDetails,
            price: parseFloat(price), // Display price
          },
        ]);

        setSelectedOption("");
        setTourDetails("");
        setPrice("");
      } else {
        toast.error(result.error || "Failed to create inclusion.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
        <div className="mb-4 border-b border-gray">
          <h1 className="text-3xl font-extrabold text-black-2">
            Create Inclusion
          </h1>
          <p>Fill all required fields</p>
        </div>

        <div className="flex gap-5 bg-gray p-2">
          {["Gold", "Silver", "Platinum", "Bronze"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleButtonClick(option)}
              className={`inline-block w-30 rounded-lg ${
                selectedOption === option ? "bg-blue-600" : "bg-black"
              } px-5 py-3 font-medium text-white`}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedOption && (
          <>
            <div className="mt-4">
              <label
                htmlFor="tourDetails"
                className="block text-sm font-bold text-black"
              >
                Tour Details for {selectedOption}
              </label>
              <textarea
                className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
                placeholder="Enter each inclusion on a new line"
                id="tourDetails"
                name="tourDetails"
                rows={6}
                value={tourDetails}
                onChange={(e) => setTourDetails(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="price"
                className="block text-sm font-bold text-black"
              >
                Price
              </label>
              <input
                type="number"
                className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
                placeholder="Enter price"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end gap-4 p-1">
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-block w-1/2 rounded-lg bg-black px-5 py-3 font-medium text-white"
          >
            Submit
          </button>
          {/*delete button*/}
          <button className="inline-block w-24 rounded-lg bg-red px-5 py-3 font-medium flex justify-center text-white">
            <FaTrash />
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Inclusions List</h2>
          <ul>
            {inclusionsList.map((inclusion, index) => (
              <li key={index} className="border-b border-gray py-2">
                <strong>{inclusion.packageType}:</strong> {inclusion.inclusions} 
                <br />
                <strong>Price:</strong> ${inclusion.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateInclusion;
