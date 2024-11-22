const Tour = require("../models/Tour");
const slugify = require("slugify");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const util = require("util"); // Import util

// Multer Configuration
const upload = multer({ dest: "temp/" }); // Temporary upload location

// Helper Function to Save Files
const saveFile = (file, folder) => {
  const fileName = `${Date.now()}-${file.originalname}`;
  const uploadPath = path.join(
    __dirname,
    "../public/uploads",
    folder,
    fileName
  );

  // Ensure the folder exists
  if (!fs.existsSync(path.join(__dirname, "../public/uploads", folder))) {
    fs.mkdirSync(path.join(__dirname, "../public/uploads", folder), {
      recursive: true,
    });
  }

  fs.renameSync(file.path, uploadPath); // Move the file to the desired location
  return `uploads/${folder}/${fileName}`; // Return the relative path
  fs.renameSync(file.path, uploadPath); // Move the file to the desired location
  return `uploads/${folder}/${fileName}`; // Return the relative path
};

// Create a New Tour
const createTour = async (req, res) => {
  try {
    upload.fields([
      { name: "tourCover", maxCount: 1 },
      { name: "tourGallery", maxCount: 5 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Error uploading files",
          error: err.message,
        });
      }

      try {
        console.log("Uploaded Files:", req.files); // Debug uploaded files
        console.log("Request Body:", req.body); // Debug request body

        const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
        const FixedUpdatedBy = "66ae7fe4a9498f09f37f01cc";

        const {
          dayPlans,
          tourName,
          highlightText,
          tourDetails,
          tourPrice,
          participants,
          noOfDays,
          tags,
          basePlace,
          tourSchedule,
          tourCategory,
          isActive,
        } = req.body;

        const requiredFields = [
          "tourName",
          "highlightText",
          "tourDetails",
          "tourPrice",
          "participants",
          "noOfDays",
          "tourCategory",
        ];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ message: "Missing required fields", missingFields });
        }

        const tourCoverFile = req.files?.tourCover?.[0] || null;
        const tourGalleryFiles = req.files?.tourGallery || [];

        const imageCoverPath = tourCoverFile
          ? saveFile(tourCoverFile, "tourCovers")
          : "";
        const galleryPaths = tourGalleryFiles.map((file) =>
          saveFile(file, "tourGalleries")
        );

        const tourCount = await Tour.countDocuments();
        const tourId = `TOUR-${tourCount + 1}`;
        const slug = slugify(tourName, { lower: true, strict: true });

        const slugExists = await Tour.findOne({ slug });
        if (slugExists) {
          return res
            .status(400)
            .json({ message: "A tour with this name already exists" });
        }

        const newTour = new Tour({
          tourId,
          dayPlans,
          tourName,
          slug,
          highlightText,
          tourDetails,
          tourPrice: parseFloat(tourPrice),
          participants: parseInt(participants),
          tourCover: imageCoverPath,
          tourGallery: galleryPaths,
          noOfDays: parseInt(noOfDays),
          tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
          basePlace,
          tourSchedule,
          tourCategory,
          createdBy: FixedCreatedBy,
          updatedBy: FixedUpdatedBy,
          isActive: isActive === "true" || Boolean(isActive),
        });

        await newTour.save();
        res.status(201).json(newTour);
      } catch (error) {
        console.error("Error creating tour:", error.message);
        res.status(500).json({ message: "Server error" });
      }
    });
  } catch (error) {
    console.error("Outer error:", error.message);
    res.status(500).json({ message: "Outer server error" });
  }
};

// Other Functions (for reference)

// Retrieve All Tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    console.error("Error fetching tours:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Retrieve a Single Tour by Slug
const getTourBySlug = async (req, res) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug });
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    console.error("Error fetching tour:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a Tour by ID

// Update a Tour by ID
const updateTour = async (req, res) => {
  try {
    upload.fields([
      { name: "tourCover", maxCount: 1 },
      { name: "tourGallery", maxCount: 5 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Error uploading files",
          error: err.message,
        });
      }

      try {
        const { slug } = req.params; // Get slug from request params

        // Find the tour by slug
        const tour = await Tour.findOne({ slug });
        if (!tour) {
          return res.status(404).json({ message: "Tour not found" });
        }

        console.log("Uploaded Files:", req.files); // Debug uploaded files
        console.log("Request Body:", req.body); // Debug request body

        const {
          dayPlans,
          tourName,
          highlightText,
          tourDetails,
          tourPrice,
          participants,
          noOfDays,
          tags,
          basePlace,
          tourSchedule,
          tourCategory,
          isActive,
        } = req.body;

        // Handle file uploads
        const tourCoverFile = req.files?.tourCover?.[0] || null;
        const tourGalleryFiles = req.files?.tourGallery || [];

        // Update cover image if provided
        if (tourCoverFile) {
          const newCoverPath = saveFile(tourCoverFile, "tourCovers");
          if (tour.tourCover) {
            // Remove the old cover image
            const oldCoverPath = path.join(__dirname, "../public", tour.tourCover);
            if (fs.existsSync(oldCoverPath)) {
              fs.unlinkSync(oldCoverPath);
            }
          }
          tour.tourCover = newCoverPath;
        }

        // Update gallery images if provided
        if (tourGalleryFiles.length > 0) {
          const newGalleryPaths = tourGalleryFiles.map((file) =>
            saveFile(file, "tourGalleries")
          );

          // Remove old gallery images
          if (tour.tourGallery && tour.tourGallery.length > 0) {
            tour.tourGallery.forEach((galleryPath) => {
              const fullPath = path.join(__dirname, "../public", galleryPath);
              if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
              }
            });
          }

          tour.tourGallery = newGalleryPaths;
        }

        // Update other fields
        tour.tourName = tourName || tour.tourName;
        tour.highlightText = highlightText || tour.highlightText;
        tour.tourDetails = tourDetails || tour.tourDetails;
        tour.tourPrice = tourPrice ? parseFloat(tourPrice) : tour.tourPrice;
        tour.participants = participants
          ? parseInt(participants)
          : tour.participants;
        tour.noOfDays = noOfDays ? parseInt(noOfDays) : tour.noOfDays;
        tour.tags = tags
          ? tags.split(",").map((tag) => tag.trim())
          : tour.tags;
        tour.basePlace = basePlace || tour.basePlace;
        tour.tourSchedule = tourSchedule || tour.tourSchedule;
        tour.tourCategory = tourCategory || tour.tourCategory;
        tour.isActive = isActive === "true" || Boolean(isActive);
        tour.dayPlans = dayPlans || tour.dayPlans;

        // Save the updated tour
        const updatedTour = await tour.save();

        res.status(200).json({
          message: "Tour updated successfully",
          tour: updatedTour,
        });
      } catch (error) {
        console.error("Error updating tour:", error.message);
        res.status(500).json({ message: "Server error" });
      }
    });
  } catch (error) {
    console.error("Outer error:", error.message);
    res.status(500).json({ message: "Outer server error" });
  }
};



// Delete a Tour by ID
const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    console.error("Error deleting tour:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Retrieve a Single Tour by Tour ID
const getTourById = async (req, res) => {
  try {
    const { tourId } = req.params;

    // Find the tour using the tourId field
    const tour = await Tour.findOne({ tourId });

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    console.error("Error fetching tour by ID:", error.message);
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
