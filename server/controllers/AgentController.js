const Agent = require("../models/Agent");
const formidable = require("formidable");

// @desc Create an agent
// @route POST /api/agents
// @access Public
exports.createAgent = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "Form parse error" });
    }

    try {
      const FixedCreatedBy = "66ae7fe4a9498f09f37f01cc";
      const FixedUpdatedBy = "66ae7fe4a9498f09f37f01cc";

      // Generate a new 'no' based on the count of existing agents
      const agentCount = await Agent.countDocuments().exec();
      const newNumber = agentCount + 1;
      const newNo = `CA${newNumber.toString().padStart(4, "0")}`;

      const {
        name,
        country,
        address,
        contactNo,
        email,
        phone,
        secondaryPhone,
        createdBy = FixedCreatedBy,
        updatedBy = FixedUpdatedBy,
        isActive,
      } = fields;

      // Convert arrays to strings if needed
      const convertToString = (field) =>
        Array.isArray(field) ? field[0] : field;

      // Extract and convert required fields
      const extractedFields = {
        no: newNo, // Use the generated 'no'
        name: convertToString(name),
        country: convertToString(country),
        address: convertToString(address),
        contactNo: convertToString(contactNo),
        email: convertToString(email),
        phone: convertToString(phone),
        secondaryPhone: convertToString(secondaryPhone),
        createdBy: FixedCreatedBy,
        updatedBy: FixedCreatedBy,
        isActive: convertToString(isActive),
      };

      // Validation
      const requiredFields = [
        "name",
        "country",
        "address",
        "contactNo",
        "email",
        "phone",
      ];
      const missingFields = requiredFields.filter(
        (field) => !extractedFields[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Missing required fields",
          missingFields,
        });
      }

      // Create new agent entry
      const newAgent = new Agent({
        ...extractedFields,
      });

      await newAgent.save();
      res.status(201).json(newAgent);
    } catch (error) {
      console.error("Error creating agent:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  });
};

// @desc Get all agents
// @route GET /api/agents
// @access Public
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Get an agent by ID
// @route GET /api/agents/:id
// @access Public
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ msg: "Agent not found" });
    }
    res.json(agent);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Agent not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Update an agent
// @route PUT /api/agents/:id
// @access Public
exports.updateAgent = async (req, res) => {
  try {
    const {
      no,
      name,
      country,
      address,
      contactNo,
      email,
      phone,
      secondaryPhone,
      updatedBy,
    } = req.body;

    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      {
        no,
        name,
        country,
        address,
        contactNo,
        email,
        phone,
        secondaryPhone,
        updatedBy,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedAgent) {
      return res.status(404).json({ msg: "Agent not found" });
    }

    res.json(updatedAgent);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Agent not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc Delete an agent
// @route DELETE /api/agents/:id
// @access Public
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);

    if (!agent) {
      return res.status(404).json({ msg: "Agent not found" });
    }

    res.json({ msg: "Agent removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Agent not found" });
    }
    res.status(500).send("Server Error");
  }
};
