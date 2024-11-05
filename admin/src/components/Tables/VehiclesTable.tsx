import { VEHICLE } from "@/types/vehicles";

const vehicleData: VEHICLE[] = [
  {
    id: 1,
    type: "Toyota Prius",
    owner: "Amal Gunasinghe",
    vehicleNo: "CEB-100",
    seats: 5,
    availabilty: "Available",
  },
  {
    id: 2,
    type: "BMW 320i",
    owner: "Pasindu Kavishka",
    vehicleNo: "ABC-888",
    seats: 4,
    availabilty: "On trip",
  },
  {
    id: 3,
    type: "Toyota Corolla",
    owner: "Amal Gunasinghe",
    vehicleNo: "FBI-500",
    seats: 8,
    availabilty: "On Service",
  },
  {
    id: 4,
    type: "Toyota Prius",
    owner: "Amal Gunasinghe",
    vehicleNo: "CEB-100",
    seats: 2,
    availabilty: "Available",
  }
];

const VehicleTable = () => {
  return (

    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[70px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                #
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                Vehicle Type
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Owner
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Vehicle Number
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                No. Seats
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Availability
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((vehicleItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {vehicleItem.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {vehicleItem.type}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {vehicleItem.owner}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {vehicleItem.vehicleNo}KM
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {vehicleItem.seats}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        vehicleItem.availabilty === "On trip"
                        ? "bg-[#ed4a4f] text-[#981b1b]"
                        : vehicleItem.availabilty === "On Service"
                          ? "bg-[#f89b4b] text-orange-800"
                          : vehicleItem.availabilty === "Available"
                            ? "bg-green-400 text-green-800"
                              : ""
                    }`}
                  >
                    {vehicleItem.availabilty}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VehicleTable;
