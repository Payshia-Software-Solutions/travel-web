"use client";

import React, { useState, useEffect } from "react";
import HomeBannerMain from "../Components/HomeBanner/Hero";
import SectionTitle from "../Components/section-title/section-title";
import "./blogs.css";
import config from "../../config";
import { FaArrowRight, FaRegHeart } from "react-icons/fa";



interface Blog {
  _id: string;
  title: string;
  summary: string;
  imageUrl: string;
  slug: string;
}

function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null); // Update error state to accept string or null

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/blogs`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        setError("Failed to fetch tours");
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchBlogs();
  }, []);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  }

  return (
    <div>
      <HomeBannerMain />

      <div className="my-[55px]">
        <SectionTitle title="Our Blogs" />
        <div className="w-full text-black text-[40px] md:text-5xl font-medium font-['Noto Sans JP'] capitalize leading-[50px] mb-10">
          Our Blog Collection
        </div>

        {/* Start Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col h-full">
              <div className="tour-card flex flex-col h-full">
                <div className="relative">
                  <div className="h-[250px] rounded-xl">
                    <img
                      src={`${config.API_BASE_URL}/public/uploads/${blog.imageUrl}`}
                      alt={blog.title}
                      className="object-cover w-full h-full rounded-t-xl"
                    />
                  </div>
                </div>

                <div className="tour-card-content shadow-sm flex flex-col flex-grow">
                  <h5 className="text-xl font-bold mt-2 pl-3">{blog.title}</h5>
                  <p className="text-justify mt-2 pl-3 pr-3 flex-grow">
                    {truncateText(blog.summary, 100)}
                  </p>
                  <div className="rtr-bottom-div flex justify-start rounded p-1">
                    <a href={`/blog/${blog.slug}`}>
                      <button className="btn rtr-book-now flex py-2 hover:bg-gray-300">
                        Read More
                        <FaArrowRight className="bottom-button-icon ml-2 mt-1" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End of the Blogs Grid */}
      </div>
    </div>
  );
}

export default Blog;
