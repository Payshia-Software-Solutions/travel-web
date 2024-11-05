import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AgentsTable from "@/components/Agents/AgentsTable";
export const metadata: Metadata = {
  title: "Agents | Ceylon Odyssey | Admin Dashboard",
  description: "Admin dashboard for Ceylon Odyssey E-commerce website",
};

const page = () => {
  return (
    <DefaultLayout>
      <AgentsTable />
    </DefaultLayout>
  );
};

export default page;
