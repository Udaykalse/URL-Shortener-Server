import mongoose from "mongoose";
const { nanoid } = require("nanoid");

const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: () => nanoid().substring(0, 10),
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createAt: { type: Date, default: Date.now } ,
}, {
  timestamps: true,
});

export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
