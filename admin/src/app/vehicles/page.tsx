import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import VehicleTable from "@/components/Vehicles/VehicleTable";

export const metadata: Metadata = {
  title: "Vehicles | Ceylon Odyssey | Admin Dashboard",
  description: "Admin dashboard for Ceylon Odyssey E-commerce website",
};

const VehiclesPage = () => {
  return (
    <DefaultLayout>
      <VehicleTable />
    </DefaultLayout>
  );
};

export default VehiclesPage;
