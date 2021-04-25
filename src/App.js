import "./App.css";
import Wallet from "./components/createWallet";
import WalletInfo from "./components/wallet-info";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Send from "./components/send";
import transactionHistory from "./components/transactionHistory";
import Recieve from "./components/receive";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Wallet} />
          <Route path="/receive" component={Recieve} />
          <Route path="/wallet-info" component={WalletInfo} />
          <Route path="/send" component={Send} />
          <Route path="/transaction-history" component={transactionHistory} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
