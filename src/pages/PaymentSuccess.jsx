import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const txnId = searchParams.get("txn");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>✅ Payment Successful!</h2>
      <p>Transaction ID: {txnId}</p>
      <a href="/">Go to Home</a>
    </div>
  );
};

export default PaymentSuccess;
