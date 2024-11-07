const Tour = require("../models/Tour");

// Create a new tour
const createTour = async (req, res) => {
    try {
        const {
            inclusions,
            tourId,
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
            createdBy,
            updatedBy,
            isActive
        } = req.body;

        // Create new tour entry
        const newTour = new Tour({
            inclusions,
            tourId,
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
            createdBy,
            updatedBy,
            isActive
        });

        await newTour.save();
        res.status(201).json(newTour);
    } catch (error) {
        console.error("Error creating tour:", error.message);
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

// Retrieve a single tour by ID
const getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json(tour);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a tour by ID
const updateTour = async (req, res) => {
    try {
        const {
            inclusions,
            tourId,
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
            createdBy,
            updatedBy,
            isActive
        } = req.body;

        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            {
                inclusions,
                tourId,
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
                createdBy,
                updatedBy,
                isActive
            },
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
    getTourById,
    updateTour,
    deleteTour,
};
