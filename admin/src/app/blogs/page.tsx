import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BlogsTable from "@/components/Blogs/BlogsTable";

export const metadata: Metadata = {
  title: "Blogs | Ceylon Odyssey | Admin Dashboard",
  description: "Admin dashboard for Ceylon Odyssey E-commerce website",
};

const page = () => {
  return (
    <DefaultLayout>
      <BlogsTable />
    </DefaultLayout>
  );
};

export default page;
