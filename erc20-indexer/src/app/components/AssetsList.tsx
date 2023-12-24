'use client'

import { useState, useCallback } from "react";
import { AssetTransfersCategory, TokenBalanceType } from "alchemy-sdk";
import InfiniteScroll from "react-infinite-scroller";
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { Spinner } from "react-bootstrap";
import { useAccount, useNetwork, usePublicClient } from "wagmi";
import { getAlchemyClient } from "@/util/clientConfig";


export default function AssetsList() {
  //TODO - maybe turn this two states into memoized vars
  const [items, setItems] = useState<any[]>([]);
  const [pageKey, setPageKey] = useState<string | undefined>(undefined)
  const { chain} = useNetwork()
  const { address } = useAccount()

  const hasMore = (pageKey == undefined && items.length == 0) || (pageKey != undefined && items.length > 0)

  const alchemy = getAlchemyClient(chain)

  async function fetchData() {
    try {
      const data = await alchemy.core.getTokenBalances(
        address as string,
        {
          type: TokenBalanceType.ERC20,
          pageKey,
        }
      );
      setItems(items.concat(data.tokenBalances))
      setPageKey(data.pageKey)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div style={{ height: "700px", overflow: "auto" }}>
      <InfiniteScroll
        loadMore={fetchData}
        hasMore={hasMore}
        loader={
          <Spinner key={-1} animation="border" variant="primary" />
        }
        pageStart={0}
        useWindow={false}
      >
        {
          items.map(
            (item) => (
              <div key={item.hash}>
                {/* <TransactionItem item={item}  /> */}
                <hr />
              </div>
            )
          )
        }
      </InfiniteScroll>
    </div>
  );
}

/*
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  async function getTokenBalance() {
    const config = {
      apiKey: '<-- COPY-PASTE YOUR ALCHEMY API KEY HERE -->',
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(userAddress);

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }
  return (
    <Box w="100vw">
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>
        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="blue">
          Check ERC-20 Token Balances
        </Button>

        <Heading my={36}>ERC-20 token balances:</Heading>

        {hasQueried ? (
          <SimpleGrid w={'90vw'} columns={4} spacing={24}>
            {results.tokenBalances.map((e, i) => {
              return (
                <Flex
                  flexDir={'column'}
                  color="white"
                  bg="blue"
                  w={'20vw'}
                  key={e.id}
                >
                  <Box>
                    <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                  </Box>
                  <Box>
                    <b>Balance:</b>&nbsp;
                    {Utils.formatUnits(
                      e.tokenBalance,
                      tokenDataObjects[i].decimals
                    )}
                  </Box>
                  <Image src={tokenDataObjects[i].logo} />
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          'Please make a query! This may take a few seconds...'
        )}
      </Flex>
    </Box>
  );
}

export default App;

*/