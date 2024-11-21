import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AgentsTable from "@/components/Agents/AgentsTable";

const page = () => {
  return (
    <DefaultLayout>
      <AgentsTable />
    </DefaultLayout>
  );
};

export default page;
