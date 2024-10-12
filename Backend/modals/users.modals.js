const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    points: {
      type: Number,
      default: 0
       }
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("users",userSchema)

module.exports = users