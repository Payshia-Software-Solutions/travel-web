import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Agent } from "@/types/agents";

const packageData: Agent[] = [
  {
    _id: "555",
    no: 1,
    name: "John Doe",
    country: "USA",
    address: "123 Main St, New York City, NY",
    contactNo: "+1 555-123-4567",
    email: "123 Main St, New York City, NY",
    phone: "+1 555-123-4567",
  },
];

const AgentsTable = () => {
  return (
    <div>
      <Breadcrumb
        pageName="Agents"
        pageDesc="Find out the agents of your tours"
        btnName="+ New Agent"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  AGENT NAME
                </th>
                <th className="min-w-[170px] px-4 py-4 font-medium text-black dark:text-white">
                  COUNTRY
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  ADDRESS
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  CONTACT NUMBER
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  {/* VIEW */}
                </th>
              </tr>
            </thead>
            <tbody>
              {packageData.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.no}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.country}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.address}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.contactNo}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="cursor-pointer text-black underline hover:text-blue-700 dark:text-white">
                      view
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentsTable;
