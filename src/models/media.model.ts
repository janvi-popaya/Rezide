import { Schema, model } from "mongoose";

const ImageItemSchema = new Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, required: true },
    orientation: { type: String, enum: ["portrait", "landscape", "unknown"], default: "unknown" }
  },
  { _id: true }
);
const ImagesSchema = new Schema(
  {
    apartment: { type: [ImageItemSchema], default: [] },
    ext_view_day: { type: [ImageItemSchema], default: [] },
    ext_view_night: { type: [ImageItemSchema], default: [] },
    amenities: { type: [ImageItemSchema], default: [] },
    plans: { type: [ImageItemSchema], default: [] }
  },
  { _id: false }
);
const VideoItemSchema = new Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" },
    orientation: { type: String, enum: ["portrait", "landscape", "unknown"], default: "unknown" }
  },
  { _id: true }
);
const listingMediaSchema = new Schema(
  {
    listing_id: {
      type: Schema.Types.ObjectId,
      ref: "Listings",
      required: true,
      index: true
    },
    images: { type: ImagesSchema, default: () => ({}) },
    videos: { type: [VideoItemSchema], default: [] }
  },
  { timestamps: true }
);
export default model("Media", listingMediaSchema);