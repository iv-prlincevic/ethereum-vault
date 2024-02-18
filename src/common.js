import Web3 from "web3";
let web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://sepolia.infura.io/v3/cef029aefdf14e77a9b822c7b2c7e3a3"
    )
  );
export default web3;
  
  
  