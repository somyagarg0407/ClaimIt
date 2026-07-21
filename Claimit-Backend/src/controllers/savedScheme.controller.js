const SavedScheme = require("../models/savedScheme.model");
const Scheme = require("../models/Scheme.model");

const saveScheme = async (req, res) => {
  const { schemeId } = req.body;
  const userId = req.user._id;

  try {
    // 1. Validate request
    if (!schemeId) {
      return res.status(400).json({
        success: false,
        message: "Scheme ID is required.",
      });
    }

    // 2. Check if scheme exists
    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found.",
      });
    }

    // 3. Check if already saved
    const alreadySaved = await SavedScheme.findOne({
      user: userId,
      scheme: schemeId,
    });

    if (alreadySaved) {
      return res.status(409).json({
        success: false,
        message: "Scheme is already saved.",
      });
    }

    // 4. Save scheme
    const savedScheme = await SavedScheme.create({
      user: userId,
      scheme: schemeId,
    });

    // 5. Success response
    return res.status(201).json({
      success: true,
      message: "Scheme saved successfully.",
      data: savedScheme,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const getSavedSchemes = async (req, res) => {
    const userId = req.user._id;

    try {
      const savedSchemes = await SavedScheme.find({ user: userId })
        .populate("scheme","name estimatedBenefit category application.status")
        .lean();
      return res.status(200).json({
        success: true,
        message: "Saved schemes fetched successfully.",
        data: savedSchemes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error.",
      });
    }
  };

const deleteSavedScheme = async (req, res) => {
  const { schemeId } = req.params;
  const userId = req.user._id;

  try {
    const deletedScheme = await SavedScheme.findOneAndDelete({
      user: userId,
      scheme: schemeId,
    });

    if (!deletedScheme) {
      return res.status(404).json({
        success: false,
        message: "Saved scheme not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Scheme deleted from saved list.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = {
  saveScheme,
  getSavedSchemes,
  deleteSavedScheme,
};
