import React from "react";

const PaymentFailed = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>❌ Payment Failed</h2>
      <p>Oops! Something went wrong. Please try again.</p>
      <a href="/">Go to Home</a>
    </div>
  );
};

export default PaymentFailed;
