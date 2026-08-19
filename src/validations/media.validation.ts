import { z } from "zod";
const objectIdSchema = z.string().trim().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

// Orientation
export const mediaOrientationEnum = z.enum(["portrait", "landscape", "unknown"]);

// Media Items
export const imageItemSchema = z.object({
  label: z.string().default(""),
  url: z.string().trim().min(1, "Image URL is required"),
  orientation: mediaOrientationEnum.default("unknown")
});

export const videoItemSchema = z.object({
  label: z.string().default(""),
  url: z.string().trim().min(1, "Video URL is required"),
  orientation: mediaOrientationEnum.default("unknown")
});

// Images Group
export const imagesSchema = z.object({
  apartment: z.array(imageItemSchema).default([]),
  ext_view_day: z.array(imageItemSchema).default([]),
  ext_view_night: z.array(imageItemSchema).default([]),
  amenities: z.array(imageItemSchema).default([]),
  plans: z.array(imageItemSchema).default([])
});

// Complete Media Document
export const listingMediaValidationSchema = z.object({
  listing_id: objectIdSchema,
  images: imagesSchema.default({
    apartment: [],
    ext_view_day: [],
    ext_view_night: [],
    amenities: [],
    plans: []
  }),
  videos: z.array(videoItemSchema).default([])
});

// Step Schemas
export const updateImagesSchema = z.object({ images: imagesSchema });
export const updateVideosSchema = z.object({ videos: z.array(videoItemSchema) });

// Media Update
export const updateMediaSchema = updateImagesSchema
  .partial()
  .merge(updateVideosSchema.partial())
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one media field is required"
  });

// Types
export type UpdateMediaInput = z.infer<typeof updateMediaSchema>;