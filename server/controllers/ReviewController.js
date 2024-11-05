const Review = require("../models/Review");

// @desc Create a review
// @route POST /api/reviews
// @access Public
exports.createReview = async (req, res) => {
  try {
    const { userId, tourId, rating, comment, createdBy, updatedBy, isActive } =
      req.body;

    if (!userId || !tourId || !rating || !comment) {
      return res
        .status(400)
        .json({ msg: "Please include all required fields" });
    }

    const newReview = new Review({
      userId,
      tourId,
      rating,
      comment,
      createdBy,
      updatedBy,
      isActive,
    });

    const review = await newReview.save();
    res.json(review);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get all reviews
// @route GET /api/reviews
// @access Public
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get review by ID
// @route GET /api/reviews/:id
// @access Public
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Update a review
// @route PUT /api/reviews/:id
// @access Public
exports.updateReview = async (req, res) => {
  try {
    const { userId, tourId, rating, comment, updatedBy, isActive } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        tourId,
        rating,
        comment,
        updatedBy,
        isActive,
      },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ msg: "Review not found" });
    }

    res.json(updatedReview);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access Public
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    res.json({ msg: "Review removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.status(500).send("Server Error");
  }
};
