import "./App.css";
import getBlockChain from "./ethereum.js";
import React, { useState, useEffect } from "react";
import Store from "./Store.js";
function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai, setDai] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, di } = await getBlockChain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    };
  }, []);
  if (typeof window.ethereum === "undefined") {
    return (
      <div className="container">
        <div className="col-sm=12">
          <h1>BlockChain Ecommerce App</h1>
          <p>Please install MetaMask</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="col-sm=12">
        <p>Hello world</p>
        <Store paymentProcessor={paymentProcessor} dai={dai} />
      </div>
    </div>
  );
}

export default App;
