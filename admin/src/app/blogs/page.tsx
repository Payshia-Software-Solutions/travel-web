import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BlogsTable from "@/components/Blogs/BlogsTable";

const page = () => {
  return (
    <DefaultLayout>
      <BlogsTable />
    </DefaultLayout>
  );
};

export default page;
