import React from "react";

const ESewaButton = ({ amount, transactionId }) => {
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/esewa/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total_amount: amount,
          transaction_uuid: transactionId,
          product_code: "EPAYTEST",
        }),
      });

      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        console.error("Payment initiation failed:", data);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <button onClick={handlePayment} style={{ backgroundColor: "green", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
      Pay via eSewa (Demo)
    </button>
  );
};

export default ESewaButton;
