import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Agent } from "@/types/agents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config"; // Adjust the import path as necessary
import FloatingLabelInput from "../Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CreateFormProps {
  onCreated: (newBlog: Agent) => void;
  itemData?: Agent | any; // Optional prop for existing blog data
}

const CreateForm: React.FC<CreateFormProps> = ({
  onCreated,
  itemData: existingData,
}) => {
  const [agentData, setData] = useState<Agent>(
    existingData || {
      _id: "",
      no: 0,
      name: "",
      country: "",
      address: "",
      contactNo: "",
      email: "",
      phone: "",
      secondaryPhone: "",
      createdBy: "", // Assuming this is a user ID or similar identifier
      updatedBy: "", // Assuming this is a user ID or similar identifier
      createdAt: new Date(), // Default to the current date/time
      updatedAt: new Date(), // Default to the current date/time
      isActive: 1, // Assuming 1 means active
    },
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    for (const key in agentData) {
      if (Object.prototype.hasOwnProperty.call(agentData, key)) {
        formData.append(key, agentData[key]);
      }
    }

    try {
      const method = agentData._id ? "PUT" : "POST";
      const url = `${config.API_BASE_URL}/api/agents${agentData._id ? `/${agentData._id}` : ""}`;

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

      const newAgent = await response.json();
      onCreated(newAgent);
      toast.success(
        `Agent ${agentData._id ? "updated" : "created"} successfully!`,
      );
    } catch (error) {
      console.error(
        `Error ${agentData._id ? "updating" : "creating"} agent:`,
        error,
      );
      toast.error(
        `Failed to ${agentData._id ? "update" : "create"} agent. Please try again.`,
      );
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
      <div className="mb-4 border-b border-gray">
        <h1 className="text-3xl font-extrabold text-black-2">Agent Info</h1>
        <p>Fill all required fields</p>
      </div>

      <form
        action="#"
        className="space-y-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Name */}
          <FloatingLabelInput
            id="name"
            name="name"
            placeholder="Name"
            value={agentData.name}
            onChange={handleChange}
          />

          {/* Country */}
          <FloatingLabelInput
            id="country"
            name="country"
            placeholder="Country"
            value={agentData.country}
            onChange={handleChange}
          />

          {/* Address */}
          <FloatingLabelInput
            id="address"
            name="address"
            placeholder="Address"
            value={agentData.address}
            onChange={handleChange}
          />

          {/* Contact Number */}
          <FloatingLabelInput
            id="contactNo"
            name="contactNo"
            placeholder="Contact Number"
            value={agentData.contactNo}
            onChange={handleChange}
          />

          {/* Email */}
          <FloatingLabelInput
            id="email"
            name="email"
            placeholder="Email"
            value={agentData.email}
            onChange={handleChange}
          />

          {/* Phone */}
          <FloatingLabelInput
            id="phone"
            name="phone"
            placeholder="Phone"
            value={agentData.phone}
            onChange={handleChange}
          />

          {/* Secondary Phone */}
          <FloatingLabelInput
            id="secondaryPhone"
            name="secondaryPhone"
            placeholder="Secondary Phone (optional)"
            value={agentData.secondaryPhone}
            onChange={handleChange}
          />
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
      <ToastContainer />
    </div>
  );
};

export default CreateForm;
