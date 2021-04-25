import React from "react";
import { Button, Card, Modal, Form, Nav } from "react-bootstrap";
import ls from "local-storage";
import history from "../history";
import QRCode from "qrcode.react";

export default class Recieve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      close: false,
      publicAddress: this.props.history.location.state.publicAddress,
      privateKey: this.props.history.location.state.privateKey,
      balance: this.props.history.location.state.balance,
      addressError: "",
      withdrawAddress: "",
    };
    this.saveWithdrawAddress = this.saveWithdrawAddress.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.validate = this.validate.bind(this);
  }

  saveWithdrawAddress = () => {
    ls.set("withdrawAddress", this.state.withdrawAddress);
    this.setState({ show: false });
  };
  handleAddressChange(event) {
    this.setState({ withdrawAddress: event.target.value });
  }

  validate = (e) => {
    e.preventDefault();

    let addressError = "";

    if (!this.state.withdrawAddress) {
      addressError = "Please enter withdraw address";
      this.setState({ addressError, close: false });
      return false;
    }

    this.setState({ addressError: "", close: true });
    this.saveWithdrawAddress();
    return true;
  };

  showModal() {
    return (
      <>
        <Button variant="primary" onClick={() => this.setState({ show: true })}>
          Save withdraw address
        </Button>
        <Modal show={this.state.show} animation={true} size="md" shadow-lg>
          <Modal.Header>
            <Modal.Title className="text-center">
              <h5>Save address</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Enter the address you wish to save</Form.Label>
              <Form.Control
                type="text"
                name="withdrawAddress"
                value={this.state.withdrawAddress}
                onChange={this.handleAddressChange}
              />
              <div style={{ color: "red" }}>{this.state.addressError}</div>
            </Form>
            <br />
          </Modal.Body>
          <Modal.Footer className="py-1 d-flex justify-content-center">
            <div>
              <Button onClick={() => this.setState({ show: false })}>
                Cancel
              </Button>
            </div>
            <div>
              <Button onClick={this.validate} className="mx-2 px-3">
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  render() {
    return (
      <div
        className="nav-menu"
        style={{
          display: "grid",
          gridTemplateColumns: "40%",
          justifyContent: "center",
        }}
      >
        <Card
          className="text-center"
          style={{
            margin: "20px",
          }}
        >
          <Card.Header>
            <Nav
              fill
              variant="tabs"
              onSelect={(key) =>
                history.push({
                  pathname: key,
                  state: {
                    publicAddress: this.state.publicAddress,
                    privateKey: this.state.privateKey,
                    balance: this.state.balance,
                  },
                })
              }
              defaultActiveKey="/receive"
            >
              <Nav.Item>
                <Nav.Link eventKey="/send">Send</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/receive" eventKey="/receive">
                  Receive
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/transaction-history">
                  Transactions
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <div style={{ margin: "30px", padding: "20px" }}>
              <QRCode value={this.state.publicAddress} id="canvas" />

              <div style={{ fontSize: "18px", margin: "10px", color: "#fff" }}>
                Your public address: {this.state.publicAddress}
              </div>
            </div>
            <this.showModal></this.showModal>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
