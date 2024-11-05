import React, { useState } from "react";

// Helper function to combine class names
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
};

const Tabs = ({ tabs, defaultTab, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div
      className={classNames(
        "border-gray-200 w-full rounded-lg border bg-white shadow-sm",
        className || "",
      )}
    >
      {/* Tab Header */}
      <div className="bg-gray-50 border-gray-200 flex flex-wrap gap-2 rounded-t-lg border-b p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={classNames(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "hover:bg-gray-100 focus:ring-gray-200 focus:outline-none focus:ring-2",
              activeTab === tab.id
                ? "text-gray-900 bg-white shadow-sm"
                : "text-gray-600 hover:text-gray-900",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div className="transition-opacity duration-200">{activeContent}</div>
      </div>
    </div>
  );
};

// Example usage component
const TabsExample = () => {
  const exampleTabs = [
    {
      id: "Itinerary",
      label: "Itinerary",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Welcome Itinerary</h2>
          <p className="text-gray-600">
            This is a modern tabbed interface built with Next.js and Tailwind
            CSS. It's fully responsive and includes smooth transitions.
          </p>
        </div>
      ),
    },
    {
      id: "inclusions",
      label: "Inclusions",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About Us</h2>
          <p className="text-gray-600">
            Learn more about our team and mission. We're dedicated to creating
            exceptional web experiences.
          </p>
        </div>
      ),
    },
    {
      id: "summary",
      label: "Summary",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Services</h2>
          <p className="text-gray-600">
            We offer comprehensive web development and design services tailored
            to your needs.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl p-4">
      <Tabs tabs={exampleTabs} defaultTab="home" />
    </div>
  );
};

export default TabsExample;
