import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCart } from "../Services/cartService";
import { saveAddress, getAddress } from "../Services/addressService";

function OrderSummary() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    loadCart();

    loadAddress();
  }, []);

  // LOAD CART
  const loadCart = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) {
        navigate("/login");

        return;
      }

      const data = await getUserCart(currentUser.email);

      setCartItems(data);
    } catch (error) {
      console.log(error);

      alert("Failed to load cart");
    }
  };

  // LOAD ADDRESS
  const loadAddress = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) return;

      const data = await getAddress(currentUser.email);

      if (data) {
        setAddress({
          fullName: data.fullName || "",
          phone: data.phone || "",
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const gstRate = 0.18;
  const gstAmount = grandTotal * gstRate;
  const deliveryCharge = grandTotal > 999 ? 0 : 49;
  const payableTotal = grandTotal + gstAmount + deliveryCharge;

  // CONTINUE TO PAYMENT
  const handleContinue = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill all address fields");

      return;
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      await saveAddress({
        userEmail: currentUser.email,

        fullName: address.fullName,

        phone: address.phone,

        street: address.street,

        city: address.city,

        state: address.state,

        pincode: address.pincode,
      });

      localStorage.setItem("shippingAddress", JSON.stringify(address));

      navigate("/payment");
    } catch (error) {
      console.log(error);

      alert("Failed to save address");
    }
  };

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12">
            <div className="bg-white rounded-4 shadow-sm p-4">
              <h1 className="mb-3">Order Summary</h1>
              <p className="text-muted mb-0">
                Review your details and continue to payment.
              </p>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card rounded-4 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">Delivery Address</h4>

                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter full name"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter mobile number"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Street Address</label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="3"
                    placeholder="House No, Street, Area"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        street: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">City</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">State</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Pincode</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="card rounded-4 shadow-sm mb-3">
                <div className="row g-0 align-items-center">
                  <div className="col-auto p-3">
                    <div className="bg-light rounded-4 d-flex align-items-center justify-content-center" style={{ width: "150px", height: "150px" }}>
                      <img
                        src={item.imageUrl}
                        alt={item.productTitle}
                        className="img-fluid"
                        style={{ maxHeight: "140px" }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="card-body py-4">
                      <h5 className="card-title mb-2">{item.productTitle}</h5>
                      <p className="mb-2 text-muted">
                        Quantity: <strong>{item.quantity}</strong>
                      </p>
                      <h5 className="mb-0">₹{(item.price * item.quantity).toFixed(2)}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card rounded-4 shadow-sm sticky-top" style={{ top: "20px" }}>
              <div className="card-body">
                <h4 className="card-title mb-4">Price Details</h4>

                <div className="row gx-0 mb-2">
                  <div className="col-8 text-muted">Price ({cartItems.length} items)</div>
                  <div className="col-4 text-end">₹{grandTotal.toFixed(2)}</div>
                </div>

                <div className="row gx-0 mb-2">
                  <div className="col-8 text-muted">GST @ 18%</div>
                  <div className="col-4 text-end">₹{gstAmount.toFixed(2)}</div>
                </div>

                <div className="row gx-0 mb-3">
                  <div className="col-8 text-muted">Delivery Charges</div>
                  <div className="col-4 text-end">{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge.toFixed(2)}`}</div>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-semibold">Total Payable</span>
                  <strong>₹{payableTotal.toFixed(2)}</strong>
                </div>

                <div className="mb-3">
                  <small className="text-success">
                    {deliveryCharge === 0 ? "You have free delivery!" : "Add more products for free delivery."}
                  </small>
                </div>

                <div className="d-grid">
                  <button className="btn btn-warning btn-lg fw-semibold" onClick={handleContinue}>
                    Continue To Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
