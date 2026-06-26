import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../Services/orderService";
import { makePayment } from "../Services/paymentService";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [expiryDate, setExpiryDate] = useState("");

  const [cvv, setCvv] = useState("");

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  const handlePayment = async () => {
    // UPI VALIDATION
    if (paymentMethod === "UPI") {
      if (!upiId || !upiId.includes("@")) {
        alert("Please enter a valid UPI ID");

        return;
      }
    }

    // CARD VALIDATION
    if (paymentMethod === "CARD") {
      if (cardNumber.length !== 16) {
        alert("Card Number must be 16 digits");

        return;
      }

      if (!expiryDate) {
        alert("Please enter expiry date");

        return;
      }

      if (cvv.length !== 3) {
        alert("CVV must be 3 digits");

        return;
      }
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      await makePayment({
        orderId: 0,

        userEmail: currentUser.email,

        paymentMethod: paymentMethod,

        amount: 2500,
      });

      await placeOrder({
        userEmail: currentUser.email,

        paymentMethod: paymentMethod,

        paymentStatus: "Success",

        shippingAddress: `${shippingAddress.fullName},
     ${shippingAddress.street},
     ${shippingAddress.city},
     ${shippingAddress.state},
     ${shippingAddress.pincode}`,
      });

      alert("Order Placed Successfully");

      localStorage.removeItem("shippingAddress");

      navigate("/home");
    } catch (error) {
      console.log(error);

      alert("Payment Failed");
    }
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <div
        className="card shadow border-0 mx-auto p-4"
        style={{
          maxWidth: "700px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center mb-4">Payment</h2>

        {/* ADDRESS */}

        <div className="alert alert-light border">
          <h5 className="mb-2">Delivery Address</h5>
          <strong>{shippingAddress?.fullName}</strong>
          <br />
          {shippingAddress?.street}
          <br />
          {shippingAddress?.city}, {shippingAddress?.state}
          <br />
          {shippingAddress?.pincode}
          <br />
          📞 {shippingAddress?.phone}
        </div>

        {/* PAYMENT OPTIONS */}

        <h5 className="mb-3">Select Payment Method</h5>

        <div className="form-check mb-2">
          <input
            type="radio"
            className="form-check-input"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />

          <label className="form-check-label">UPI</label>
        </div>

        <div className="form-check mb-2">
          <input
            type="radio"
            className="form-check-input"
            checked={paymentMethod === "CARD"}
            onChange={() => setPaymentMethod("CARD")}
          />

          <label className="form-check-label">Credit / Debit Card</label>
        </div>

        <div className="form-check mb-4">
          <input
            type="radio"
            className="form-check-input"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />

          <label className="form-check-label">Cash On Delivery</label>
        </div>

        {/* UPI */}

        {paymentMethod === "UPI" && (
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Example: venkat@paytm"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}

        {/* CARD */}

        {paymentMethod === "CARD" && (
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="1234567890123456"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            />

            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="CVV"
                  maxLength="3"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
          </>
        )}

        {/* COD */}

        {paymentMethod === "COD" && (
          <div className="alert alert-info">
            Pay when the order is delivered.
          </div>
        )}

        <button
          className="btn btn-success w-100 py-3 fw-bold"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
