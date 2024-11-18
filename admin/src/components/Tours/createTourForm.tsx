"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FloatingLabelInput from "../Input";

function CreateTourForm({ initialData = null, onSubmitSuccess }) {
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
    tourCover: "", // For creating or updating
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
        tourCover: "", // Reset to allow new uploads
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
        tourCover: files[0], // Store the file object
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

    // Check for required fields
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
      formDataObj.append("tourCover", formData.tourCover); // Upload file if it's a new one
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
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit tour");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };


  return (
    <div>
      <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
        <div className="mb-4 border-b border-gray">
          <h1 className="text-3xl font-extrabold text-black-2">Create Tour</h1>
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
              placeholder="tourName"
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
              Create Tour
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTourForm;
