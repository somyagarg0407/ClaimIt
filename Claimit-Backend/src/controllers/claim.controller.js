const Claim = require("../models/Claim.model");
const Scheme = require("../models/Scheme.model");

const createClaim = async (req, res) => {
  const { schemeId, applicationId } = req.body;
  const userId = req.user._id;

  try {
    if (!schemeId || !applicationId) {
      return res.status(400).json({
        success: false,
        message: "Scheme ID and Application ID are required.",
      });
    }

    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found.",
      });
    }

    const existingClaim = await Claim.findOne({
      user: userId,
      scheme: schemeId,
    });

    if (existingClaim) {
      return res.status(409).json({
        success: false,
        message: "Claim already exists for this scheme.",
      });
    }

    const documents = scheme.requiredDocuments.map((document) => ({
      name: document,
    }));

    const claim = await Claim.create({
      user: userId,
      scheme: schemeId,
      applicationId,
      documents,
      timeline: [
        {
          event: "Application Submitted",
          description: "Claim created successfully.",
        },
      ],
    });
    return res.status(201).json({
      success: true,
      message: "Claim created successfully.",
      claim,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createClaim,
};
