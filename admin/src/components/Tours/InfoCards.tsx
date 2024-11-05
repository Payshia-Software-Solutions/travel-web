import React from "react";

interface InfoCardProps {
  label: string;
  value: string | number | null;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-gray p-3">
      <strong className="text-gray-700 block">{label}:</strong>
      <p className="text-gray-900 text-xl">{value}</p>
    </div>
  );
};

export default InfoCard;
