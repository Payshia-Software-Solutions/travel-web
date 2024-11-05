import { useState, ChangeEvent, FormEvent } from "react";
import { Vehicle } from "@/types/vehicles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config"; // Adjust the import path as necessary
import FloatingLabelInput from "../Input";

interface CreateVehicleFormProps {
  onCreated: (newVehicle: Vehicle) => void;
  vehicleData?: Vehicle | any; // Optional prop for existing vehicle data
}

const CreateForm: React.FC<CreateVehicleFormProps> = ({
  onCreated,
  vehicleData: existingData,
}) => {
  const [vehicleData, setVehicleData] = useState<Vehicle>(
    existingData || {
      _id: "",
      vehicleNo: "",
      owner: "",
      availability: "",
      seats: 0,
      type: "",
      isActive: 1, // Assuming 1 means active
    },
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate that required fields are provided
    if (!vehicleData.vehicleNo || !vehicleData.owner || !vehicleData.type) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const method = vehicleData._id ? "PUT" : "POST";
      const url = `${config.API_BASE_URL}/api/vehicles${vehicleData._id ? `/${vehicleData._id}` : ""}`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
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

      const newVehicle = await response.json();
      onCreated(newVehicle);
      toast.success(
        `Vehicle ${vehicleData._id ? "updated" : "created"} successfully!`,
      );
    } catch (error) {
      console.error(
        `Error ${vehicleData._id ? "updating" : "creating"} vehicle:`,
        error,
      );
      toast.error(
        `Failed to ${vehicleData._id ? "update" : "create"} vehicle. Please try again.` +
          error,
      );
    }
  };

  return (
    <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
      <div className="mb-4 border-b border-gray">
        <h1 className="text-3xl font-extrabold text-black-2">Vehicle Info</h1>
        <p>Fill all required fields</p>
      </div>

      <form action="#" className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Vehicle No */}
          <FloatingLabelInput
            id="vehicleNo"
            name="vehicleNo"
            placeholder="Vehicle No"
            value={vehicleData.vehicleNo}
            onChange={handleChange}
          />

          {/* Owner */}
          <FloatingLabelInput
            id="owner"
            name="owner"
            placeholder="Owner"
            value={vehicleData.owner}
            onChange={handleChange}
          />

          {/* Type */}
          <FloatingLabelInput
            id="type"
            name="type"
            placeholder="Type"
            value={vehicleData.type}
            onChange={handleChange}
          />

          {/* Availability */}
          <FloatingLabelInput
            id="availability"
            name="availability"
            placeholder="Availability"
            value={vehicleData.availability}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
          {/* Seats */}
          <FloatingLabelInput
            id="seats"
            name="seats"
            type="number"
            placeholder="Seats"
            value={vehicleData.seats === 0 ? "" : vehicleData.seats}
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
    </div>
  );
};

export default CreateForm;
