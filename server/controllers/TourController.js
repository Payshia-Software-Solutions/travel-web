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
    // Handle file uploads
    upload.fields([
      { name: "tourCover", maxCount: 1 },
      { name: "tourGallery", maxCount: 5 },
    ])(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error uploading files", error: err.message });
      }
  try {
    // Handle file uploads
    upload.fields([
      { name: "tourCover", maxCount: 1 },
      { name: "tourGallery", maxCount: 5 },
    ])(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error uploading files", error: err.message });
      }

      console.log("Uploaded Files:", req.files); // Debug uploaded files
      console.log("Request Body:", req.body); // Debug request body
      console.log("Uploaded Files:", req.files); // Debug uploaded files
      console.log("Request Body:", req.body); // Debug request body

      const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
      const FixedUpdatedBy = "66ae7fe4a9498f09f37f01cc";
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
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res
          .status(400)
          .json({ message: "Missing required fields", missingFields });
      }

      const tourCoverFile = req.files.tourCover ? req.files.tourCover[0] : null;
      const tourGalleryFiles = req.files.tourGallery || [];

      console.log("Tour Cover File:", tourCoverFile); // Debug tourCover file
      console.log("Gallery Files:", tourGalleryFiles); // Debug tourGallery files

      const imageCoverPath = tourCoverFile
        ? saveFile(tourCoverFile, "tourCovers")
        : "";
      const galleryPaths = tourGalleryFiles.map((file) =>
        saveFile(file, "tourGalleries")
      );

      console.log("Image Cover Path:", imageCoverPath); // Debug saved path

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
        tags: tags.split(",").map((tag) => tag.trim()),
        basePlace,
        tourSchedule,
        tourCategory,
        createdBy: FixedCreatedBy,
        updatedBy: FixedUpdatedBy,
        isActive: isActive === "true" || isActive === true,
      });

      await newTour.save();
      res.status(201).json(newTour);
    });
  } catch (error) {
    console.error("Error creating tour:", error.message);
    res.status(500).json({ message: "Server error" });
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
const updateTour = async (req, res) => {
    try {
        upload.fields([{ name: "tourCover", maxCount: 1 }, { name: "tourGallery", maxCount: 5 }])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading files", error: err.message });
            }

            const { tourName, ...otherFields } = req.body;

            let slug;
            if (tourName) {
                slug = slugify(tourName, { lower: true, strict: true });

                const slugExists = await Tour.findOne({ slug, _id: { $ne: req.params.id } });
                if (slugExists) {
                    return res.status(400).json({ message: "A tour with this name already exists" });
                }
            }

            const tourCoverFile = req.files.tourCover ? req.files.tourCover[0] : null;
            const tourGalleryFiles = req.files.tourGallery || [];

            const imageCoverPath = tourCoverFile ? saveFile(tourCoverFile, "tourCovers") : undefined;
            const galleryPaths = tourGalleryFiles.map(file => saveFile(file, "tourGalleries"));

            const updatedTour = await Tour.findByIdAndUpdate(
                req.params.id,
                {
                    ...otherFields,
                    ...(slug && { slug }),
                    ...(imageCoverPath && { tourCover: imageCoverPath }),
                    ...(galleryPaths.length > 0 && { tourGallery: galleryPaths })
                },
                { new: true }
            );

            if (!updatedTour) {
                return res.status(404).json({ message: "Tour not found" });
            }

            res.status(200).json(updatedTour);
        });
    } catch (error) {
        console.error("Error updating tour:", error.message);
        res.status(500).json({ message: "Server error" });
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

const updateTourById = async (req, res) => {
    try {
      const { tourId } = req.params; // Extract the tourId from the request parameters
      const { tourName, ...updateFields } = req.body; // Separate tourName for slug logic
  
      // Find the existing tour
      const existingTour = await Tour.findOne({ tourId });
      if (!existingTour) {
        return res.status(404).json({ message: "Tour not found" });
      }
  
      let slug;
      if (tourName && tourName !== existingTour.tourName) {
        // Generate a new slug if the tourName changes
        slug = slugify(tourName, { lower: true, strict: true });
  
        // Check if the new slug already exists for another tour
        const slugExists = await Tour.findOne({
          slug,
          tourId: { $ne: tourId },
        });
        if (slugExists) {
          return res.status(400).json({ message: "A tour with this name already exists" });
        }
      }
  
      // Prepare the update payload
      const updatePayload = {
        ...updateFields,
        ...(slug && { slug }),
        ...(tourName && { tourName }),
      };
  
      // Update the tour
      const updatedTour = await Tour.findOneAndUpdate(
        { tourId },
        updatePayload,
        { new: true } // Return the updated document
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
module.exports = {
    createTour,
    getAllTours,
    getTourBySlug,
    updateTour,
    deleteTour
};
