import axios from 'axios';
import React, { useState, onEffect } from "react";
import { BASE_URL } from '../utils/constants';

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false)

  // on page load also it should check
  onEffect(() => {
    verifyPayment();
  },[])
  
  const verifyPayment = async() => {
    try {
      const response = await axios.get(BASE_URL + "/payment/status", {}, { withCredentials: true })
      if (response.data.isPremium) {
        setIsUserPremium(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateOrder = async (type) => {
    try {
      const response = await axios.post(BASE_URL + "/payment/create", { type }, { withCredentials: true });
      console.log(response) // has the details ;ie the options tag.

      const {amount,currency,orderId,notes} = response.data

      const options = {
        key: response.keyId,
        amount: amount,
        currency: currency,
        name: "Dev Tinder",
        description: "Test Transaction",
        order_id:orderId,
        prefill: {
          name: notes.firstName+" "+notes.lastName,
          email: notes.email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254", // color in which razorpay opens in.
        },
        handler : verifyPayment // api to check if payment is verified
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err)
    }
  }
  return (
    isUserPremium ?  "You are a premium user " :
    <div className="flex w-full flex-col lg:flex-row mt-20">
      <div className="card bg-base-300 rounded-box grid h-52 grow place-items-center m-3.5">
        <h1 className="font-bold text-xl">Silver Membership</h1>
        <ul>
          <li>• Blue Ticks</li>
          <li>• 30 requests per day</li>
          <li>• Can chat with other users</li>
          <li>• Valid for 3 months</li>
        </ul>
        <button
          onclick={() => handleCreateOrder("gold")}
          className="btn btn-primary mt-2"
        >
          Upgrade to Silver
        </button>
      </div>
      <div className="card bg-base-300 rounded-box grid h-52 grow place-items-center m-3.5">
        <h1 className="font-bold text-xl">Gold Membership</h1>
        <ul>
          <li>• Blue Ticks</li>
          <li>• 70 requests per day</li>
          <li>• Can chat with other users</li>
          <li>• Valid for 6 months</li>
        </ul>
        <button
          onclick={() => handleCreateOrder("gold")}
          className="btn btn-secondary mt-2"
        >
          Upgrade to Gold
        </button>
      </div>
    </div>
  );
}

export default Premium