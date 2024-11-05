import { useState, ChangeEvent, FormEvent } from "react";
import { Tour } from "@/types/tours";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config"; // Adjust the import path as necessary
import FloatingLabelInput from "../Input";

interface CreateTourFormProps {
  onTourCreated: (newTour: Tour) => void;
  tourData?: Tour | any; // Optional prop for existing tour data
}

const CreateTourForm: React.FC<CreateTourFormProps> = ({
  onTourCreated,
  tourData: existingTourData,
}) => {
  const [tourData, setTourData] = useState<Tour>(
    existingTourData || {
      _id: "",
      tourId: "",
      highlightText: "",
      tourName: "",
      tourDetails: "",
      tourGallery: [],
      participants: 0,
      tourPrice: 0,
      aboutThisTour: "",
      noOfDays: 0,
      tourSchedule: [],
      tourCover: "",
      aboutCover: "",
      tags: "",
      tourCategory: "",
      isActive: 1, // Assuming 1 means active
    },
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleScheduleChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    setTourData((prevData) => {
      const newSchedule = [...prevData.tourSchedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };
      return { ...prevData, tourSchedule: newSchedule };
    });
  };

  const addDayPlan = () => {
    setTourData((prevData) => ({
      ...prevData,
      tourSchedule: [
        ...prevData.tourSchedule,
        { dayId: 1, dayTitle: "", dayPlan: "" },
      ],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate that required fields are provided
    if (
      !tourData.tourName ||
      !tourData.tourDetails ||
      !tourData.tourPrice ||
      !tourData.noOfDays
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    for (const key in tourData) {
      if (Object.prototype.hasOwnProperty.call(tourData, key)) {
        // Convert tourSchedule to a JSON string if it is an array of objects
        if (key === "tourSchedule" && Array.isArray(tourData[key])) {
          formData.append(key, JSON.stringify(tourData[key]));
        } else {
          formData.append(key, tourData[key]);
        }
      }
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const method = tourData._id ? "PUT" : "POST";
      const url = `${config.API_BASE_URL}/api/tours${tourData._id ? `/${tourData._id}` : ""}`;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Error:",
          response.status,
          response.statusText,
          errorMessage,
        );
        throw new Error("Network response was not ok");
      }

      const newTour = await response.json();
      onTourCreated(newTour);
      toast.success(
        `Tour ${tourData._id ? "updated" : "created"} successfully!`,
      );
    } catch (error) {
      console.error(
        `Error ${tourData._id ? "updating" : "creating"} tour:`,
        error,
      );
      toast.error(
        `Failed to ${tourData._id ? "update" : "create"} tour. Please try again.`,
      );
    }
  };

  return (
    <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
      <div className="mb-4 border-b border-gray">
        <h1 className="text-3xl font-extrabold text-black-2">Tour Info</h1>
        <p>Fill all required fields</p>
      </div>

      <form
        action="#"
        className="space-y-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Tour Name */}
          <FloatingLabelInput
            id="tourName"
            name="tourName"
            placeholder="Name"
            value={tourData.tourName}
            onChange={handleChange}
          />

          {/* Highlight Text */}
          <FloatingLabelInput
            id="highlightText"
            name="highlightText"
            placeholder="Highlight Text"
            value={tourData.highlightText}
            onChange={handleChange}
          />

          {/* Tour Category */}
          <FloatingLabelInput
            id="tourCategory"
            name="tourCategory"
            placeholder="Category"
            value={tourData.tourCategory}
            onChange={handleChange}
          />

          {/* Tags */}
          <FloatingLabelInput
            id="tags"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={tourData.tags}
            onChange={handleChange}
          />

          <div className="relative">
            <label htmlFor="summary" className="">
              Cover
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-gray-500 w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-white hover:file:bg-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
          {/* Participants */}
          <FloatingLabelInput
            id="participants"
            name="participants"
            type="number"
            placeholder="Participants"
            value={tourData.participants === 0 ? "" : tourData.participants}
            onChange={handleChange}
          />

          {/* Tour Price */}
          <FloatingLabelInput
            id="tourPrice"
            name="tourPrice"
            type="number"
            placeholder="Tour Price"
            value={tourData.tourPrice === 0 ? "" : tourData.tourPrice}
            onChange={handleChange}
          />

          {/* No of Days */}
          <FloatingLabelInput
            id="noOfDays"
            name="noOfDays"
            type="number"
            placeholder="No of Days"
            value={tourData.noOfDays === 0 ? "" : tourData.noOfDays}
            onChange={handleChange}
          />
        </div>

        {/* Tour Details Text Box */}
        <div className="relative">
          <textarea
            className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
            placeholder=" "
            id="tourDetails"
            onChange={handleChange}
            name="tourDetails"
            value={tourData.tourDetails}
            rows={5}
          />
          <label
            htmlFor="tourDetails"
            className="peer-focus:text-gray-600 absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-2 text-sm font-bold text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sm"
          >
            Tour Details
          </label>
        </div>

        {/* Tour Schedule */}
        <div className="relative">
          <button
            type="button"
            onClick={addDayPlan}
            className="mb-4 inline-block rounded-lg bg-blue-500 px-4 py-2 font-medium text-white"
          >
            Add Day Plan
          </button>
          {tourData.tourSchedule.map((dayPlan, index) => (
            <div key={index} className="mb-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Day */}
                <FloatingLabelInput
                  id={`dayId-${index}`}
                  name="dayId"
                  type="number"
                  placeholder="Day"
                  value={dayPlan.dayId}
                  onChange={(e) =>
                    handleScheduleChange(index, "day", e.target.value)
                  }
                />
                {/* Title */}
                <FloatingLabelInput
                  id={`dayTitle-${index}`}
                  name="dayTitle"
                  placeholder="Title"
                  value={dayPlan.dayTitle}
                  onChange={(e) =>
                    handleScheduleChange(index, "dayTitle", e.target.value)
                  }
                />
              </div>

              {/* Description */}
              <div className="relative mt-6">
                <textarea
                  className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                  id={`dayPlan-${index}`}
                  onChange={(e) =>
                    handleScheduleChange(index, "dayPlan", e.target.value)
                  }
                  name="dayPlan"
                  rows={3}
                  value={dayPlan.dayPlan}
                />
                <label
                  htmlFor={`dayPlan-${index}`}
                  className="peer-focus:text-gray-600 absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-2 text-sm font-bold text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sm"
                >
                  Description
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTourForm;
