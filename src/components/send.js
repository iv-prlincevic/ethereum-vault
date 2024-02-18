import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Form, } from "react-bootstrap";
import ls from "local-storage";
import web3 from '../common';

const Send = (props) => {
   const [show, setShow] = useState(false);
   const [receiver, setReceiver] = useState(ls.get("withdrawAddress"));
   const [publicAddress,] = useState(ls.get('publicAddress'));
   const [privateKey,] =useState(ls.get('privateKey'));
   const [balance,setBalance] =  useState(0);
   const [amount, setAmount] = useState(0);
   const [amountError, setAmountError] = useState("");
   const [receiverError, setReceiverError] = useState("");
   const [successfullySent, setSuccessfullySent] = useState("");

   useEffect(() => {
     getBalance();
     });

    const getBalance = async () => {
      await web3.eth.getBalance(publicAddress).then((balance) => {
        setBalance(web3.utils.fromWei(balance, "ether"));
      });
    };
    const validate = (e) => {
      e.preventDefault();
  
      let amountError = "";
      let receiverError = "";
  
      if (amount > balance) {
        amountError = "Insufficient funds";
      }
      if (amount === 0) {
        amountError = "Your amount must be bigger than 0";
      }
      if (!receiver) {
        receiverError = "Please enter reciever address";
      } else if (!web3.utils.isAddress(receiver)){
        receiverError = "Please enter a valid receiver address";
      }
      if (amountError || receiverError) {
        setAmountError(amountError);
        setReceiverError(receiverError);
        setShow(false);
        return false;
      }

      setReceiverError("");
      setAmountError("");
      setShow(true);
  
      return true;
    };

    const sendETH = async () => {
      try {
        const transaction = await web3.eth.accounts.signTransaction(
          {
            from: publicAddress,
            to: receiver,
            value: web3.utils.toWei(amount, "ether"),
            gas: "55000",
            gasPrice: web3.eth.gasPrice,
          },
          privateKey
        );
  
        await web3.eth
          .sendSignedTransaction(transaction.rawTransaction)
          .then(() => {
            setShow(false);
            setSuccessfullySent('Transaction successfully sent');
            this.getBalance();
          }).finally(()=>{
            setTimeout(() => {
              setSuccessfullySent('');
            }, 5000);
            setAmount(0);
            setReceiver('');
          });

      } catch (error) {
        console.log(error);
      }
    };
  

    const ShowModal = () => {
      return (
        <>
          <Button variant="primary" onClick={validate}>
            Confirm transaction
          </Button>
          <Modal show={show} animation={true} size="md">
            <Modal.Header>
              <Modal.Title className="text-center">
                <h5>Confirmation</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to send this transaction:</p>
              <div>
               <p>To: <b>{receiver}</b></p> 
               <p>Amount: <b>{amount} ETH</b></p> 
              </div>
            </Modal.Body>
            <Modal.Footer className="py-1 d-flex justify-content-center">
              <div>
                <Button onClick={() => setShow(false)}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button onClick={sendETH} className="mx-2 px-3">
                  Confirm
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

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

          <Card.Body>
            <Form onSubmit={validate}>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control readOnly value={publicAddress} />
                <br></br>
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  name="reciever"
                  value={receiver || ""}
                  onChange={(e)=> setReceiver(e.target.value)}
                  placeholder="Receiver address"
                />
                <div style={{ color: "red" }}>{receiverError}</div>
                <br></br>
                <Form.Label>Amount</Form.Label>
                <Form.Text className="text-muted">
                  Available amount: {balance} ETH
                </Form.Text>
                <Form.Control
                  type="number"
                  name="amount"
                  value={amount || ""}
                  onChange={(e)=> {
                    if( e.target.value > balance) {
                      setAmount(e.target.value);
                      setAmountError('Insufficient funds');
                    } else{
                     setAmount(e.target.value);
                     setAmountError('');
                    }
                     
                   }}
                  placeholder="Enter amount"
                />
                <div style={{ color: "red" }}>{amountError}</div>
                <br></br>
                <div style={{ color: "palegreen" }}>
                  {successfullySent}
                </div>
              </Form.Group>
            </Form>

            <ShowModal></ShowModal>
          </Card.Body>
        </Card>
      </div>
  );
}

export default Send;