"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabelInput from "../Input";

function UpdateTourForm({ slug }) {
  
  const [formData, setFormData] = useState({
    tourName: "",
    highlightText: "",
    category: "",
    tags: "",
    tourCover: null,
    participants: "",
    tourPrice: "",
    noOfDays: "",
    tourDetails: "",
    dayPlans: [],
  });

  // Fetch existing tour data
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tours/${slug}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            tourName: data.tourName || "",
            highlightText: data.highlightText || "",
            category: data.tourCategory || "",
            tags: data.tags ? data.tags.join(", ") : "",
            participants: data.participants || "",
            tourPrice: data.tourPrice || "",
            noOfDays: data.noOfDays || "",
            tourDetails: data.tourDetails || "",
            dayPlans: data.dayPlans || [],
          });
        } else {
          toast.error(data.message || "Failed to fetch tour data");
        }
      } catch (error) {
        toast.error("Error fetching tour data");
      }
    };

    fetchTourData();
  }, [slug]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, tourCover: e.target.files[0] }));
  };

  // Handle day plan changes
  const handleDayPlanChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDayPlans = [...formData.dayPlans];
    updatedDayPlans[index] = { ...updatedDayPlans[index], [name]: value };
    setFormData((prev) => ({ ...prev, dayPlans: updatedDayPlans }));
  };

  // Add a new day plan
  const addDayPlan = () => {
    setFormData((prev) => ({
      ...prev,
      dayPlans: [...prev.dayPlans, { dayId: "", dayTitle: "", dayPlan: "" }],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "tags") {
        formDataToSubmit.append(
          key,
          formData[key].split(",").map((tag) => tag.trim()).join(",")
        );
      } else if (key === "dayPlans") {
        formDataToSubmit.append(key, JSON.stringify(formData[key]));
      } else if (key === "tourCover" && formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`http://localhost:5000/api/tours/${slug}`, {
        method: "PUT",
        body: formDataToSubmit,
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Tour updated successfully!");
      } else {
        toast.error(data.message || "Failed to update the tour");
      }
    } catch (error) {
      toast.error("Error updating the tour");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Update Tour</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <FloatingLabelInput
            id="tourName"
            name="tourName"
            value={formData.tourName}
            onChange={handleInputChange}
            placeholder="Tour Name"
          />
          <FloatingLabelInput
            id="highlightText"
            name="highlightText"
            value={formData.highlightText}
            onChange={handleInputChange}
            placeholder="Highlight Text"
          />
          <FloatingLabelInput
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
        </div>

        {/* Tags and Cover */}
        <FloatingLabelInput
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="Participants"
          />
          <FloatingLabelInput
            id="tourPrice"
            name="tourPrice"
            type="number"
            value={formData.tourPrice}
            onChange={handleInputChange}
            placeholder="Tour Price"
          />
          <FloatingLabelInput
            id="noOfDays"
            name="noOfDays"
            type="number"
            value={formData.noOfDays}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="Tour Details"
          ></textarea>
        </div>

        {/* Day Plans Section */}
        <div className="mb-6">
          <button
            type="button"
            onClick={addDayPlan}
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
            Update Tour
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default UpdateTourForm;
