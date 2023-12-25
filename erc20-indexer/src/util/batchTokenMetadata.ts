export async function getTokenMetadataBatch(contracts: string[], networkUrl: string, apiKey: string): Promise<Array<any>> {
    const reqs = []
    for (let i = 0; i < contracts.length; i++) {
        reqs.push({
            method: 'alchemy_getTokenMetadata',
            params: [contracts[i]],
            id: i + 1,
            jsonrpc: '2.0',
        })
    }

    const res = await fetch(
        `${networkUrl}/${apiKey}/`,
        { method: 'POST', body: JSON.stringify(reqs), headers: { 'Content-Type': 'application/json' } }
    )
    const result: Array<{ id: number }> = await res.json()
    return result
}