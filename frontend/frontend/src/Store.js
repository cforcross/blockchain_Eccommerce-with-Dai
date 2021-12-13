import React from "react";
import { ethers } from "ethers";
import axios from "axios";
import { Button } from "bootstrap";

const API_UR = "http://localhost:4000";
const ITEMS = [
  { id: 1, price: ethers.utils.parseEther("100") },
  { id: 2, price: ethers.utils.parseEther("200") },
];

function Store({ paymentProcessor, dail }) {
  const buy = async (item) => {
    const respnse = await axios.get(`${API_UR}/api/getPayment/${item.id}`);
    const tx1 = await dai.approve(paymentProcessor.address, item.price);
    await tx1.wait();

    const tx2 = await paymentProcessor.pay(item.id, respnse.data, pymentId);
    await tx2.wait();
  };
}

return (
  <ul className="list-group">
    <li className="list-group-item">
      Buy item - <span className="front-weight-bold">100 Dai</span>
      <button
        type="button"
        className="btn btn-primary float-right"
        onClick={() => buy(ITEMS[0])}
      >
        Buy
      </button>
    </li>
    <li className="list-group-item">
      Buy item - <span className="front-weight-bold">100 Dai</span>
      <button
        type="button"
        className="btn btn-primary float-left"
        onClick={() => buy(ITEMS[1])}
      >
        Buy
      </button>
    </li>
  </ul>
);

export default Store;
