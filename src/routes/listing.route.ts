import { Router } from "express";
import { getListingById, listingOnboarding, updateListingOnboarding, updateListingOnboardingStep} from "../controllers/listing.controller.js";
import { Protect } from "../middlewares/authCheck.js";

const router = Router();
router.use(Protect);

router.route("/").post(listingOnboarding);
router.route("/:id")
    .get(getListingById)
    .patch(updateListingOnboarding);
router.route("/:id/step").patch(updateListingOnboardingStep);

export default router;
