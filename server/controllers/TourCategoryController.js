const TourCategory = require("../models/TourCategory");

// @desc Create a tour category
// @route POST /api/tourcategories
// @access Public
exports.createTourCategory = async (req, res) => {
  try {
    const { categoryName, createdBy } = req.body;

    if (!categoryName || !createdBy) {
      return res
        .status(400)
        .json({ msg: "Please include all required fields" });
    }

    const newTourCategory = new TourCategory({
      categoryName,
      createdBy,
    });

    const tourCategory = await newTourCategory.save();
    res.json(tourCategory);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get all tour categories
// @route GET /api/tourcategories
// @access Public
exports.getTourCategories = async (req, res) => {
  try {
    const tourCategories = await TourCategory.find();
    res.json(tourCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get a tour category by ID
// @route GET /api/tourcategories/:id
// @access Public
exports.getTourCategoryById = async (req, res) => {
  try {
    const tourCategory = await TourCategory.findById(req.params.id);
    if (!tourCategory) {
      return res.status(404).json({ msg: "Tour category not found" });
    }
    res.json(tourCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Tour category not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Update a tour category
// @route PUT /api/tourcategories/:id
// @access Public
exports.updateTourCategory = async (req, res) => {
  try {
    const { categoryName, updatedBy } = req.body;

    const updatedTourCategory = await TourCategory.findByIdAndUpdate(
      req.params.id,
      { categoryName, updatedBy, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedTourCategory) {
      return res.status(404).json({ msg: "Tour category not found" });
    }

    res.json(updatedTourCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Tour category not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Delete a tour category
// @route DELETE /api/tourcategories/:id
// @access Public
exports.deleteTourCategory = async (req, res) => {
  try {
    const tourCategory = await TourCategory.findByIdAndDelete(req.params.id);

    if (!tourCategory) {
      return res.status(404).json({ msg: "Tour category not found" });
    }

    res.json({ msg: "Tour category removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Tour category not found" });
    }
    res.status(500).send("Server Error");
  }
};
