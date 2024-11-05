import React from "react";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

function GetQuote() {
  return (
    <div className="bg-white border border-blue-700 p-4 w-full mt-5 rounded-lg">
      {/* Personal Details Section */}
      <div className="mb-4">
        <input
          className="w-full border border-gray-300 p-2 rounded"
          type="text"
          placeholder="Name:"
        />
      </div>
      <div className="mb-4">
        <input
          className="w-full border border-gray-300 p-2 rounded"
          type="email"
          placeholder="Email:"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-1">Mobile:</label>
        <div className="flex">
          <div className="flex items-center border border-gray-300 p-2 rounded-l bg-gray-100">
            <img
              alt="Country flag"
              className="mr-2"
              src="https://placehold.co/20x20"
            />
            <span>+1</span>
          </div>
          <input
            className="w-full border border-gray-300 p-2 rounded-r"
            type="text"
            placeholder="0000000000"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-black text-md my-1 font-bold">
          Living Country:
        </label>
        <select className="w-full border border-gray-300 p-2 rounded">
          <option className="opacity-25">Australia</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-black text-md my-1 font-bold">
          Nationality:
        </label>
        <select className="w-full border border-gray-300 p-2 rounded">
          <option>--</option>
        </select>
      </div>

      {/* Tour Details Section */}
      <div>
        <div className="bg-blue-800 w-[calc(100%+3rem)] -mx-6 my-4">
          <h2 className="text-white text-2xl font-bold p-2">Tour Details</h2>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-md my-1 font-bold">
            Destination:
          </label>
          <select className="w-full border border-gray-300 p-2 rounded">
            <option>Select Tour Country</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-md my-1 font-bold">
            Arrival Date:
          </label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="text"
              placeholder="Select Arrival Date"
            />
            {/* Replace <i> with FaCalendarAlt */}
            <FaCalendarAlt className="absolute right-2 top-3 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-md my-1 font-bold">
            Departure Date
          </label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="text"
              placeholder="Select Departure Date"
            />
            {/* Replace <i> with FaCalendarAlt */}
            <FaCalendarAlt className="absolute right-2 top-3 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Package Details Section */}
      <div className="bg-blue-800 w-[calc(100%+3rem)] -mx-6 my-4">
        <h2 className="text-white text-2xl font-bold p-2">Package Details</h2>
      </div>

      {/* Platinum Package (Selected) */}
      <div className="mb-4 bg bg-gray-100 rounded p-2">
        <h3 className="text-blue-600 font-bold">
          Platinum <span className="float-right">Selected</span>
        </h3>
        <textarea
          className="w-full p-2 rounded mt-2 bg-gray-100 resize-none" // Add resize-none
          rows={3}
        ></textarea>
      </div>

      {/* Gold Package */}
      <div className="mb-4 bg bg-gray-100 rounded p-2">
        <h3 className="text-gray-600 font-bold">Gold</h3>
        <textarea
          className="w-full p-2 rounded mt-2 bg-gray-100 resize-none" // Add resize-none
          rows={3}
        ></textarea>
      </div>

      {/* Silver Package */}
      <div className="mb-4 bg bg-gray-100 rounded p-2">
        <h3 className="text-gray-600 font-bold">Silver</h3>
        <textarea
          className="w-full p-2 rounded mt-2 bg-gray-100 resize-none" // Add resize-none
          rows={3}
        ></textarea>
      </div>

      {/* Another Silver Package */}
      <div className="mb-4 bg bg-gray-100 rounded p-2">
        <h3 className="text-gray-600 font-bold">Silver</h3>
        <textarea
          className="w-full p-2 rounded mt-2 bg-gray-100 resize-none" // Add resize-none
          rows={3}
        ></textarea>
      </div>

      {/* Participants & Total */}
      <div className="flex justify-between items-center mb-4 font-bold">
        <span className="text-gray-700">Participants</span>
        <div className="flex items-center">
          <span className="text-gray-700 mr-2">4</span>
          <button className="text-gray-500 border border-gray-300 p-2 rounded">
            +
          </button>
          <button className="text-gray-500 border border-gray-300 p-2 rounded ml-2">
            -
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 font-bold">
        <span className="text-gray-700">Total</span>
        <span className="text-black font-bold">$15000</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-blue-600 text-white p-1 rounded-sm w-1/2 mr-2 flex items-center justify-center">
          Book Now <AiOutlineArrowRight className="ml-2" />
        </button>
        <button className="border border-blue-600 text-blue-600 p-1 rounded-sm w-1/2 flex items-center justify-center">
          Wishlist <AiOutlineHeart className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default GetQuote;
