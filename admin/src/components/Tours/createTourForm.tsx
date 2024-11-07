"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config";
import FloatingLabelInput from "../Input";

function CreateTourForm() {
  const [showDayPlan, setShowDayPlan] = useState(false);

  // Initialize the form data with a default day plan
  const [formData, setFormData] = useState({
    name: "",
    highlightText: "",
    category: "",
    tags: [], // Initialize tags as an array
    participants: 0,
    tourPrice: 0,
    noOfDays: 0,
    tourDetails: "",
    dayPlans: [{ dayId: "", dayTitle: "", dayPlan: "" }], // Initialize with a default day plan
  });




  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };
  // Handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'tags') {
      // Split tags by comma and trim spaces, update as an array
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map((tag) => tag.trim()),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Add new day plan to the form
  const handleAddDayPlanClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      dayPlans: [
        ...prevData.dayPlans,
        { dayId: "", dayTitle: "", dayPlan: "" },
      ],
    }));
  };

  // Handle changes in day plan fields
  const handleDayPlanChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedDayPlans = [...formData.dayPlans];
    updatedDayPlans[index] = { ...updatedDayPlans[index], [name]: value };

    setFormData((prevData) => ({ ...prevData, dayPlans: updatedDayPlans }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => data.append(key, item));
      } else {
        data.append(key, formData[key as keyof typeof formData]);
      }
    }
    if (imageFile) {
      data.append("tourCover", imageFile);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/tours`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();  // Get response text
        
        console.error("Server Response Error:", errorText);
        toast.error(`Error creating tour: ${errorText}`);
      } else {
        toast.success("Tour created successfully");
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      toast.error("Error creating tour. See console for more details.");
    }
  };
  

  return (
    <div>
      <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
        <div className="mb-4 border-b border-gray">
          <h1 className="text-3xl font-extrabold text-black-2">Create Tour</h1>
          <p>Fill all required fields</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FloatingLabelInput
              id="name"
              name="name"
              value={formData.name}
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

          {/* Tags, Cover, Participants, etc. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
            <FloatingLabelInput
              id="tags"
              name="tags"
              value={formData.tags.join(', ')} // Convert tags array to comma-separated string
              onChange={handleInputChange}
              placeholder="Tags (comma-separated)"
            />
          </div>
          <div className="relative">
              <label htmlFor="cover">Cover</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-gray-500 w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-white hover:file:bg-blue-600"
              />
            </div>

          {/* Numeric Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <FloatingLabelInput
              id="participants"
              name="participants"
              type="number"
              value={formData.participants.toString()}
              onChange={handleInputChange}
              placeholder="Participants"
            />
            <FloatingLabelInput
              id="tourPrice"
              name="tourPrice"
              type="number"
              value={formData.tourPrice.toString()}
              onChange={handleInputChange}
              placeholder="Tour Price"
            />
            <FloatingLabelInput
              id="noOfDays"
              name="noOfDays"
              type="number"
              value={formData.noOfDays.toString()}
              onChange={handleInputChange}
              placeholder="No of Days"
            />
          </div>

          {/* Text Area for Tour Details */}
          <div className="relative">
            <textarea
              className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
              placeholder=" "
              id="tourDetails"
              name="tourDetails"
              rows={5}
              value={formData.tourDetails}
              onChange={handleInputChange}
            />
            <label
              htmlFor="tourDetails"
              className="peer-focus:text-gray-600 absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-2 text-sm font-bold text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sm"
            >
              Tour Details
            </label>
          </div>

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
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Save Tour
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreateTourForm;
