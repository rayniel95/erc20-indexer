'use client'

import { useAccount, useNetwork } from "wagmi";
import AssetsList from "./AssetsList";


export default function WalletConnect() {
    const { chain } = useNetwork()
    const { address } = useAccount()

    return (
        <>
        <AssetsList chain={chain} address={address as string} />
        </>
    );
}