import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Col, Container, Row } from "react-bootstrap";
import AssetsList from "./components/AssetsList";


export default function Home() {
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
            <AssetsList/>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
