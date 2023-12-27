import {
    mainnet
} from 'wagmi/chains';
import { Alchemy, Network } from 'alchemy-sdk';


export function getAlchemyClient(chain: any) {
    let config = {
        apiKey: process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_API_KEY!,
        network: Network.ETH_SEPOLIA,
    };
    if (chain?.name === mainnet.name) {
        config = {
            apiKey: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_API_KEY!,
            network: Network.ETH_MAINNET,
        };
    }

    return new Alchemy(config);
}

export const NetworkUrls: Record<string, string> = {
    [Network.ETH_MAINNET]: "https://eth-mainnet.g.alchemy.com/v2",
    [Network.ETH_SEPOLIA]: "https://eth-sepolia.g.alchemy.com/v2",
}
