import React, { useRef, useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import ls from "local-storage";
import { QRCodeSVG } from "qrcode.react";

const Receive = (props) => {
  const [show, setShow] = useState(false);
  const [, setClose] = useState(false);
  const [publicAddress] = useState(ls.get("publicAddress"));
  const [addressError, setAddressError] = useState("");
  const withdrawAddress = useRef("");

  const saveWithdrawAddress = () => {
    ls.set("withdrawAddress", withdrawAddress.current.value);
    setShow(false);
  };

  const validate = (e) => {
    e.preventDefault();
    let addressError = "";

    if (!withdrawAddress.current.value) {
      addressError = "Please enter withdraw address";
      setAddressError(addressError);
      setClose(false);
      return false;
    }

    setAddressError("");
    setClose(true);
    saveWithdrawAddress();
    return true;
  };

  const ShowModal = () => {
    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          Save withdraw address
        </Button>
        <Modal show={show} animation={true} size="md">
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
                ref={withdrawAddress}
              />
              <div style={{ color: "red" }}>{addressError}</div>
            </Form>
            <br />
          </Modal.Body>
          <Modal.Footer className="py-1 d-flex justify-content-center">
            <div>
              <Button onClick={() => setShow(false)}>Cancel</Button>
            </div>
            <div>
              <Button onClick={validate} className="mx-2 px-3">
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

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
          <div style={{ margin: "30px", padding: "20px" }}>
            <QRCodeSVG value={publicAddress} />

            <div style={{ fontSize: "18px", margin: "10px", color: "#fff" }}>
              Your public address: {publicAddress}
            </div>
          </div>
          <ShowModal />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Receive;
