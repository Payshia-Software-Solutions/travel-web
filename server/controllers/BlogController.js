const Blog = require("../models/Blog");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

// Helper function to save the uploaded file
const saveFile = (file) => {
    const uploadDir = path.join(process.cwd(), "public/uploads"); // Ensure this directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const originalFileName = file.originalFilename; // Get the original file name
    const newFilePath = path.join(uploadDir, originalFileName);

    fs.renameSync(file.filepath, newFilePath);
    return originalFileName; // Return the file name only
};

// Create a new blog post
const createBlog = async(req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads");
    form.keepExtensions = true;

    form.parse(req, async(err, fields, files) => {
        if (err) {
            console.error("Form parse error:", err);
            return res.status(500).json({ message: "Form parse error" });
        }

        try {
            const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
            const FixedUpdatedBy = "66ae7fe4a9498f09f37f01cc";

            const {
                title,
                author,
                content,
                summary,
                tags,
                publishedDate,
                status,
                categories,
                slug,
                createdBy = FixedCreatedBy,
                updatedBy = FixedUpdatedBy,
            } = fields;

            const imageFile = files.image ? files.image[0] : null;
            const imageUrl = imageFile ? saveFile(imageFile) : "";

            // Convert arrays to strings if needed
            const convertToString = (field) =>
                Array.isArray(field) ? field[0] : field;

            // Extract and convert required fields
            const extractedFields = {
                title: convertToString(title),
                author: convertToString(author),
                content: convertToString(content),
                summary: convertToString(summary),
                tags: convertToString(tags),
                publishedDate: convertToString(publishedDate),
                status: convertToString(status),
                categories: convertToString(categories),
                slug: convertToString(slug),
                createdBy: convertToString(createdBy),
                updatedBy: convertToString(updatedBy),
            };

            // Validation
            const requiredFields = [
                "title",
                "author",
                "content",
                "publishedDate",
                "slug",
            ];
            const missingFields = requiredFields.filter(
                (field) => !extractedFields[field]
            );

            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: "Missing required fields",
                    missingFields,
                });
            }

            // Ensure publishedDate is in a valid format
            if (isNaN(Date.parse(extractedFields.publishedDate))) {
                return res
                    .status(400)
                    .json({ message: "Invalid publishedDate format" });
            }

            // Create new blog entry
            const newBlog = new Blog({
                ...extractedFields,
                imageUrl,
            });

            await newBlog.save();
            res.status(201).json(newBlog);
        } catch (error) {
            console.error("Error creating blog:", error.message);
            res.status(500).json({ message: "Server error" });
        }
    });
};

// Retrieve all blog posts
const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Retrieve a single blog post by ID
const getBlogById = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a blog post by ID
const updateBlog = async(req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads");
    form.keepExtensions = true;

    form.parse(req, async(err, fields, files) => {
        if (err) {
            console.error("Form parse error:", err);
            return res.status(500).json({ message: "Form parse error" });
        }

        const {
            title,
            author,
            content,
            summary,
            tags,
            publishedDate,
            status,
            categories,
            slug,
        } = fields;

        console.log("Published Date:", publishedDate);

        // Validate publishedDate format
        if (!publishedDate ||
            !moment(publishedDate, moment.ISO_8601, true).isValid()
        ) {
            return res.status(400).json({ message: "Invalid publishedDate format" });
        }

        try {
            const imageFile = files.image ? files.image[0] : null;
            const imageUrl = imageFile ? saveFile(imageFile) : undefined;

            // Convert arrays to strings if necessary
            const stringFields = [
                "title",
                "author",
                "content",
                "summary",
                "status",
                "slug",
            ];
            const arrayFields = ["tags", "categories"];

            const updatedFields = {};
            for (const field of stringFields) {
                updatedFields[field] = Array.isArray(fields[field]) ?
                    fields[field][0] :
                    fields[field];
            }
            for (const field of arrayFields) {
                updatedFields[field] = Array.isArray(fields[field]) ?
                    fields[field] :
                    [];
            }

            // Find and update blog entry
            const updatedBlog = await Blog.findByIdAndUpdate(
                req.params.id, {
                    ...updatedFields,
                    imageUrl,
                }, { new: true }
            );

            if (!updatedBlog) {
                return res.status(404).json({ message: "Blog post not found" });
            }

            res.status(200).json(updatedBlog);
        } catch (error) {
            console.error("Error updating blog:", error.message);
            res.status(500).json({ message: "Server error" });
        }
    });
};

// Delete a blog post by ID
const deleteBlog = async(req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(200).json({ message: "Blog post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};