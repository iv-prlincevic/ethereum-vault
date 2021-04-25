import Web3 from "web3";
import React from "react";
import { Card, Table, Nav } from "react-bootstrap";
import history from "../history";
import axios from "axios";
import moment from "moment";

let web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/032016e8ed9d48759a11bae809058fe5"
  )
);

export default class transactionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicAddress: this.props.history.location.state.publicAddress,
      privateKey: this.props.history.location.state.privateKey,
      balance: this.props.history.location.state.balance,

      transactions: [],
    };

    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions = async () => {
    await axios
      .get(
        "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" +
          this.state.publicAddress +
          "&startblock=0&endblock=99999999&sort=asc&apikey=1Z277GTU23UD8AW8ZE1NEGTQXESBZPX9QW"
      )
      .then((response) => {
        this.setState({ transactions: response.data.result });
      });
  };
  render() {
    return (
      <div
        className="nav-menu"
        style={{
          display: "flex",
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
              defaultActiveKey="/transaction-history"
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
            {this.state.transactions.length !== 0 ? (
              <>
                <div style={{ display: "inline-grid" }}>
                  <Table
                    className="table"
                    striped
                    bordered
                    variant="dark"
                    responsive
                    size="md"
                  >
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Gas</th>
                        <th>Hash</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.transactions.map((tx, index) => (
                        <tr>
                          <td>{tx.from}</td>
                          <td>{tx.to}</td>
                          <td>
                            {moment
                              .unix(tx.timeStamp)
                              .format("DD/MM/YYYY HH:mm")}
                          </td>
                          <td>{web3.utils.fromWei(tx.value, "ether")}</td>
                          <td>{tx.gas}</td>
                          <td className="text-truncate">
                            <a
                              className="tx-hash-link"
                              href={
                                "https://rinkeby.etherscan.io/tx/" + tx.hash
                              }
                            >
                              {tx.hash}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <div style={{ color: "#fff" }}>
                You don't have any transactions yet
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
