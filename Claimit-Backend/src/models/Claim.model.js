const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },

    applicationId: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Under Review",
        "Action Required",
        "Approved",
        "Rejected",
        "Disbursed",
      ],
      default: "Submitted",
    },

    documents: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        status: {
          type: String,
          enum: ["Pending", "Uploaded", "Rejected", "Verified"],
          default: "Pending",
        },

        url: {
          type: String,
          trim: true,
        },

        uploadedAt: {
          type: Date,
        },
      },
    ],

    timeline: [
      {
        event: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
  },
  
  {
    timestamps: true,
  },
);

claimSchema.index({ user: 1, scheme: 1 }, { unique: true });

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
