const Booking = require("../models/Booking");
const moment = require("moment");
const countryCodeLookup = require("country-code-lookup"); // Library for country code lookup

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const {
            name,
            email,
            mobile,
            livingCountry,
            nationality,
            destination,
            arrivalDate,
            departureDate,
            packageType,
            totalPrice,
        } = req.body;

        // Ensure required fields are present
        const requiredFields = [
            "name",
            "email",
            "mobile",
            "livingCountry",
            "destination",
            "arrivalDate",
            "departureDate",
            "packageType",
            "totalPrice",
        ];
        const missingFields = requiredFields.filter((field) => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ message: "Missing required fields", missingFields });
        }

        // Validate arrivalDate and departureDate formats
        if (
            !moment(arrivalDate, moment.ISO_8601, true).isValid() ||
            !moment(departureDate, moment.ISO_8601, true).isValid()
        ) {
            return res.status(400).json({ message: "Invalid date format for arrival or departure" });
        }

        // Get the country code for livingCountry
        const countryDetails = countryCodeLookup.byCountry(livingCountry);
        if (!countryDetails) {
            return res.status(400).json({ message: `Invalid living country: ${livingCountry}` });
        }

        const countryCode = countryDetails.iso2; // Use ISO-2 format country code

        // Create new booking entry
        const newBooking = new Booking({
            name,
            email,
            mobile,
            livingCountry,
            countryCode, // Add the resolved country code
            nationality,
            destination,
            arrivalDate,
            departureDate,
            packageType,
            totalPrice,
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Retrieve all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Retrieve a single booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a booking by ID
const updateBooking = async (req, res) => {
    try {
        const {
            name,
            email,
            mobile,
            livingCountry,
            nationality,
            destination,
            arrivalDate,
            departureDate,
            packageType,
            totalPrice,
        } = req.body;

        // Get the updated country code if livingCountry is present
        let countryCode;
        if (livingCountry) {
            const countryDetails = countryCodeLookup.byCountry(livingCountry);
            if (!countryDetails) {
                return res.status(400).json({ message: `Invalid living country: ${livingCountry}` });
            }
            countryCode = countryDetails.iso2; // Use ISO-2 format country code
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                mobile,
                livingCountry,
                ...(countryCode && { countryCode }), // Include updated countryCode if livingCountry is provided
                nationality,
                destination,
                arrivalDate,
                departureDate,
                packageType,
                totalPrice,
            },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
