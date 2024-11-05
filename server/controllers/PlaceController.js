// server/controllers/PlaceController.js
const Place = require("../models/Place");

// Create a place
exports.createPlace = async(req, res) => {
    try {
        const {
            placeName,
            location,
            images,
            description,
            tags,
            createdBy,
            updatedBy,
            isActive,
        } = req.body;

        if (!placeName || !location) {
            return res
                .status(400)
                .json({ msg: "Please include all required fields" });
        }

        const newPlace = new Place({
            placeName,
            location,
            images,
            description,
            tags,
            createdBy,
            updatedBy,
            isActive,
        });

        const place = await newPlace.save();
        res.json(place);
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).send("Server Error");
    }
};

// Get all places
exports.getAllPlaces = async(req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).send("Server Error");
    }
};

// Get a single place by ID
exports.getPlaceById = async(req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ msg: "Place not found" });
        }
        res.json(place);
    } catch (err) {
        console.error("Server Error:", err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Place not found" });
        }
        res.status(500).send("Server Error");
    }
};

// Update a place
exports.updatePlace = async(req, res) => {
    try {
        const { placeName, location, images, description, tags } = req.body;

        const updatedPlace = await Place.findByIdAndUpdate(
            req.params.id, { placeName, location, images, description, tags }, { new: true }
        );

        if (!updatedPlace) {
            return res.status(404).json({ msg: "Place not found" });
        }

        res.json(updatedPlace);
    } catch (err) {
        console.error("Server Error:", err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Place not found" });
        }
        res.status(500).send("Server Error");
    }
};

// Delete a place
exports.deletePlace = async(req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);

        if (!place) {
            return res.status(404).json({ msg: "Place not found" });
        }

        res.json({ msg: "Place removed" });
    } catch (err) {
        console.error("Server Error:", err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Place not found" });
        }
        res.status(500).send("Server Error");
    }
};