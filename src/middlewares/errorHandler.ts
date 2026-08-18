import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/apiError.js";

export const errorHandler = (error: Error, req:Request, res:Response, next:NextFunction)=>{
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: error.issues[0]?.message || "Validation failed",
        });
    }

    if(error instanceof ApiError){
        return res.status(error.statusCode).json({success:false, message:error.message})
    }

    const maybeStatusError = error as Error & { statusCode?: number };
    if (typeof maybeStatusError.statusCode === "number") {
        return res.status(maybeStatusError.statusCode).json({
            success: false,
            message: maybeStatusError.message
        });
    }

    const castError = error as Error & { name?: string };
    if (castError.name === "CastError") {
        return res.status(400).json({ success: false, message: "Invalid id" });
    }

    return res.status(500).json({success:false, message:"Internal server error !"});
};
