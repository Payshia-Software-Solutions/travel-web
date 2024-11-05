const Booking = require("../models/Booking");

// @desc Create a booking
// @route POST /api/bookings
// @access Public
exports.createBooking = async (req, res) => {
  try {
    const { bookedDateTime, tourId, payableAmount, createdBy } = req.body;

    if (!bookedDateTime || !tourId || !payableAmount || !createdBy) {
      return res
        .status(400)
        .json({ msg: "Please include all required fields" });
    }

    const newBooking = new Booking({
      bookedDateTime,
      tourId,
      payableAmount,
      createdBy,
    });

    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get all bookings
// @route GET /api/bookings
// @access Public
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get booking by ID
// @route GET /api/bookings/:id
// @access Public
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Update a booking
// @route PUT /api/bookings/:id
// @access Public
exports.updateBooking = async (req, res) => {
  try {
    const { bookedDateTime, tourId, payableAmount, updatedBy } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        bookedDateTime,
        tour,
        Id,
        payableAmount,
        updatedBy,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Delete a booking
// @route DELETE /api/bookings/:id
// @access Public
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.json({ msg: "Booking removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error");
  }
};
