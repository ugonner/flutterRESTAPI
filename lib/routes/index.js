"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const splitController_1 = require("../controllers/splitController");
const express = require('express');
const router = express.Router();
/* GET home page. */
router.get("/split-payments-compute", splitController_1.getSplitEvaluation);
module.exports = router;
//# sourceMappingURL=index.js.map