import { Router } from "express";
import { getListingById, listingOnboarding, updateListingOnboarding,updateListingStatus} from "../controllers/listing.controller.js";
import { Protect } from "../middlewares/authCheck.js";
import {listingActionSchema} from "../validations/index.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();
router.use(Protect);

router.route("/").post(listingOnboarding);
router.route("/:id")
    .get(getListingById)
    .patch(updateListingOnboarding);
router.route("/:id/status")
    .patch(validate(listingActionSchema),updateListingStatus);
    
export default router;
