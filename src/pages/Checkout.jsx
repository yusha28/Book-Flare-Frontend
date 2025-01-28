import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import KhaltiCheckout from "khalti-checkout-web"; // ✅ Import Khalti SDK
import "./Checkout.css"; // Import CSS for styling

const Checkout = () => {
  const { cartItems, calculateSubtotal } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validate shipping information
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zip
    ) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    console.log("Shipping Info Saved:", shippingInfo);
  };

  const shippingCost = 100;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  // ✅ Khalti Sandbox Payment Configuration
  const khaltiConfig = {
    publicKey: "test_public_key_6t6bsmfjpm0j0u9", // ✅ Use Khalti Test Key
    productIdentity: "123456",
    productName: "Demo Book Purchase",
    productUrl: "http://yourwebsite.com",
    eventHandler: {
      onSuccess(payload) {
        console.log("Demo Payment Successful!", payload);
        alert("Demo Payment Successful! Transaction ID: " + payload.idx);
      },
      onError(error) {
        console.error("Demo Payment Failed!", error);
        alert("Demo Payment Failed. Please try again.");
      },
      onClose() {
        console.log("Demo Payment Window Closed");
      },
    },
    paymentPreference: ["KHALTI"],
  };

  // ✅ Function to Trigger Khalti Payment
  const handleKhaltiPayment = () => {
    // Ensure shipping info is saved before proceeding
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zip
    ) {
      setError("Please fill out shipping information before proceeding.");
      return;
    }

    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: total * 100 }); // Khalti uses paisa (100 NPR = 10000 paisa)
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* Shipping Information Section */}
        <div className="shipping-container">
          <h2>Shipping Information</h2>
          {error && <p className="error-message">{error}</p>}
          <form>
            <div className="input-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={shippingInfo.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={shippingInfo.lastName}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              className="full-width"
            />
            <div className="input-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingInfo.city}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingInfo.state}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={shippingInfo.zip}
                onChange={handleInputChange}
              />
            </div>
            <div className="buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShippingInfo({})}
              >
                Cancel
              </button>
              <button type="button" className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Billing Information Section */}
        <div className="billing-container">
          <h2>Billing Information</h2>
          <input
            type="text"
            value="Durbar Marg, Kathmandu"
            className="billing-address"
            readOnly
          />

          <div className="cost-summary">
            <p className="cost-row">
              Subtotal: <span>{subtotal.toFixed(2)} NPR</span>
            </p>
            <p className="cost-row">
              Shipping: <span>{shippingCost.toFixed(2)} NPR</span>
            </p>
            <p className="cost-row total">
              Total: <span>{total.toFixed(2)} NPR</span>
            </p>
          </div>

          {/* ✅ Khalti Payment Button */}
          <button className="pay-btn" onClick={handleKhaltiPayment}>
            Pay via Khalti (Demo)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
