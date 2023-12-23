
export interface INetworkManager{
    getBlocks(start: number, end: number): Promise<Array<any>>
    getLatestTransactions(start: number, end: number): Promise<Array<any>>
    getBlocksFromNegativeIndex(start: number, end: number): Promise<Array<any>>
    getLatestBlocks(cantity: number): Promise<Array<any>>
}
