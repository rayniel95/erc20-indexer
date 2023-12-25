'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Col, Container, Row } from "react-bootstrap";
import AssetsList from "./components/AssetsList";
import { useAccount } from "wagmi";


export default function Home() {
  const {isConnected } = useAccount()

  return (
    <main>
      <Container>
        <Row className="mt-3">
          <Col>
            <h1 className="text-center">Erc20 Indexer</h1>
          </Col>
          <Col sm={2}> 
            {/* TODO - move this connect button to the end */}
            <ConnectButton />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {isConnected && <AssetsList/>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}
