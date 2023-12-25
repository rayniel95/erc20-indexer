import {
    mainnet
} from 'wagmi/chains';
import { Alchemy, Network } from 'alchemy-sdk';


export function getAlchemyClient(chain: any) {
    let config = {
        apiKey: process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_API_KEY!,
        network: Network.ETH_SEPOLIA,
    };
    console.log(process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_API_KEY)
    if (chain?.name === mainnet.name) {
        config = {
            apiKey: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_API_KEY!,
            network: Network.ETH_MAINNET,
        };
    }

    return new Alchemy(config);
}
