import React from "react";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

function GetQuote() {
  return (
    <div className="bg-white border border-blue-700 p-6 w-full mt-8 rounded-xl shadow-lg">
      {/* Personal Details Section */}
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Personal Details</h2>
      <div className="space-y-4">
        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
          type="text"
          placeholder="Name"
        />
        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
          type="email"
          placeholder="Email"
        />
        <div>
          <label className="block text-gray-600 mb-2">Mobile:</label>
          <div className="flex">
            <div className="flex items-center border border-gray-300 p-3 rounded-l-lg bg-gray-100">
              <img
                alt="Country flag"
                className="mr-2"
                src="https://placehold.co/20x20"
              />
              <span>+1</span>
            </div>
            <input
              className="w-full border border-gray-300 p-3 rounded-r-lg focus:border-blue-500"
              type="text"
              placeholder="0000000000"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Living Country:</label>
          <select className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500">
            <option>Australia</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Nationality:</label>
          <select className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500">
            <option>--</option>
          </select>
        </div>
      </div>

      {/* Tour Details Section */}
      <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">Tour Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">Destination:</label>
          <select className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500">
            <option>Select Tour Country</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Arrival Date:</label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
              type="text"
              placeholder="Select Arrival Date"
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Departure Date:</label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500"
              type="text"
              placeholder="Select Departure Date"
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Package Details Section */}
      <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">Package Details</h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <input type="radio" id="silver" name="package" value="silver" className="mr-2" />
          <label htmlFor="silver" className="text-gray-600">Silver</label>
        </div>
        <div className="flex items-center">
          <input type="radio" id="gold" name="package" value="gold" className="mr-2" />
          <label htmlFor="gold" className="text-gray-600">Gold</label>
        </div>
        <div className="flex items-center">
          <input type="radio" id="platinum" name="package" value="platinum" className="mr-2" />
          <label htmlFor="platinum" className="text-gray-600">Platinum</label>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center my-6 font-bold text-lg text-gray-700">
        <span>Total</span>
        <span className="text-black">$15,000</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button className="bg-blue-600 text-white p-3 rounded-lg  w-full mr-3 flex items-center justify-center">
          Book Now <AiOutlineArrowRight className="ml-2" />
        </button>
      
      </div>
    </div>
  );
}

export default GetQuote;
