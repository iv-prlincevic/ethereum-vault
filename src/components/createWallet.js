import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import ls from 'local-storage';

const Wallet = () => {
  const [, setPublicAddress] = useState("");
  const [, setPrivateKey] = useState("");
  const navigate = useNavigate();


  function createWallet () {
    let web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://sepolia.infura.io/v3/cef029aefdf14e77a9b822c7b2c7e3a3"
      )
    );
    const wallet = web3.eth.accounts.create();
    setPublicAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
    ls.set('publicAddress', wallet.address);
    ls.set('privateKey', wallet.privateKey);
   navigate('/wallet-info');
  };

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
          <br />
          <ul style={{ textAlign: "start" }}>
            <li>See your ETH address of the wallet</li>
            <li>See all transactions for ETH Address</li>
            <li>See how much ETH is in the wallet</li>
            <li>Save [new] withdraw address</li>
            <li>Withdraw to saved address</li>
          </ul>
          <div style={{ marginTop: "30px" }}>
            <Button variant="primary" onClick={createWallet}>
              Create a Wallet
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Wallet;
