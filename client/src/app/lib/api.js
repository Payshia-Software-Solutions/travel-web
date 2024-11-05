import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export async function getAllBlogSlugs() {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    const blogs = response.data;
    return blogs.map((blog) => ({ params: { slug: blog.slug } }));
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

export async function getBlogData(slug) {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}
