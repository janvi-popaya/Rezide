// import { z } from "zod";

// // Base Reusable Schemas
// import { objectIdSchema } from "./common.validation.js";
// export const mediaOrientationEnum = z.enum(["portrait", "landscape", "unknown"]);

// // Generic Media Builder
// const createMediaSchema = (urlErrorMsg: string) =>
//   z.object({
//     label: z.string().optional(),
//     url: z.string().trim().min(1, urlErrorMsg),
//     orientation: mediaOrientationEnum.optional(),
//   });

// export const imageItemSchema = createMediaSchema("Image URL is required");
// export const videoItemSchema = createMediaSchema("Video URL is required");

// // Grouped Media Schemas
// const imageList = z.array(imageItemSchema).optional();

// export const imagesSchema = z.object({
//   apartment: imageList,
//   ext_view_day: imageList,
//   ext_view_night: imageList,
//   amenities: imageList,
//   plans: imageList,
// });

// export const listingMediaValidationSchema = z.object({
//   listing_id: objectIdSchema,
//   images: imagesSchema.optional(),
//   videos: z.array(videoItemSchema).optional(),
// });

// // Types
// export type ListingMediaInput = z.infer<typeof listingMediaValidationSchema>;