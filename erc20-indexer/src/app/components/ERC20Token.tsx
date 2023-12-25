'use client'

import { Utils } from "alchemy-sdk";
import Image from 'react-bootstrap/Image';


export interface IERC20TokenProps {
    symbol: string;
    balance: string;
    logo: string;
    decimals: number;
}

export default function ERC20Token({ symbol, balance, logo, decimals }: IERC20TokenProps) {

    return (
        <>
            <b>Symbol:</b> ${symbol}&nbsp;
            <b>Balance:</b>&nbsp;
            {Utils.formatUnits(
                balance,
                decimals
            )}
            <Image src={logo} rounded />
        </>
    );
}