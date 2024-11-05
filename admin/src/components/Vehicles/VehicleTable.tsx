"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Vehicle } from "@/types/vehicles";
import SideModel from "../Modal/SideModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import config from "@/config"; // Adjust the import path as necessary
import VehicleInfo from "./VehicleInfo";
import Swal from "sweetalert2";
import CreateForm from "./createForm";
import "./styles.css";

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showVehicleInfo, setShowVehicleInfo] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );
  const [editMode, setEditMode] = useState(false);
  const [selectedVehicleData, setSelectedVehicleData] =
    useState<Vehicle | null>(null);

  const fetchVehicles = () => {
    fetch(`${config.API_BASE_URL}/api/vehicles`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched vehicles:", data); // Debugging: Log fetched data
        setVehicles(data);
      })
      .catch((error) => console.error("Error fetching vehicles:", error));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleShowVehicleInfo = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setShowVehicleInfo(true);
  };

  const handleCreated = (newVehicle: Vehicle) => {
    if (editMode) {
      setVehicles((prevVehicles) =>
        prevVehicles.map((tour) =>
          tour._id === newVehicle._id ? newVehicle : tour,
        ),
      );
    } else {
      setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    }
    setShowCreateForm(false);
    setEditMode(false);
    setSelectedVehicleData(null);
  };

  const handleEditTour = (vehicleId: string) => {
    const vehicle = vehicles.find((vehicle) => vehicle._id === vehicleId);
    if (vehicle) {
      setSelectedVehicleData(vehicle);
      setEditMode(true);
      setShowCreateForm(true);
    }
  };

  const handleDelete = async (vehicleId: string) => {
    const vehicle = vehicles.find((vehicle) => vehicle._id === vehicleId);
    if (vehicle) {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete the tour "${vehicle.vehicleNo}"? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              `${config.API_BASE_URL}/api/vehicles/${vehicleId}`,
              {
                method: "DELETE",
              },
            );

            if (!response.ok) {
              throw new Error("Failed to delete tour");
            }

            setVehicles((prevVehicles) =>
              prevVehicles.filter((t) => t._id !== vehicleId),
            );
            toast.success("Vehicle deleted successfully!");
          } catch (error) {
            console.error("Error deleting tour:", error);
            toast.error("Failed to delete tour.");
          }
        }
      });
    }
  };

  return (
    <div>
      <Breadcrumb
        pageName="Vehicles"
        pageDesc="Find out the details of Vehicles"
        btnName="+ Add Vehicle"
        onClick={() => setShowCreateForm(true)}
      />

      <SideModel
        isOpen={showVehicleInfo}
        onClose={() => setShowVehicleInfo(false)}
      >
        {selectedVehicleId && <VehicleInfo vehicleId={selectedVehicleId} />}
      </SideModel>

      <SideModel
        isOpen={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setEditMode(false);
          setSelectedVehicleData(null);
        }}
      >
        <CreateForm
          onCreated={handleCreated}
          vehicleData={selectedVehicleData}
        />
      </SideModel>

      <div className="rounded-xl border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Owner
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Seats
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Type
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Vehicle Number
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle._id}>
                  <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {vehicle.owner}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {vehicle.seats}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{vehicle.type}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {vehicle.vehicleNo}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleShowVehicleInfo(vehicle._id)}
                    >
                      <FaEye />
                    </button>

                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleEditTour(vehicle._id)}
                    >
                      <FaPencilAlt />
                    </button>

                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleDelete(vehicle._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default VehicleTable;
