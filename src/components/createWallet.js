import Web3 from "web3";
import React from "react";
import { Button, Card } from "react-bootstrap";
import history from "../history";

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicAddress: "",
      privateKey: "",
    };

    this.createWallet = this.createWallet.bind(this);
  }

  createWallet = () => {
    let web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/032016e8ed9d48759a11bae809058fe5"
      )
    );
    const wallet = web3.eth.accounts.create();
    this.setState({
      publicAddress: wallet.address,
      privateKey: wallet.privateKey,
    });
    history.push({
      pathname: "/wallet-info",
      state: {
        publicAddress: wallet.address,
        privateKey: wallet.privateKey,
      },
    });
  };

  render() {
    return (
      <div
        className="nav-menu"
        style={{
          display: "grid",
          gridTemplateColumns: "30%",

          justifyContent: "center",
        }}
      >
        <Card
          className="text-center"
          style={{
            margin: "20px",
          }}
        >
          <Card.Body>
            <h4>When you create a wallet you can:</h4>
            <br></br>
            <ul style={{ textAlign: "start" }}>
              <li>See your ETH address of the wallet</li>
              <li>See all transactions for ETH Address</li>
              <li>See how much ETH is in the wallet</li>
              <li>Save [new] withdraw address </li>
              <li>Withdraw to saved address</li>
            </ul>
            <div style={{ marginTop: "30px" }}>
              <Button variant="primary" onClick={this.createWallet}>
                {" "}
                Create a Wallet
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
