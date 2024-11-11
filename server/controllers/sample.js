// server/controllers/TourController.js
const Tour = require("../models/Tour");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const saveFile = (file) => {
  const uploadDir = path.join(process.cwd(), "public/uploads/tours"); // Ensure this directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const originalFileName = file.originalFilename; // Get the original file name
  const newFilePath = path.join(uploadDir, originalFileName);

  fs.renameSync(file.filepath, newFilePath);
  return originalFileName; // Return the file name only
};
// @desc Create a tour
// @route POST /api/tours
// @access Public
exports.createTour = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/uploads/tours");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "Form parse error" });
    }

    try {
      // Count the total number of tours
      const tourCount = await Tour.countDocuments().exec();

      // Generate a new tourId based on the count
      const newTourNumber = tourCount + 1;
      const newTourId = `TO${newTourNumber.toString().padStart(4, "0")}`;

      const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
      const FixedUpdatedBy = "66ae7fe4a9498f09f37f01cc";

      const {
        tourName,
        highlightText,
        tourDetails,
        tourPrice,
        participants,
        tourGallery,
        aboutCover,
        noOfDays,
        tags,
        basePlace,
        tourSchedule,
        tourCategory,
        createdBy = FixedCreatedBy,
        updatedBy = FixedUpdatedBy,
        isActive,
      } = fields;

      const imageFile = files.image ? files.image[0] : null;
      const tourCover = imageFile ? saveFile(imageFile) : "";

      // Convert arrays to strings if needed
      const convertToString = (field) =>
        Array.isArray(field) ? field[0] : field;

      // Extract and convert required fields
      const extractedFields = {
        tourName: convertToString(tourName),
        highlightText: convertToString(highlightText),
        tourDetails: convertToString(tourDetails),
        tourPrice: convertToString(tourPrice),
        participants: convertToString(participants),
        tourGallery: convertToString(tourGallery),
        aboutCover: convertToString(aboutCover),
        noOfDays: convertToString(noOfDays),
        tags: convertToString(tags),
        basePlace: convertToString(basePlace),
        tourCategory: convertToString(tourCategory),
        createdBy: convertToString(createdBy),
        updatedBy: convertToString(updatedBy),
        isActive: convertToString(isActive),
      };

      // Parse tourSchedule to ensure it's an array of objects
      if (fields.tourSchedule) {
        try {
          extractedFields.tourSchedule = JSON.parse(fields.tourSchedule);
          if (!Array.isArray(extractedFields.tourSchedule)) {
            throw new Error("tourSchedule must be an array");
          }
        } catch (error) {
          return res
            .status(400)
            .json({ message: "Invalid tourSchedule format" });
        }
      }

      // Validation
      const requiredFields = ["tourName", "tourDetails", "tourPrice"];
      const missingFields = requiredFields.filter(
        (field) => !extractedFields[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Missing required fields",
          missingFields,
        });
      }

      const newTour = new Tour({
        tourId: newTourId,
        ...extractedFields,
        tourCover,
      });

      const tour = await newTour.save();
      res.status(201).json(tour);
    } catch (err) {
      console.error("Server Error:", err.message);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

// @desc Get all tours
// @route GET /api/tours
// @access Public
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get tour by ID
// @route GET /api/tours/:id
// @access Public
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }
    res.json(tour);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Tour not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Update a tour
// @route PUT /api/tours/:id
// @access Public
exports.updateTour = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/uploads/tours");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "Form parse error" });
    }

    try {
      const {
        tourName,
        highlightText,
        tourDetails,
        tourPrice,
        participants,
        tourGallery,
        aboutCover,
        noOfDays,
        tags,
        basePlace,
        tourSchedule,
        tourCategory,
        updatedBy,
        isActive,
      } = fields;

      const imageFile = files.image ? files.image[0] : null;
      const tourCover = imageFile ? saveFile(imageFile) : "";

      // Convert arrays to strings if needed
      const convertToString = (field) =>
        Array.isArray(field) ? field[0] : field;

      // Extract and convert required fields
      const extractedFields = {
        tourName: convertToString(tourName),
        highlightText: convertToString(highlightText),
        tourDetails: convertToString(tourDetails),
        tourPrice: convertToString(tourPrice),
        participants: convertToString(participants),
        tourGallery: convertToString(tourGallery),
        aboutCover: convertToString(aboutCover),
        noOfDays: convertToString(noOfDays),
        tags: convertToString(tags),
        basePlace: convertToString(basePlace),
        tourCategory: convertToString(tourCategory),
        updatedBy: convertToString(updatedBy),
        isActive: convertToString(isActive),
      };

      // Parse tourSchedule to ensure it's an array of objects
      if (fields.tourSchedule) {
        try {
          extractedFields.tourSchedule = JSON.parse(fields.tourSchedule);
          if (!Array.isArray(extractedFields.tourSchedule)) {
            throw new Error("tourSchedule must be an array");
          }
        } catch (error) {
          return res
            .status(400)
            .json({ message: "Invalid tourSchedule format" });
        }
      }

      // Validation
      const requiredFields = ["tourName", "tourDetails", "tourPrice"];
      const missingFields = requiredFields.filter(
        (field) => !extractedFields[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Missing required fields",
          missingFields,
        });
      }

      // Find the tour and update it
      const updatedTour = await Tour.findByIdAndUpdate(
        req.params.id,
        {
          tourName: extractedFields.tourName,
          highlightText: extractedFields.highlightText,
          tourDetails: extractedFields.tourDetails,
          tourPrice: extractedFields.tourPrice,
          participants: extractedFields.participants,
          tourCover: tourCover || undefined,
          tourGallery: extractedFields.tourGallery,
          aboutCover: extractedFields.aboutCover,
          noOfDays: extractedFields.noOfDays,
          tags: extractedFields.tags,
          basePlace: extractedFields.basePlace,
          tourSchedule: extractedFields.tourSchedule,
          tourCategory: extractedFields.tourCategory,
          updatedBy: extractedFields.updatedBy,
          isActive: extractedFields.isActive,
        },
        { new: true }
      );

      if (!updatedTour) {
        return res.status(404).json({ msg: "Tour not found" });
      }

      res.json(updatedTour);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Tour not found" });
      }
      res.status(500).send("Server Error");
    }
  });
};

// @desc Delete a tour
// @route DELETE /api/tours/:id
// @access Public
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }

    res.json({ msg: "Tour removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Tour not found" });
    }
    res.status(500).send("Server Error");
  }
};