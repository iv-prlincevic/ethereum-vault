import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ls from 'local-storage';
import { useNavigate } from "react-router-dom";

const WalletInfo = () => {
  const navigate = useNavigate();
  const [publicAddress,] = useState(ls.get('publicAddress'));
  const [privateKey,] = useState( ls.get('privateKey'));


  return (
    <div
      className="nav-menu"
      style={{
        display: "grid",
        gridTemplateColumns: "50%",
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
          <h2>Here is your new wallet info</h2>
          <div style={{ marginTop: "30px" }}>
            <div style={{ margin: "10px" }}>
              Public address
              <div style={{ margin: "5px", fontSize: "18px" }}>
                {publicAddress}
              </div>
            </div>
            <div style={{ margin: "20px " }}>
              Private key{" "}
              <div style={{ margin: "5px", fontSize: "18px" }}>
                {privateKey}
              </div>
            </div>
            <Button onClick={() =>  navigate('/send')}>Continue</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WalletInfo;
