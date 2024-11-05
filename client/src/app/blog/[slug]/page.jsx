// src/app/blog/[slug]/page.jsx
import React from "react";
import parse from "html-react-parser";
import HomeBannerMain from "../../Components/HomeBanner/Hero";
import SectionTitle from "../../Components/section-title/section-title";
import config from "../../../config";
import "../blogs.css";
import { FaArrowRight, FaRegHeart } from "react-icons/fa";

// Generate static params
export async function generateStaticParams() {
  // Fetch the list of blog posts to get their slugs and IDs
  const res = await fetch("http://localhost:5000/api/blogs");
  const blogs = await res.json();

  // Map the slugs to the expected format
  return blogs.map((blog) => ({ slug: blog.slug }));
}

// Fetch blog post data based on the slug
const BlogPost = async ({ params }) => {
  const { slug } = params;

  // Fetch all blog posts to map the slug to the corresponding _id
  const resAll = await fetch("http://localhost:5000/api/blogs");
  const blogs = await resAll.json();

  // Find the blog post with the given slug
  const blog = blogs.find((blog) => blog.slug === slug);

  // If no blog post is found, return an error message
  if (!blog) {
    return <div>Blog post not found.</div>;
  }

  // Fetch blog post data using the _id
  const res = await fetch(`http://localhost:5000/api/blogs/${blog._id}`);
  if (!res.ok) {
    return <div>Blog post not found.</div>;
  }
  const post = await res.json();

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  }

  return (
    <div>
      {/* Blog Content */}
      <div className="my-10 container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Blog content */}
          <div className="col-span-3">
            <SectionTitle title="Our Blogs" />
            <div className="w-full text-black text-[25px] md:text-4xl font-medium font-['Noto Sans JP'] capitalize leading-[50px] mb-10">
              {post.title}
            </div>

            <div className="">
              <img
                src={`${config.API_BASE_URL}/public/uploads/${blog.imageUrl}`}
                alt={post.title}
                className="w-full rounded-lg mt-3"
              />
            </div>

            <div className="my-10">{parse(blog.content)}</div>
          </div>
          {/* Blog Content ends Here */}

          {/* Blog Side Bar */}
          <div className="col-span-3 lg:col-span-1">
            <h5 className="text-2xl font-bold border-b pb-2 mb-3">
              Related Blogs
            </h5>

            {/* Related Blogs */}
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="flex flex-col h-full ">
                  <div className="tour-card flex flex-col h-full rounded-2xl">
                    <div className="relative ">
                      <div className="grid grid-cols-4">
                        <div>
                          <img
                            src={`${config.API_BASE_URL}/public/uploads/${blog.imageUrl}`}
                            alt={blog.title}
                            className="object-cover w-full h-full rounded-l-xl"
                          />
                        </div>
                        <div className="col-span-3">
                          <div className="tour-card-content shadow-sm flex flex-col flex-grow p-2">
                            <h5 className="text-xl font-bold mt-2 pl-3">
                              {blog.title}
                            </h5>

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End of Related Blogs */}
          </div>
          {/* End of Blog Side Bar */}
        </div>
      </div>
      {/* End of the Blog Content */}
    </div>
  );
};

export default BlogPost;
