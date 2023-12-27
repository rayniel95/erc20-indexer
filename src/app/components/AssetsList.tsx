'use client'

import { useCallback, useState } from "react";
import { TokenBalance, TokenBalanceType, TokenMetadataResponse } from "alchemy-sdk";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "react-bootstrap";
import { getAlchemyClient, NetworkUrls } from "@/util/clientConfig";
import ERC20Token from "./ERC20Token";
import { getTokenMetadataBatch } from "@/util/batchTokenMetadata";

export interface IAssetsListProps {
  chain: any;
  address: string;
}

type TokenResponse = TokenMetadataResponse & TokenBalance

export default function AssetsList({ chain, address }: IAssetsListProps) {
  const [items, setItems] = useState<TokenResponse[]>([]);
  const [pageKey, setPageKey] = useState<string | undefined>(undefined)
   
  const hasMore = (pageKey == undefined && items.length == 0) || (pageKey != undefined && items.length > 0)

  const alchemy = getAlchemyClient(chain)

  const fetchData = useCallback(async function()  {
    try {
      const data = await alchemy.core.getTokenBalances(
        address as string,
        {
          type: TokenBalanceType.ERC20,
          pageKey,
        }
      );
      const tokenMetadata = await getTokenMetadataBatch(
        data.tokenBalances.map((item) => item.contractAddress),
        NetworkUrls[alchemy.config.network],
        alchemy.config.apiKey
      )
      console.log(items)
      const newItems = items.concat(data.tokenBalances.map((item, index) => ({ ...item, ...tokenMetadata[index].result })))
      setItems(newItems)
      setPageKey(data.pageKey)
    } catch (error) {
      console.error('Error:', error);
    }
  }, [items, pageKey])

  return (
    // <div style={{ height: "700px", overflow: "auto" }}>
      <InfiniteScroll
        loadMore={fetchData}
        hasMore={hasMore}
        loader={
          <Spinner key={-1} animation="border" variant="primary" />
        }
        pageStart={0}
        useWindow={false}
      >
        <ul>
          {items.length > 0 && items.map(
            (item, index) => (
              <li key={index}>
                <ERC20Token symbol={item.symbol!} balance={item.tokenBalance!} logo={item.logo!} decimals={item.decimals!} />
                <hr />
              </li>
            )
          )}
        </ul>
      </InfiniteScroll>
    // </div>
  );
}