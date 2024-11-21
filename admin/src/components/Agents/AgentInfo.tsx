import React, { useState, useEffect } from "react";
import { Agent } from "@/types/agents";
import config from "@/config"; // Adjust the import path as necessary
import InfoCard from "./InfoCards";

interface InfoProps {
  agentId: string;
}

const AgentInfo: React.FC<InfoProps> = ({ agentId }) => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/api/agents/${agentId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setAgent(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent().then(() => console.log("ok"));
  }, [agentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!agent) {
    return <div>No blog details available</div>;
  }

  return (
    <div className="mx-auto my-8 rounded-lg bg-white p-6">
      <div>
        {/* Mobile View */}
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>
          <select
            id="Tab"
            className="border-gray-200 w-full rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="overview">Overview</option>
          </select>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
          <div className="border-gray-200 border-b">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <a
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-bold  ${
                  activeTab === "overview"
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("overview");
                }}
                aria-current={activeTab === "overview" ? "page" : undefined}
              >
                Overview
              </a>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === "overview" && (
            <div key="overview" className="tab-content">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-600">
                  {agent.name}
                </h2>

                <div className="mt-3-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <InfoCard label="Status" value={agent.country} />
                  <InfoCard label="Status" value={agent.contactNo} />
                  <InfoCard label="Status" value={agent.address} />
                  <InfoCard label="Status" value={agent.phone} />
                  <InfoCard label="Status" value={agent.email} />
                  <InfoCard label="Status" value={agent.phone} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentInfo;
