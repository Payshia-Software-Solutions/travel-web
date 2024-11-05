import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
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
          {tabs.map((tab) => (
            <option key={tab.label} value={tab.label}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="border-gray-200 border-b">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.label}
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
                  activeTab === tab.label
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.label);
                }}
                aria-current={activeTab === tab.label ? "page" : undefined}
              >
                {tab.icon}
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs.map(
          (tab) =>
            tab.label === activeTab && (
              <div key={tab.label} className="tab-content">
                {tab.content}
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default Tabs;
