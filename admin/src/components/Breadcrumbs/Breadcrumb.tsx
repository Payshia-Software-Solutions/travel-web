import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
  pageDesc: string;
  btnName?: string;
  onClick?: () => void;
}
const Breadcrumb = ({
  pageName,
  pageDesc,
  btnName,
  onClick,
}: BreadcrumbProps) => {
  return (
    <div>
      <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-[#06377B]">{pageName}</li>
          </ol>
        </nav>
      </div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-title-md1 mb-6 text-black dark:text-white ">
          {pageDesc}
        </p>
        {btnName && (
          <button
            onClick={onClick}
            className="delay-50 rounded border border-[#06377B] bg-transparent px-4 py-2 font-semibold text-[#06377B] transition duration-300 ease-in-out hover:border-transparent hover:bg-[#06377B] hover:text-white"
          >
            {btnName}
          </button>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
