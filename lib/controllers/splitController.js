"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSplitEvaluation = void 0;
const transaction_1 = require("../services/transaction");
function getSplitEvaluation(req, res) {
    //VALIDATION
    try {
        const transactionInput = {
            "ID": req.body.ID,
            "Amount": req.body.Amount,
            "Currency": req.body.Currency,
            "CustomerEmail": req.body.CustomerEmail,
            "SplitInfo": req.body.SplitInfo,
        };
        const output = (0, transaction_1.evaluateSplitAmount)(transactionInput);
        res.status(200).send(output);
    }
    catch (e) {
        res.status(400).send({ result: null, message: e.message });
    }
}
exports.getSplitEvaluation = getSplitEvaluation;
//# sourceMappingURL=splitController.js.map