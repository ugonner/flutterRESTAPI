import { getSplitEvaluation } from "../controllers/splitController";

const express = require('express');
const router = express.Router();
/* GET home page. */
router.get("/split-payments-compute", getSplitEvaluation)
module.exports = router;