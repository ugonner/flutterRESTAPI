
export interface TransactionInput{
    "ID": number,
    "Amount": number,
    "Currency": string,
    "CustomerEmail": string ,
    "SplitInfo": SplitInformation[]
} 
export interface SplitInformation{
    SplitType: string,
    SplitValue: number,
    SplitEntityId: string
}
export interface ResponseOutput{
    "ID": number,
    "Balance": number,
    "SplitBreakdown": SplitOutput[]
}
export interface SplitOutput{
    "SplitEntityId": string,
    "Amount": number
}
