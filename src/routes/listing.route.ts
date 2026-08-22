import { Router } from "express";
import { getListingById, listingOnboarding,updateListingStatus, submitListing} from "../controllers/listing.controller.js";
import { Protect } from "../middlewares/authCheck.js";

const router = Router();
router.use(Protect);

router.route("/").post(listingOnboarding);
router.route("/:id")
    .get(getListingById)
//     .patch(updateListingOnboarding);
router.route("/:id/status")
    .patch(updateListingStatus);
router.route("/:id/submit")
    .post(submitListing);

export default router;
