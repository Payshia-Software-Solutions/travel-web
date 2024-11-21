import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Blog } from "@/types/blogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config"; // Adjust the import path as necessary
import FloatingLabelInput from "../Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CreateBlogFormProps {
  onCreated: (newBlog: Blog) => void;
  itemData?: Blog | any; // Optional prop for existing blog data
}

const CreateForm: React.FC<CreateBlogFormProps> = ({
  onCreated,
  itemData: existingData,
}) => {
  const [blogData, setBlogData] = useState<Blog>(
    existingData || {
      _id: "",
      title: "",
      author: "",
      content: "",
      summary: "",
      tags: "",
      categories: "",
      imageUrl: "",
      publishedDate: "",
      isActive: 1, // Assuming 1 means active
    },
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (blogData.title) {
      setBlogData((prevData) => ({
        ...prevData,
        slug: generateSlug(prevData.title),
      }));
    }
  }, [blogData.title]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value: string) => {
    setBlogData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  // React Quill Modules
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [
        { header: "1" },
        { header: "2" },
        { header: [3, 4, 5, 6] },
        { header: false },
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"], // remove formatting button
    ],
  };

  // React Quill Formattings
  const formats = [
    "font",
    "size",
    "header",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "background",
    "script",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  // Create Slug
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
      .replace(/^-+|-+$/g, ""); // Remove leading or trailing dashes
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    for (const key in blogData) {
      if (Object.prototype.hasOwnProperty.call(blogData, key)) {
        formData.append(key, blogData[key as keyof Blog] as string);
      }
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const method = blogData._id ? "PUT" : "POST";
      const url = `${config.API_BASE_URL}/api/blogs${blogData._id ? `/${blogData._id}` : ""}`;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Error:",
          response.status,
          response.statusText,
          errorMessage,
        );
        throw new Error("Network response was not ok");
      }

      const newBlog = await response.json();
      onCreated(newBlog);
      toast.success(
        `Blog ${blogData._id ? "updated" : "created"} successfully!`,
      );
    } catch (error) {
      console.error(
        `Error ${blogData._id ? "updating" : "creating"} blog:`,
        error,
      );
      toast.error(
        `Failed to ${blogData._id ? "update" : "create"} blog. Please try again.`,
      );
    }
  };

  // Format Date
  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="rounded-lg bg-white lg:col-span-3 lg:p-12">
      <div className="mb-4 border-b border-gray">
        <h1 className="text-3xl font-extrabold text-black-2">Blog Info</h1>
        <p>Fill all required fields</p>
      </div>

      <form
        action="#"
        className="space-y-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Title */}
          <FloatingLabelInput
            id="title"
            name="title"
            placeholder="Title"
            value={blogData.title}
            onChange={handleChange}
          />

          {/* Author */}
          <FloatingLabelInput
            id="author"
            name="author"
            placeholder="Author"
            value={blogData.author}
            onChange={handleChange}
          />

          {/* Categories */}
          <FloatingLabelInput
            id="categories"
            name="categories"
            placeholder="Categories"
            value={blogData.categories}
            onChange={handleChange}
          />

          {/* Tags */}
          <FloatingLabelInput
            id="tags"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={blogData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
          {/* Image Upload */}
          <div className="relative">
            <label htmlFor="summary" className="">
              Cover
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-gray-500 w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {/* Publish Date */}
          <FloatingLabelInput
            id="publishedDate"
            name="publishedDate"
            type="date"
            placeholder="Publish Date"
            value={
              blogData.publishedDate
                ? formatDate(new Date(blogData.publishedDate))
                : ""
            }
            onChange={handleChange}
          />
        </div>

        {/* Summary Text Box */}
        <div className="relative">
          <textarea
            className="text-md peer w-full rounded-lg border-2 border-stroke bg-transparent p-3 font-bold focus:border-blue-500 focus:outline-none focus:ring-0"
            placeholder=" "
            id="summary"
            onChange={handleChange}
            name="summary"
            value={blogData.summary}
            rows={3}
          />
          <label
            htmlFor="summary"
            className="peer-focus:text-gray-600 absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-2 text-sm font-bold text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sm"
          >
            Summary
          </label>
        </div>

        {/* Content Text Box */}
        <div className="relative">
          <ReactQuill
            theme="snow"
            value={blogData.content}
            onChange={handleQuillChange}
            modules={modules}
            formats={formats}
          />
          <label
            htmlFor="content"
            className="peer-focus:text-gray-600 absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-2 text-sm font-bold text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sm"
          >
            Content
          </label>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateForm;
