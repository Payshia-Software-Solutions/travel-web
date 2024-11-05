const Vehicle = require("../models/Vehicle");

// @desc Create a vehicle
// @route POST /api/vehicles
// @access Public
exports.createVehicle = async(req, res) => {
    try {
        const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
        const FixedUpdateBy = "66ae7fe4a9498f09f37f01cc";

        const {
            type,
            owner,
            vehicleNo,
            seats,
            availability,
            createdBy = FixedCreatedBy,
            updatedBy = FixedUpdateBy,
        } = req.body;

        if (!type ||
            !owner ||
            !vehicleNo ||
            !seats ||
            !availability ||
            !createdBy
        ) {
            return res
                .status(400)
                .json({ msg: "Please include all required fields" });
        }

        const newVehicle = new Vehicle({
            type,
            owner,
            vehicleNo,
            seats,
            availability,
            createdBy,
            updatedBy,
        });

        const vehicle = await newVehicle.save();
        res.json(vehicle);
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).send("Server Error");
    }
};

// @desc Get all vehicles
// @route GET /api/vehicles
// @access Public
exports.getVehicles = async(req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// @desc Get a vehicle by ID
// @route GET /api/vehicles/:id
// @access Public
exports.getVehicleById = async(req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ msg: "Vehicle not found" });
        }
        res.json(vehicle);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Vehicle not found" });
        }
        res.status(500).send("Server Error");
    }
};

// @desc Update a vehicle
// @route PUT /api/vehicles/:id
// @access Public
exports.updateVehicle = async(req, res) => {
    try {
        const { type, owner, vehicleNo, seats, availability, updatedBy } = req.body;

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id, {
                type,
                owner,
                vehicleNo,
                seats,
                availability,
                updatedBy,
                updatedAt: Date.now(),
            }, { new: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ msg: "Vehicle not found" });
        }

        res.json(updatedVehicle);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Vehicle not found" });
        }
        res.status(500).send("Server Error");
    }
};

// @desc Delete a vehicle
// @route DELETE /api/vehicles/:id
// @access Public
exports.deleteVehicle = async(req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ msg: "Vehicle not found" });
        }

        res.json({ msg: "Vehicle removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Vehicle not found" });
        }
        res.status(500).send("Server Error");
    }
};