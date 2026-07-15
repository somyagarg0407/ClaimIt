const Scheme = require("../models/Scheme");

const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json({
      success: true,
      message: "Schemes fetched successfully",
      schemes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getSchemeById = async (req, res) => {
  const { id } = req.params; // Extract the scheme ID from the request parameters
  try {
    const scheme = await Scheme.findById(id);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Scheme fetched successfully",
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSchemes,
  getSchemeById,
};
