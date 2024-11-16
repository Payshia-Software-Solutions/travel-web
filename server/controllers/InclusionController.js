const Inclusion = require("../models/Inclusion");

// Create a new inclusion
exports.createInclusion = async (req, res) => {
  try {
    const { tourId, packageType, inclusions, price } = req.body;

    const newInclusion = new Inclusion({
      tourId,
      packageType,
      inclusions,
      price, // Include price in the new Inclusion instance
    });

    const savedInclusion = await newInclusion.save();
    res.status(201).json(savedInclusion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all inclusions
exports.getInclusions = async (req, res) => {
  try {
    const inclusions = await Inclusion.find().populate({
      path: "tourId",
      select: "_id",
    });
    res.status(200).json(inclusions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific inclusion by ID
exports.getInclusionById = async (req, res) => {
  try {
    const inclusion = await Inclusion.findById(req.params.id).populate({
      path: "tourId",
      select: "_id",
    });
    if (!inclusion) {
      return res.status(404).json({ error: "Inclusion not found" });
    }
    res.status(200).json(inclusion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get inclusions by packageType
exports.getInclusionByPackageType = async (req, res) => {
  try {
    const { packageType } = req.params;
    const inclusion = await Inclusion.findOne({ packageType }).populate({
      path: "tourId",
      select: "_id",
    });

    if (!inclusion) {
      return res
        .status(404)
        .json({ error: "Inclusion with the specified package type not found" });
    }

    res.status(200).json(inclusion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an inclusion by ID
exports.updateInclusion = async (req, res) => {
  try {
    const { tourId, packageType, inclusions, price } = req.body;

    const updatedInclusion = await Inclusion.findByIdAndUpdate(
      req.params.id,
      { tourId, packageType, inclusions, price }, // Include price in update
      { new: true, runValidators: true }
    ).populate({
      path: "tourId",
      select: "_id",
    });

    if (!updatedInclusion) {
      return res.status(404).json({ error: "Inclusion not found" });
    }
    res.status(200).json(updatedInclusion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an inclusion by ID
exports.deleteInclusion = async (req, res) => {
  try {
    const deletedInclusion = await Inclusion.findByIdAndDelete(req.params.id);
    if (!deletedInclusion) {
      return res.status(404).json({ error: "Inclusion not found" });
    }
    res.status(200).json({ message: "Inclusion deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get inclusions by tourId
exports.getInclusionsByTourId = async (req, res) => {
  const { tourId } = req.params;

  try {
    const inclusions = await Inclusion.find({ tourId });
    if (inclusions && inclusions.length > 0) {
      res.status(200).json(inclusions);
    } else {
      res
        .status(404)
        .json({ error: "No inclusions found for the specified tour ID." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching inclusions." });
  }
};
