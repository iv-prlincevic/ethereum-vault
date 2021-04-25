import React from "react";
import { Button, Card } from "react-bootstrap";
import history from "../history";

export default class WalletInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicAddress: this.props.history.location.state.publicAddress,
      privateKey: this.props.history.location.state.privateKey,
    };
  }

  goToSend = () => {
    history.push({
      pathname: "/send",
      state: {
        publicAddress: this.state.publicAddress,
        privateKey: this.state.privateKey,
      },
    });
  };

  render() {
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
                  {this.state.publicAddress}
                </div>
              </div>
              <div style={{ margin: "20px " }}>
                Private key{" "}
                <div style={{ margin: "5px", fontSize: "18px" }}>
                  {this.state.privateKey}
                </div>
              </div>
              <Button onClick={this.goToSend}>Continue</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
