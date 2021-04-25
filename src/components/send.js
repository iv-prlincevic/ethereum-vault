import Web3 from "web3";
import React from "react";
import { Button, Card, Modal, Form, Nav } from "react-bootstrap";
import ls from "local-storage";
import history from "../history";

let web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/032016e8ed9d48759a11bae809058fe5"
  )
);

export default class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      close: false,
      reciever: ls.get("withdrawAddress"),
      publicAddress: this.props.history.location.state.publicAddress,
      privateKey: this.props.history.location.state.privateKey,
      balance: 0,
      amount: 0,
      amountError: "",
      recieverError: "",
      successfullySent: "",
    };
    this.sendETH = this.sendETH.bind(this);
    this.handleRecieverChange = this.handleRecieverChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.seeValue = this.seeValue.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.showModal = this.showModal.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    this.getBalance();
  }

  getBalance = async () => {
    await web3.eth.getBalance(this.state.publicAddress).then((balance) => {
      this.setState({ balance: web3.utils.fromWei(balance, "ether") });
    });
  };

  handleRecieverChange(event) {
    this.setState({ reciever: event.target.value });
  }
  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  seeValue() {
    console.log("amount is" + this.state.amount);
    console.log("reciever is" + this.state.reciever);
  }

  validate = (e) => {
    e.preventDefault();

    let amountError = "";
    let recieverError = "";

    if (this.state.amount > this.state.balance) {
      amountError = "Insufficient funds";
    }
    if (this.state.amount === 0) {
      amountError = "Your amount must be bigger than 0";
    }
    if (!this.state.reciever) {
      recieverError = "Please enter reciever address";
    }
    if (amountError || recieverError) {
      this.setState({ amountError, recieverError, show: false });
      return false;
    }

    this.setState({ recieverError: "", amountError: "", show: true });
    return true;
  };

  sendETH = async () => {
    try {
      const transaction = await web3.eth.accounts.signTransaction(
        {
          from: this.state.publicAddress,
          to: this.state.reciever,
          value: web3.utils.toWei(this.state.amount, "ether"),
          gas: "55000",
          gasPrice: web3.eth.gasPrice,
        },
        this.state.privateKey
      );

      await web3.eth
        .sendSignedTransaction(transaction.rawTransaction)
        .then(() => {
          this.setState({
            show: false,
            successfullySent: "Transaction successfully sent",
          });
          this.getBalance();
        });
    } catch (error) {
      console.log(error);
    }
  };
  showModal() {
    return (
      <>
        <Button variant="primary" onClick={this.validate}>
          Confirm transaction
        </Button>
        <Modal show={this.state.show} animation={true} size="md" shadow-lg>
          <Modal.Header>
            <Modal.Title className="text-center">
              <h5>Confirmation</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to send transaction</p>
          </Modal.Body>
          <Modal.Footer className="py-1 d-flex justify-content-center">
            <div>
              <Button onClick={() => this.setState({ show: false })}>
                Cancel
              </Button>
            </div>
            <div>
              <Button onClick={this.sendETH} className="mx-2 px-3">
                Confirm
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
              defaultActiveKey="/send"
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
            <Form onSubmit={this.validate}>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control readOnly value={this.state.publicAddress} />
                <br></br>
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  name="reciever"
                  value={this.state.reciever}
                  onChange={this.handleRecieverChange}
                  placeholder="Receiver address"
                />
                <div style={{ color: "red" }}>{this.state.recieverError}</div>
                <br></br>
                <Form.Label>Amount</Form.Label>
                <Form.Text className="text-muted">
                  Available amount: {this.state.balance} ETH
                </Form.Text>
                <Form.Control
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleAmountChange}
                  placeholder="Enter amount"
                />
                <div style={{ color: "red" }}>{this.state.amountError}</div>
                <br></br>
                <div style={{ color: "palegreen" }}>
                  {this.state.successfullySent}
                </div>
              </Form.Group>
            </Form>

            <this.showModal></this.showModal>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
