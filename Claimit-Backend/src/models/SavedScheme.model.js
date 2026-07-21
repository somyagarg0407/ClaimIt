const mongoose = require("mongoose");

const savedSchemeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

savedSchemeSchema.index({ user: 1, scheme: 1 }, { unique: true });

const SavedScheme = mongoose.model("SavedScheme", savedSchemeSchema);

module.exports = SavedScheme;
