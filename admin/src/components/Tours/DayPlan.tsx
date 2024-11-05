import React from "react";

interface DayPlanProps {
  day: string | number;
  dayTitle: string;
  value: string | number;
}

const DayPlan: React.FC<DayPlanProps> = ({ day, dayTitle, value }) => {
  return (
    <div className="rounded-xl bg-gray p-3">
      <h4 className="mb-2 border-b border-blue-300 pb-2 font-bold">
        Day {day}
      </h4>
      <strong className="text-gray-700 block">{dayTitle}</strong>
      <p className="text-gray-900 text-xl">{value}</p>
    </div>
  );
};

export default DayPlan;
