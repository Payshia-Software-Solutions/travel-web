import { Reviews } from "@/types/review";
// id: number;
// name: string;
// country: string;
// review: string;
const revieweData: Reviews[] = [
  {
    id: 1,
    name: "John Doe",
    country: "United Kingdom",
    review: "Develop a website by finding a product identity that has value and branding to become a characteristic of a company.",
  },
  {
    id: 2,
    name: "Amal Perera",
    country: "Australia",
    review: "Develop a website by finding a product identity that has value and branding to become a characteristic of a company. Develop a website by finding a product identity that has value and branding to become a characteristic of a company.",
  },
  {
    id: 3,
    name: "Nimal Subasinghe",
    country: "Japan",
    review: "Develop a website by finding a product identity that has value and branding to become a characteristic of a company.",
  },
  {
    id: 4,
    name: "John Doe",
    country: "United Kingdom",
    review: "Develop a website by finding a product identity that has value and branding to become a characteristic of a company. Develop a website by finding a product identity that has value and branding to become a characteristic of a company.",
  },
];
const ReviewTable = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[70px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                #
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Reviewer Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Country
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Review
              </th>
              
            </tr>
          </thead>
          <tbody>
            {revieweData.map((reviewItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {reviewItem.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {reviewItem.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {reviewItem.country}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {reviewItem.review}
                  </p>
                </td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}
export default ReviewTable;