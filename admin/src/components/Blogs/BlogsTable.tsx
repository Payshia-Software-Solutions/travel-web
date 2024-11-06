"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Blog } from "@/types/blogs";
import SideModel from "../Modal/SideModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import config from "@/config"; // Adjust the import path as necessary
import BlogInfo from "./BlogInfo";
import Swal from "sweetalert2";
import CreateForm from "./createForm";
import "./styles.css";

const BlogsTable = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBlogInfo, setShowBlogInfo] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlogData, setSelectedBlogData] = useState<Blog | null>(null);

  const fetchVehicles = () => {
    fetch(`${config.API_BASE_URL}/api/blogs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => console.error("Error fetching vehicles:", error));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleShowBlogInfo = (blogId: string) => {
    setSelectedBlogId(blogId);
    setShowBlogInfo(true);
  };

  const handleCreated = (newBlog: Blog) => {
    if (editMode) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog._id === newBlog._id ? newBlog : blog)),
      );
    } else {
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    }
    setShowCreateForm(false);
    setEditMode(false);
    setSelectedBlogData(null);
  };

  const handleEdit = (blogId: string) => {
    const blog = blogs.find((blog) => blog._id === blogId);
    if (blog) {
      setSelectedBlogData(blog);
      setEditMode(true);
      setShowCreateForm(true);
    }
  };

  const handleDelete = async (blogId: string) => {
    const blog = blogs.find((blog) => blog._id === blogId);
    if (blog) {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete the tour "${blog.title}"? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              `${config.API_BASE_URL}/api/blogs/${blogId}`,
              {
                method: "DELETE",
              },
            );

            if (!response.ok) {
              throw new Error("Failed to delete tour");
            }

            setBlogs((prevBlogs) => prevBlogs.filter((t) => t._id !== blogId));
            toast.success("Vehicle deleted successfully!");
          } catch (error) {
            console.error("Error deleting tour:", error);
            toast.error("Failed to delete tour.");
          }
        }
      });
    }
  };

  return (
    <div>
      <Breadcrumb
        pageName="Blogs"
        pageDesc="Find out the details of Blogs"
        btnName="+ Add Blog"
        onClick={() => setShowCreateForm(true)}
      />

      <SideModel isOpen={showBlogInfo} onClose={() => setShowBlogInfo(false)}>
        {selectedBlogId && <BlogInfo blogId={selectedBlogId} />}
      </SideModel>

      <SideModel
        isOpen={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setEditMode(false);
          setSelectedBlogData(null);
        }}
      >
        <CreateForm onCreated={handleCreated} itemData={selectedBlogData} />
      </SideModel>

      <div className="rounded-xl border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Title
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Author
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Published Date
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item, index) => (
                <tr key={item._id}>
                  <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.title}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.author}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.status}</p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleShowBlogInfo(item._id)}
                    >
                      <FaEye />
                    </button>
                    {/*update button */}
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleEdit(item._id)}
                    >
                      <FaPencilAlt />
                    </button>

                    <button
                      className="btn btn-info mx-1"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default BlogsTable;
