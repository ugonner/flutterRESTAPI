import { ResponseOutput, TransactionInput } from "../models/transaction";
import { evaluateSplitAmount } from "../services/transaction";
import { Response, Request } from "express";


export function getSplitEvaluation(req: Request, res: Response){
    //VALIDATION
    try{
        const transactionInput: TransactionInput = {
            "ID": req.body.ID,
            "Amount": req.body.Amount,
            "Currency": req.body.Currency,
            "CustomerEmail": req.body.CustomerEmail,
            "SplitInfo": req.body.SplitInfo,
        }
    
        const output: ResponseOutput = evaluateSplitAmount(transactionInput);
        res.status(200).send(output) 
    }catch(e: any){ res.status(400).send({result: null, message: e.message})}
}