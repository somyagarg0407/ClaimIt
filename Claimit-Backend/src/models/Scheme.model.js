const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from both ends of the string
    },

    estimatedBenefit: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: [String],
      required: true,
    },

    eligibility: {
      type: {
        minAge: Number,
        maxAge: Number,
        gender: [String],
        states: [String],
        occupations: [String],
        maxAnnualIncome: Number,
        casteCategories: [String],
      },
      required: true,
    },

    requiredDocuments: {
      type: [String],
      required: true,
    },

    application: {
      type: {
        startDate: Date,
        endDate: Date,
        processingTime: String,
        status: {
          type: String,
          enum: ["Active", "Upcoming", "Closed"],
          required: true,
        },
      },
      required: true,
    },

    description: {
      type: {
        shortDescription: {
          type: String,
          required: true,
          trim: true,
        },
        fullDescription: {
          type: String,
          required: true,
          trim: true,
        },
      },
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    officialLinks: {
      type: {
        officialWebsite: {
          type: String,
          required: true,
          trim: true,
        },

        applicationPortal: {
          type: String,
          required: true,
          trim: true,
        },
      },
      required: true,
    },

    tags: {
      type: [String],
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const Scheme = mongoose.model("Scheme", schemeSchema);
module.exports = Scheme;
