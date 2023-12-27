'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Col, Container, Row } from "react-bootstrap";
import { useAccount } from "wagmi";
import WalletConnect from "./components/WalletConnect";


export default function Home() {
  const {isConnected } = useAccount()

  return (
    <main>
      <Container>
        <Row className="mt-3">
          <Col>
            <h1 className="text-center">Erc20 Indexer</h1>
            <hr />
          </Col>
          <Col sm={2}> 
            {/* TODO - move this connect button to the end */}
            <ConnectButton />
          </Col>
        </Row>
        <Row>
          <Col>
            {isConnected && <WalletConnect/>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}
