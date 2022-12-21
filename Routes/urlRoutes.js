import express from 'express';

import { allInsights, getInsight ,updateInsights,deleteInsights} from "../Controllers/urlControllers.js";

const router = express.Router();

router.route("/").get(allInsights).post(getInsight);
router.route('/:id/update').patch(updateInsights);
router.route('/:id/delete').delete(deleteInsights);

export default router;