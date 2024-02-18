import "./App.css";
import Wallet from "./components/createWallet";
import WalletInfo from "./components/wallet-info";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Send from "./components/send";
import TransactionHistory from "./components/transactionHistory";
import Receive from "./components/receive";
import NavBar from "./components/navigationBar";
import PriceChart from "./components/priceChart";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter >
        <NavBar />
        <Routes>
          <Route path="/" element={<Wallet />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/wallet-info" element={<WalletInfo />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/price-history" element={<PriceChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
