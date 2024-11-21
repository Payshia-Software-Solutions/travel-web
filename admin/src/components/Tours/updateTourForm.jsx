"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FloatingLabelInput from "../Input";

function UpdateTourForm({ tourData }) {
  console.log("Received tourData in UpdateTourForm:", tourData);

  // Ensure your useEffect logs if this data is used in state initialization
  useEffect(() => {
    if (tourData) {
      console.log("tourData inside useEffect:", tourData);
    } else {
      console.error("No tourData received!");
    }
  }, [tourData]);

  const [formData, setFormData] = useState({
    tourName: "",
    highlightText: "",
    category: "",
    tags: "",
    participants: "",
    tourPrice: "",
    noOfDays: "",
    tourDetails: "",
    dayPlans: [],
    tourCover: "",
  });

  useEffect(() => {
    console.log("Received tourData:", tourData);
    // Populate form state with tourData when component mounts or tourData changes
    if (tourData) {
      console.log("Received tourData:", tourData);
      setFormData({
        tourName: tourData.tourName || "",
        highlightText: tourData.highlightText || "",
        category: tourData.tourCategory || "",
        tags: tourData.tags.join(", ") || "",
        participants: tourData.participants || "",
        tourPrice: tourData.tourPrice || "",
        noOfDays: tourData.noOfDays || "",
        tourDetails: tourData.tourDetails || "",
        dayPlans: tourData.tourSchedule || [],
        tourCover: tourData.tourCover || "",
      });
    }
  }, [tourData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      tourCover: file,
    }));
  };

  const handleDayPlanChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDayPlans = [...formData.dayPlans];
    updatedDayPlans[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      dayPlans: updatedDayPlans,
    }));
  };

  const handleAddDayPlanClick = () => {
    setFormData((prev) => ({
      ...prev,
      dayPlans: [...prev.dayPlans, { dayId: "", dayTitle: "", dayPlan: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API submission logic here
    toast.success("Tour updated successfully!");
  };

  return (
    <div>
      <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
        <div className="mb-4 border-b border-gray">
          <h1 className="text-3xl font-extrabold text-black-2">Update Tour</h1>
          <p>Fill all required fields</p>
        </div>

        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {/* Basic Information Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FloatingLabelInput
              id="tourName"
              name="tourName"
              value={formData.tourName}
              onChange={handleChange}
              placeholder="Tour Name"
            />
            <FloatingLabelInput
              id="highlightText"
              name="highlightText"
              value={formData.highlightText}
              onChange={handleChange}
              placeholder="Highlight Text"
            />
            <FloatingLabelInput
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
          </div>

          {/* Tags, Cover, Participants, etc. */}
          <FloatingLabelInput
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma-separated)"
          />

          <input
            type="file"
            name="tourCover"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          {/* Numeric Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <FloatingLabelInput
              id="participants"
              name="participants"
              type="number"
              value={formData.participants}
              onChange={handleChange}
              placeholder="Participants"
            />
            <FloatingLabelInput
              id="tourPrice"
              name="tourPrice"
              type="number"
              value={formData.tourPrice}
              onChange={handleChange}
              placeholder="Tour Price"
            />
            <FloatingLabelInput
              id="noOfDays"
              name="noOfDays"
              type="number"
              value={formData.noOfDays}
              onChange={handleChange}
              placeholder="No of Days"
            />
          </div>

          {/* Text Area for Tour Details */}
          <textarea
            className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
            placeholder=" "
            id="tourDetails"
            name="tourDetails"
            rows={5}
            value={formData.tourDetails}
            onChange={handleChange}
          />
          <label
            htmlFor="tourDetails"
            className="peer-focus:text-gray-600 absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-2 text-sm font-bold text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sm"
          >
            Tour Details
          </label>

          {/* Day Plans Section */}
          <button
            type="button"
            onClick={handleAddDayPlanClick}
            className="mb-4 inline-block rounded-lg bg-blue-500 px-4 py-2 font-medium text-white"
          >
            Add Day Plan
          </button>
          {formData.dayPlans.map((dayPlan, index) => (
            <div key={index} className="mb-4">
              <FloatingLabelInput
                name="dayId"
                value={dayPlan.dayId}
                onChange={(e) => handleDayPlanChange(index, e)}
                type="number"
                placeholder="Day"
              />
              <FloatingLabelInput
                name="dayTitle"
                value={dayPlan.dayTitle}
                onChange={(e) => handleDayPlanChange(index, e)}
                placeholder="Title"
              />
              <textarea
                className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
                name="dayPlan"
                rows={3}
                value={dayPlan.dayPlan}
                onChange={(e) => handleDayPlanChange(index, e)}
                placeholder="Description"
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Update Tour
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateTourForm;
