"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import SideModel from "../Modal/SideModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import config from "@/config"; // Adjust the import path as necessary
import Swal from "sweetalert2";
import { Agent } from "@/types/agents";
import CreateForm from "./createForm";
import BlogInfo from "./AgentInfo";
import "./styles.css";

const AgentsTable = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedData, setSelectedData] = useState<Agent | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchAgents = () => {
    fetch(`${config.API_BASE_URL}/api/agents`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAgents(data);
      })
      .catch((error) => console.error("Error fetching vehicles:", error));
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleCreated = (newAgent: Agent) => {
    if (editMode) {
      setAgents((prevAgents) =>
        prevAgents.map((agent) =>
          agent._id === newAgent._id ? newAgent : agent,
        ),
      );
    } else {
      setAgents((prevAgents) => [...prevAgents, newAgent]);
    }
    setShowCreateForm(false);
    setEditMode(false);
    setSelectedData(null);
  };

  const handleShowInfo = (agentId: string) => {
    setSelectedId(agentId);
    setShowInfo(true);
  };

  const handleEdit = (agentId: string) => {
    const agent = agents.find((agent) => agent._id === agentId);
    if (agent) {
      setSelectedData(agent);
      setEditMode(true);
      setShowCreateForm(true);
    }
  };

  const handleDelete = async (agentId: string) => {
    const agent = agents.find((agent) => agent._id === agentId);
    if (agent) {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete the tour "${agent.name}"? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              `${config.API_BASE_URL}/api/agents/${agentId}`,
              {
                method: "DELETE",
              },
            );

            if (!response.ok) {
              throw new Error("Failed to delete tour");
            }

            setAgents((prevAgents) =>
              prevAgents.filter((t) => t._id !== agentId),
            );
            toast.success("Agent deleted successfully!");
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
        pageName="Agents"
        pageDesc="Find out the agents of your tours"
        btnName="+ New Agent"
        onClick={() => setShowCreateForm(true)}
      />

      <SideModel isOpen={showInfo} onClose={() => setShowInfo(false)}>
        {selectedId && <BlogInfo agentId={selectedId} />}
      </SideModel>

      <SideModel
        isOpen={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setEditMode(false);
          setSelectedData(null);
        }}
      >
        <CreateForm onCreated={handleCreated} itemData={selectedData} />
      </SideModel>

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  #
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Agent Name
                </th>
                <th className="min-w-[170px] px-4 py-4 font-medium text-black dark:text-white">
                  Country
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Address
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Contact
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {agent.no}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{agent.name}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {agent.country}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {agent.address}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{agent.phone}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleShowInfo(agent._id)}
                    >
                      <FaEye />
                    </button>

                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleEdit(agent._id)}
                    >
                      <FaPencilAlt />
                    </button>

                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleDelete(agent._id)}
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
    </div>
  );
};

export default AgentsTable;
