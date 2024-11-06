const GetQuote = require("../models/GetQuote");
const formidable = require("formidable");

// @desc Create a quote
// @route POST /api/quotes
// @access Public
exports.createQuote = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "Form parse error" });
    }

    try {
      const {
        name,
        email,
        countryCode,
        mobileNumber,
        livingCountry,
        nationality,
        destination,
        arrivalDate,
        departureDate,
        packageType,
        totalCost,
      } = fields;

      const quoteData = {
        personalDetails: {
          name,
          email,
          mobile: {
            countryCode,
            number: mobileNumber,
          },
          livingCountry,
          nationality,
        },
        tourDetails: {
          destination,
          arrivalDate,
          departureDate,
        },
        packageDetails: {
          packageType,
          totalCost,
        },
      };

      const newQuote = new GetQuote(quoteData);
      await newQuote.save();
      res.status(201).json(newQuote);
    } catch (error) {
      console.error("Error creating quote:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  });
};

// @desc Get all quotes
// @route GET /api/quotes
// @access Public
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await GetQuote.find();
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get a quote by ID
// @route GET /api/quotes/:id
// @access Public
exports.getQuoteById = async (req, res) => {
  try {
    const quote = await GetQuote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ msg: "Quote not found" });
    }
    res.json(quote);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Quote not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Update a quote
// @route PUT /api/quotes/:id
// @access Public
exports.updateQuote = async (req, res) => {
  try {
    const {
      name,
      email,
      countryCode,
      mobileNumber,
      livingCountry,
      nationality,
      destination,
      arrivalDate,
      departureDate,
      packageType,
      totalCost,
    } = req.body;

    const updatedQuote = await GetQuote.findByIdAndUpdate(
      req.params.id,
      {
        personalDetails: {
          name,
          email,
          mobile: {
            countryCode,
            number: mobileNumber,
          },
          livingCountry,
          nationality,
        },
        tourDetails: {
          destination,
          arrivalDate,
          departureDate,
        },
        packageDetails: {
          packageType,
          totalCost,
        },
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ msg: "Quote not found" });
    }

    res.json(updatedQuote);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Quote not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Delete a quote
// @route DELETE /api/quotes/:id
// @access Public
exports.deleteQuote = async (req, res) => {
  try {
    const quote = await GetQuote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({ msg: "Quote not found" });
    }

    res.json({ msg: "Quote removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Quote not found" });
    }
    res.status(500).send("Server Error");
  }
};
