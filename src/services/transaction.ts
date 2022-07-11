import { ResponseOutput, SplitInformation, SplitOutput, TransactionInput } from "../models/transaction";

export function evaluateSplitAmount(transactionInput: TransactionInput): ResponseOutput{
    const splitTransactions: SplitInformation[] = transactionInput.SplitInfo;
    
    const flatSplitTransactions: SplitInformation[] = [];  
    const percentageSplitTransactions: SplitInformation[] = [];  
    const ratioSplitTransactions: {entities: SplitInformation[], totalRatio: number} = {entities: [], totalRatio: 0};
    
    //sort inputs by splittypes
    for(let i: number = 0; i < splitTransactions.length; i++){
        if(/flat/i.test(splitTransactions[i].SplitType.trim())){
            flatSplitTransactions.push(splitTransactions[i])
        }
        else if(/percentage/i.test(splitTransactions[i].SplitType.trim())){
            percentageSplitTransactions.push(splitTransactions[i])
        }
        else if(/ratio/i.test(splitTransactions[i].SplitType.trim())){
            
            ratioSplitTransactions.totalRatio += splitTransactions[i].SplitValue;
            ratioSplitTransactions.entities.push(splitTransactions[i])
        }
    }

    //evaluate splitEntities in order; flats, percentages and ratios
    const splitOutput: SplitOutput[] = [];
    let balance = transactionInput.Amount;
    
    for(let i: number = 0; i < flatSplitTransactions.length; i++){
        
        let iSplitOutput: SplitOutput = {
        
            SplitEntityId: flatSplitTransactions[i].SplitEntityId,
            Amount: flatSplitTransactions[i].SplitValue
        
        };
        
        splitOutput.push(iSplitOutput);
        balance -= iSplitOutput.Amount;
    
    }

    for(let i: number = 0; i < percentageSplitTransactions.length; i++){
        
        let iSplitOutput: SplitOutput = {
        
            SplitEntityId: percentageSplitTransactions[i].SplitEntityId,
            Amount: ((percentageSplitTransactions[i].SplitValue / 100) * balance)
            
        };
        splitOutput.push(iSplitOutput);
        balance -= iSplitOutput.Amount;
    }

    const balanceBeforeRatios: number = balance;
    for(let i: number = 0; i < ratioSplitTransactions.entities.length; i++){
        
        const iRatioEntity = ratioSplitTransactions.entities[i];
        
        let iSplitOutput: SplitOutput = {
            
            SplitEntityId: iRatioEntity.SplitEntityId,
            Amount: ((iRatioEntity.SplitValue / ratioSplitTransactions.totalRatio) * balanceBeforeRatios),
        
        };
        
        splitOutput.push(iSplitOutput);
        balance -= iSplitOutput.Amount;
    
    }

    const outputResponse: ResponseOutput = {
        ID: transactionInput.ID,
        Balance: balance,
        SplitBreakdown: splitOutput,
    }
    return outputResponse;

}

//console.log(evaluateSplitAmount(input))