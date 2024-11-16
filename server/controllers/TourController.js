const Tour = require("../models/Tour");
const slugify = require("slugify"); // Import slugify library
const moment = require("moment");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Create a new tour
const createTour = async (req, res) => {
    try {
        upload.single("tourCover")(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading file" });
            }

            const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
            const FixedUpdatedBy = "66ae7fe4a9498f09f37f01cc";

            const {
                dayPlans,
                tourName,
                highlightText,
                tourDetails,
                tourPrice,
                participants,
                tourCover,
                tourGallery,
                noOfDays,
                aboutCover,
                tags,
                basePlace,
                tourSchedule,
                tourCategory,
                isActive
            } = req.body;

            // Ensure required fields are present
            const requiredFields = [
                "tourName", "highlightText", "tourDetails", "tourPrice",
                "participants", "noOfDays", "tourCategory"
            ];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                return res.status(400).json({ message: "Missing required fields", missingFields });
            }

            // Generate unique tour ID based on the dataset count
            const tourCount = await Tour.countDocuments();
            const tourId = `TOUR-${tourCount + 1}`;

            // Generate a unique slug
            const slug = slugify(tourName, { lower: true, strict: true });

            // Check if the slug already exists
            const slugExists = await Tour.findOne({ slug });
            if (slugExists) {
                return res.status(400).json({ message: "A tour with this name already exists" });
            }

            // Create new tour entry
            const newTour = new Tour({
                tourId,
                dayPlans,
                tourName,
                slug,
                highlightText,
                tourDetails,
                tourPrice,
                participants,
                tourCover,
                tourGallery,
                noOfDays,
                aboutCover,
                tags,
                basePlace,
                tourSchedule,
                tourCategory,
                createdBy: FixedCreatedBy,
                updatedBy: FixedUpdatedBy,
                isActive
            });

            await newTour.save();
            res.status(201).json(newTour);
        });
    } catch (error) {
        console.error("Error creating tour:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a tour by ID
const updateTour = async (req, res) => {
    try {
        const { tourName, ...otherFields } = req.body;

        // Generate a new slug if the tour name has changed
        let slug;
        if (tourName) {
            slug = slugify(tourName, { lower: true, strict: true });

            // Check if the new slug already exists (excluding the current tour)
            const slugExists = await Tour.findOne({ slug, _id: { $ne: req.params.id } });
            if (slugExists) {
                return res.status(400).json({ message: "A tour with this name already exists" });
            }
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            { ...otherFields, ...(slug && { slug }) }, // Add slug only if it's updated
            { new: true }
        );

        if (!updatedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }

        res.status(200).json(updatedTour);
    } catch (error) {
        console.error("Error updating tour:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Retrieve all tours
const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Retrieve a single tour by slug
const getTourBySlug = async (req, res) => {
    try {
        const tour = await Tour.findOne({ slug: req.params.slug });
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json(tour);
    } catch (error) {
        console.error("Error fetching tour by slug:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a tour by ID
const deleteTour = async (req, res) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        if (!deletedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ message: "Tour deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createTour,
    getAllTours,
    getTourBySlug,
    updateTour,
    deleteTour,
};
