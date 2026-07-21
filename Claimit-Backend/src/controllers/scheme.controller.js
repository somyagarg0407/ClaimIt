const Scheme = require("../models/Scheme.model");

const getAllSchemes = async (req, res) => {
  try {
    const {
      search,
      category,
      gender,
      state,
      occupation,
      featured,
      age,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    const pageNumber = Math.max(1, Number(page) || 1); // Ensure the page number is at least 1
    const limitNumber = Math.min(50, Math.max(1, Number(limit) || 10)); // Limit the maximum number of results to 50
    const skip = (pageNumber - 1) * limitNumber;

    const query = {};
    let sortQuery = {};

    if (sort === "newest") {
      sortQuery = { createdAt: -1 };
    } else if (sort === "oldest") {
      sortQuery = { createdAt: 1 };
    } else if (sort === "name-asc") {
      sortQuery = { name: 1 };
    } else if (sort === "name-desc") {
      sortQuery = { name: -1 };
    } else {
      sortQuery = { createdAt: -1 };
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          "description.shortDescription": {
            $regex: search,
            $options: "i",
          },
        },

        {
          "description.fullDescription": {
            $regex: search,
            $options: "i",
          },
        },

        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      const categories = category
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      query.category = {
        $in: categories,
      };
    }

    if (gender) {
      query["eligibility.gender"] = gender;
    }

    if (state) {
      const states = state
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      query["eligibility.states"] = {
        $in: states,
      };
    }

    if (occupation) {
      const occupations = occupation
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      query["eligibility.occupations"] = {
        $in: occupations,
      };
    }

    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    if (age) {
      query["eligibility.minAge"] = {
        $lte: Number(age),
      };

      query["eligibility.maxAge"] = {
        $gte: Number(age),
      };
    }

    const [totalSchemes, schemes] = await Promise.all([
      // Execute both queries in parallel
      Scheme.countDocuments(query),
      Scheme.find(query)
        .select(
          "_id name category estimatedBenefit description.shortDescription application.processingTime featured",
        )
        .sort(sortQuery)
        .skip(skip)
        .limit(limitNumber)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalSchemes / limitNumber);
    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;

    res.status(200).json({
      success: true,
      message: "Schemes fetched successfully",
      schemes,
      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalSchemes,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
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
