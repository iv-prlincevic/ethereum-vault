import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import ls from "local-storage";
import axios from "axios";
import moment from "moment";

import web3 from "../common";

const TransactionHistory = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      await axios
        .get(
          "https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=" +
            ls.get("publicAddress") +
            "&startblock=0&endblock=99999999&sort=asc&apikey=F2SHXT4AW1EY11ZIKXWEH49EHTMTYDZV2U"
        )
        .then((response) => {
          setTransactions([...response.data.result]);
        });
    };
    getTransactions();
  }, []);

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
        <Card.Body>
          {transactions.length !== 0 ? (
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
                    {transactions.map((tx, index) => (
                      <tr key={index}>
                        <td>{tx.from}</td>
                        <td>{tx.to}</td>
                        <td>
                          {moment.unix(tx.timeStamp).format("DD/MM/YYYY HH:mm")}
                        </td>
                        <td>
                          {tx.value
                            ? web3.utils.fromWei(tx.value, "ether")
                            : ""}
                        </td>
                        <td>{tx.gas}</td>
                        <td className="text-truncate">
                          <a
                            className="tx-hash-link"
                            href={"https://rinkeby.etherscan.io/tx/" + tx.hash}
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
};

export default TransactionHistory;
