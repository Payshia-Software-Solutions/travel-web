import React, { useState, useEffect } from "react";
import { Blog } from "@/types/blogs"; // Adjust the import path as necessary
import config from "@/config"; // Adjust the import path as necessary
import InfoCard from "./InfoCards";
import parse from "html-react-parser";

interface BlogInfoProps {
  blogId: string;
}

const BlogInfo: React.FC<BlogInfoProps> = ({ blogId }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/api/blogs/${blogId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>No blog details available</div>;
  }

  return (
    <div className="mx-auto my-8 rounded-lg bg-white p-6">
      <div>
        {/* Mobile View */}
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>
          <select
            id="Tab"
            className="border-gray-200 w-full rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="overview">Overview</option>
            <option value="content">Content</option>
            <option value="comments">Comments</option>
          </select>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
          <div className="border-gray-200 border-b">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <a
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-bold  ${
                  activeTab === "overview"
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("overview");
                }}
                aria-current={activeTab === "overview" ? "page" : undefined}
              >
                Overview
              </a>
              <a
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-bold ${
                  activeTab === "content"
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("content");
                }}
                aria-current={activeTab === "content" ? "page" : undefined}
              >
                Content
              </a>
              <a
                href="#"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-bold ${
                  activeTab === "comments"
                    ? "border-sky-500 text-sky-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("comments");
                }}
                aria-current={activeTab === "comments" ? "page" : undefined}
              >
                Comments
              </a>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === "overview" && (
            <div key="overview" className="tab-content">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-600">
                  {blog.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className="col-span-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4">
                    <InfoCard label="Author" value={blog.author} />
                    <InfoCard
                      label="Published Date"
                      value={new Date(blog.publishedDate).toLocaleDateString()}
                    />
                    <InfoCard label="Status" value={blog.status} />
                    <InfoCard
                      label="Categories"
                      value={blog.categories.join(", ")}
                    />
                    <InfoCard label="Tags" value={blog.tags.join(", ")} />
                  </div>
                </div>
                <div>
                  <img
                    src={`${config.API_BASE_URL}/public/uploads/${blog.imageUrl}`}
                    className="w-full rounded-xl object-cover"
                    alt="Image"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "content" && (
            <div key="content" className="tab-content">
              <div className="prose">{parse(blog.content)}</div>
            </div>
          )}
          {activeTab === "comments" && (
            <div key="comments" className="tab-content">
              {blog.comments.map((comment, index) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <p className="text-sm font-semibold">{comment.user}</p>
                  <p className="text-gray-700">{comment.comment}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(comment.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;
