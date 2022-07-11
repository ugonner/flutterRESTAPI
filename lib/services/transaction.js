"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateSplitAmount = void 0;
function evaluateSplitAmount(transactionInput) {
    const splitTransactions = transactionInput.SplitInfo;
    const flatSplitTransactions = [];
    const percentageSplitTransactions = [];
    const ratioSplitTransactions = { entities: [], totalRatio: 0 };
    //sort inputs by splittypes
    for (let i = 0; i < splitTransactions.length; i++) {
        if (/flat/i.test(splitTransactions[i].SplitType.trim())) {
            flatSplitTransactions.push(splitTransactions[i]);
        }
        else if (/percentage/i.test(splitTransactions[i].SplitType.trim())) {
            percentageSplitTransactions.push(splitTransactions[i]);
        }
        else if (/ratio/i.test(splitTransactions[i].SplitType.trim())) {
            ratioSplitTransactions.totalRatio += splitTransactions[i].SplitValue;
            ratioSplitTransactions.entities.push(splitTransactions[i]);
        }
    }
    //evaluate splitEntities in order; flats, percentages and ratios
    const splitOutput = [];
    let balance = transactionInput.Amount;
    for (let i = 0; i < flatSplitTransactions.length; i++) {
        let iSplitOutput = {
            SplitEntityId: flatSplitTransactions[i].SplitEntityId,
            Amount: flatSplitTransactions[i].SplitValue
        };
        splitOutput.push(iSplitOutput);
        balance -= iSplitOutput.Amount;
    }
    for (let i = 0; i < percentageSplitTransactions.length; i++) {
        let iSplitOutput = {
            SplitEntityId: percentageSplitTransactions[i].SplitEntityId,
            Amount: ((percentageSplitTransactions[i].SplitValue / 100) * balance)
        };
        splitOutput.push(iSplitOutput);
        balance -= iSplitOutput.Amount;
    }
    const balanceBeforeRatios = balance;
    for (let i = 0; i < ratioSplitTransactions.entities.length; i++) {
        const iRatioEntity = ratioSplitTransactions.entities[i];
        let iSplitOutput = {
            SplitEntityId: iRatioEntity.SplitEntityId,
            Amount: ((iRatioEntity.SplitValue / ratioSplitTransactions.totalRatio) * balanceBeforeRatios),
        };
        splitOutput.push(iSplitOutput);
        balance -= iSplitOutput.Amount;
    }
    const outputResponse = {
        ID: transactionInput.ID,
        Balance: balance,
        SplitBreakdown: splitOutput,
    };
    return outputResponse;
}
exports.evaluateSplitAmount = evaluateSplitAmount;
//console.log(evaluateSplitAmount(input))
//# sourceMappingURL=transaction.js.map