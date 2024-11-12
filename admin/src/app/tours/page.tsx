import React from "react";
import { Metadata } from "next";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ToursTable from "@/components/Tours/ToursTable";
import CreateTourForm from "@/components/Tours/createTourForm";
import CreateInclusion from "@/components/Tours/CreateInclusion";
export const metadata: Metadata = {
  title: "Tours | Admin Dashboard",
  description: "Admin dashboard for Ceylon Odyssey E-commerce website",
};

const page = () => {
  return (
    <DefaultLayout>
      <ToursTable />
      
    </DefaultLayout>
  );
};

export default page;
