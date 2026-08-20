import { z } from "zod";

export const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

export const listingIdSchema = z
  .string()
  .trim()
  .length(
    10,
    "Custom listing_id must be exactly 10 characters"
  );

export const requiredString = (field: string) =>
  z.string()
    .trim()
    .min(1, `${field} is required`);