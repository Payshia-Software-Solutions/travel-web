const Tour = require("../models/Tour");
const moment = require("moment");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const createTour = async (req, res) => {
    try {
        // Use multer to handle file uploads
        upload.single('tourCover')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading file" });
            }

            const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
            const FixedUpdatedBy = "66ae7fe4a9498f09f37f01cc";

            const {
                inclusions,
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
            const requiredFields = ["tourName", "highlightText", "tourDetails", "tourPrice", "participants", "noOfDays", "tourCategory", "createdBy"];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                return res.status(400).json({ message: "Missing required fields", missingFields });
            }

            // Generate unique tour ID based on the dataset count
            const tourCount = await Tour.countDocuments();
            const tourId = `TOUR-${tourCount + 1}`;

            // Create new tour entry
            const newTour = new Tour({
                tourId,
                inclusions,
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
// Create a new tour
// const createTour = async (req, res) => {
//     try {
//         const {
//             inclusions,
//             dayPlans,
//             tourId,
//             tourName,
//             highlightText,
//             tourDetails,
//             tourPrice,
//             participants,
//             tourCover,
//             tourGallery,
//             noOfDays,
//             aboutCover,
//             tags,
//             basePlace,
//             tourSchedule,
//             tourCategory,
//             createdBy,
//             updatedBy,
//             isActive
//         } = req.body;
//         console.log(req.body)

//         // Ensure required fields are present
//         const requiredFields = ["tourId", "tourName", "highlightText", "tourDetails", "tourPrice", "participants", "tourCover", "noOfDays", "tourCategory", "createdBy"];
//         const missingFields = requiredFields.filter(field => !req.body[field]);


//         if (missingFields.length > 0) {
//             return res.status(400).json({ message: "Missing required fields", missingFields });
//         }

//         // Create new tour entry
//         const newTour = new Tour({
//             inclusions,
//             dayPlans,
//             tourId,
//             tourName,
//             highlightText,
//             tourDetails,
//             tourPrice,
//             participants,
//             tourCover,
//             tourGallery,
//             noOfDays,
//             aboutCover,
//             tags,
//             basePlace,
//             tourSchedule,
//             tourCategory,
//             createdBy,
//             updatedBy,
//             isActive
//         });

//         await newTour.save();
//         res.status(201).json(newTour);
//     } catch (error) {
//         console.error("Error creating tour:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };


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
            dayPlans,
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
                dayPlans,
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
