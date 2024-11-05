const Payment = require("../models/Payment");

// @desc Create a payment
// @route POST /api/payments
// @access Public
exports.createPayment = async (req, res) => {
  try {
    const { refId, paymentAmount, paymentType, paymentStatus, createdBy } =
      req.body;

    if (
      !refId ||
      !paymentAmount ||
      !paymentType ||
      !paymentStatus ||
      !createdBy
    ) {
      return res
        .status(400)
        .json({ msg: "Please include all required fields" });
    }

    const newPayment = new Payment({
      refId,
      paymentAmount,
      paymentType,
      paymentStatus,
      createdBy,
    });

    const payment = await newPayment.save();
    res.json(payment);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get all payments
// @route GET /api/payments
// @access Public
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get payment by ID
// @route GET /api/payments/:id
// @access Public
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Payment not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Update a payment
// @route PUT /api/payments/:id
// @access Public
exports.updatePayment = async (req, res) => {
  try {
    const { refId, paymentAmount, paymentType, paymentStatus, updatedBy } =
      req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        refId,
        paymentAmount,
        paymentType,
        paymentStatus,
        updatedBy,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.json(updatedPayment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Payment not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Delete a payment
// @route DELETE /api/payments/:id
// @access Public
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.json({ msg: "Payment removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Payment not found" });
    }
    res.status(500).send("Server Error");
  }
};
