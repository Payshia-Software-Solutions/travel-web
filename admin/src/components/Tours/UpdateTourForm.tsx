"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FloatingLabelInput from "../Input";

function UpdateTourForm({ initialData = null, onSubmitSuccess }) {
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
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
        tourCover: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        tourCover: files[0],
      }));
    }
  };

  const handleAddDayPlanClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      dayPlans: [...prevData.dayPlans, { dayId: "", dayTitle: "", dayPlan: "" }],
    }));
  };

  const handleDayPlanChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDayPlans = [...formData.dayPlans];
    updatedDayPlans[index][name] = value;

    setFormData((prevData) => ({
      ...prevData,
      dayPlans: updatedDayPlans,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tourCover && !initialData) {
      toast.error("Tour Cover is required.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("tourName", formData.tourName);
    formDataObj.append("highlightText", formData.highlightText);
    formDataObj.append("tourDetails", formData.tourDetails);
    formDataObj.append("tourPrice", formData.tourPrice);
    formDataObj.append("participants", formData.participants);
    formDataObj.append("noOfDays", formData.noOfDays);
    formData.dayPlans.forEach((dayPlan, index) => {
      formDataObj.append(`dayPlans[${index}][dayId]`, dayPlan.dayId);
      formDataObj.append(`dayPlans[${index}][dayTitle]`, dayPlan.dayTitle);
      formDataObj.append(`dayPlans[${index}][dayPlan]`, dayPlan.dayPlan);
    });
    formDataObj.append(
      "tags",
      formData.tags.split(",").map((tag) => tag.trim())
    );

    if (formData.tourCover instanceof File) {
      formDataObj.append("tourCover", formData.tourCover);
    }

    const createdBy = "66ae7fe4a9498f09f37f01cc";
    formDataObj.append("createdBy", createdBy);
    formDataObj.append("tourCategory", formData.category);

    try {
      const endpoint = initialData
        ? `http://localhost:5000/api/tours/${initialData._id}`
        : "http://localhost:5000/api/tours";
      const method = initialData ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: formDataObj,
      });

      if (response.ok) {
        const message = initialData
          ? "Tour updated successfully!"
          : "Tour created successfully!";
        toast.success(message);
        setFormData({
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
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        const errorData = await response.json();
        toast.error("Error: " + errorData.message || "Failed to submit tour");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Create a Tour</h1>
      <p className="text-gray-600 mb-6">Please fill in the required information for your tour.</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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

        {/* Tags and Cover */}
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
          className="block w-full mt-4 mb-6 text-gray-700"
        />

        {/* Numeric Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
            placeholder="Number of Days"
          />
        </div>

        {/* Tour Details */}
        <div className="mb-6">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            id="tourDetails"
            name="tourDetails"
            rows="5"
            value={formData.tourDetails}
            onChange={handleChange}
            placeholder="Tour Details"
          ></textarea>
        </div>

        {/* Day Plans Section */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleAddDayPlanClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Day Plan
          </button>
          {formData.dayPlans.map((dayPlan, index) => (
            <div key={index} className="mt-4 mb-6">
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
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mt-2"
                name="dayPlan"
                rows="3"
                value={dayPlan.dayPlan}
                onChange={(e) => handleDayPlanChange(index, e)}
                placeholder="Description"
              ></textarea>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-lg"
          >
            Submit Tour
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default UpdateTourForm;
