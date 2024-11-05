const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Create a user
// @route POST /api/users
// @access Public
exports.createUser = async(req, res) => {
    try {
        const {
            username,
            email,
            firstName,
            lastName,
            addressL1,
            addressL2,
            city,
            zipCode,
            country,
            phone,
            createdBy,
            updatedBy,
            isActive,
        } = req.body;

        if (!username || !email || !firstName || !lastName) {
            return res
                .status(400)
                .json({ msg: "Please include all required fields" });
        }

        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            addressL1,
            addressL2,
            city,
            zipCode,
            country,
            phone,
            createdBy,
            updatedBy,
            isActive,
        });

        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).send("Server Error");
    }
};

// @desc Get all users
// @route GET /api/users
// @access Public
exports.getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// @desc Get user by ID
// @route GET /api/users/:id
// @access Public
exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(500).send("Server Error");
    }
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Public
exports.updateUser = async(req, res) => {
    try {
        const {
            username,
            email,
            firstName,
            lastName,
            addressL1,
            addressL2,
            city,
            zipCode,
            country,
            phone,
            updatedBy,
            isActive,
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                username,
                email,
                firstName,
                lastName,
                addressL1,
                addressL2,
                city,
                zipCode,
                country,
                phone,
                updatedBy,
                isActive,
            }, { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(500).send("Server Error");
    }
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Public
exports.deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ msg: "User removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(500).send("Server Error");
    }
};