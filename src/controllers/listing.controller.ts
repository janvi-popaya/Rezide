import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {createListingSchema, objectIdSchema, updateListingSchema, updateStepSchema} from "../validations/index.validation.js";
import listingOnboardingService from "../services/listingOnboarding.services.js";

export const listingOnboarding = asyncHandler(async(req:Request, res:Response) => {
    if(!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized access" });
        return;
    }
    const validatedData = createListingSchema.parse(req.body);
    const authContext = {sub:req.user.sub, firm_id:req.user.firm_id};
    const result = await listingOnboardingService.createListing(validatedData, authContext);

    res.status(result.existing ? 200 : 201).json({
        success: true,
        message: result.existing ? "Existing listing found" : "Listing data added successfully.",
        data: result
    });
});
export const getListingById = asyncHandler(async(req:Request, res:Response) => {
    if(!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized access" });
        return;
    }
    const id = objectIdSchema.parse(req.params.id);
    const authContext = {sub:req.user.sub, firm_id:req.user.firm_id};
    const listing = await listingOnboardingService.getListingById(id, authContext);
    res.status(200).json({success: true, data: listing});
});

export const updateListingOnboarding = asyncHandler(async(req:Request, res:Response) => {
    if(!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized access" });
        return;
    }
    const validatedData = updateListingSchema.parse({ params:req.params, body:req.body });
    const authContext = {sub:req.user.sub, firm_id:req.user.firm_id};
    const listing = await listingOnboardingService.updateListing(validatedData.params.id, validatedData.body, authContext);
    res.status(200).json({success: true, message: "Listing updated successfully.", data: listing});
});

export const updateListingOnboardingStep = asyncHandler(async(req:Request, res:Response) => {
    if(!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized access" });
        return;
    }
    const validatedData = updateStepSchema.parse({ params:req.params, body:req.body });
    const authContext = {sub:req.user.sub, firm_id:req.user.firm_id
    };
    const listing = await listingOnboardingService.updateStep(validatedData.params.id, validatedData.body.current_step, authContext);
    res.status(200).json({success: true, message: "Listing step updated successfully.", data: listing});
});
