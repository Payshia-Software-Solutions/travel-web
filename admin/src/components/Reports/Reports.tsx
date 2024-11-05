import ReportTable from "../Tables/ReportTables";
import CardDataStats from "../CardDataStats";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

import { FaFire, FaClock } from "react-icons/fa";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { IoMdBookmarks } from "react-icons/io";

const Reports = () => {
  return (
    <div>
      <Breadcrumb pageName="Reports" pageDesc="Find out the status of your bookings" />

      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Total Views */}
        <CardDataStats title="Total Bookings" total="20">
          <FaFire className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>

        {/* Total Tours */}
        <CardDataStats title="Total Tours" total="10">
          <GiEarthAfricaEurope className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>

        {/* Pending Approvals */}
        <CardDataStats title="Pending Approvals" total="15">
          <FaClock className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>

        {/* Completed Tours */}
        <CardDataStats title="Completed Tours" total="35">
          <IoMdBookmarks className="fill-primary text-xl dark:fill-white" />
        </CardDataStats>
      </div>
      <ReportTable />
    </div>
  );
};
export default Reports;
