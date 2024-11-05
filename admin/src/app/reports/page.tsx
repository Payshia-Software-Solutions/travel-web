import Reports from "@/components/Reports/Reports";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Ceylon Odyssey Reports",
  description:
    "Admin reports of Ceylon Odyssey",
};

const ReportPage = () => {
  return (
    <DefaultLayout>
      <Reports />
    </DefaultLayout>
  );
};

export default ReportPage;
