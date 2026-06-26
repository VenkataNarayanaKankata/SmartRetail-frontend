import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getUserCart, deleteCartItem } from "../Services/cartService";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await deleteCartItem(id);

      loadCart();
    } catch (error) {
      console.log(error);

      alert("Failed to delete item");
    }
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mt-5">
      {/* BREADCRUMB */}

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/home" className="text-decoration-none">
              Home
            </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>

      <h1 className="mb-4">Cart Items</h1>

      {cartItems.length === 0 ? (
        <h3>No Items In Cart</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-4 p-4 shadow-sm">
              <div className="row align-items-center">
                {/* IMAGE */}

                <div className="col-md-3 text-center">
                  <img
                    src={item.media?.imageUrl}
                    alt={item.productTitle}
                    className="img-fluid"
                    style={{
                      height: "180px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* DETAILS */}

                <div className="col-md-7">
                  <h2>{item.productTitle}</h2>

                  <h3 className="my-3">₹{item.price}</h3>

                  <h5 className="mt-4">Quantity: {item.quantity}</h5>

                  <h4 className="mt-2 text-success">
                    Total Cost: ₹{(item.price * item.quantity).toFixed(2)}
                  </h4>
                </div>

                {/* REMOVE BUTTON */}

                <div className="col-md-2 text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* TOTAL SECTION */}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn fw-bold"
              onClick={() => navigate("/order-summary")}
              style={{
                background: "#facc15",
                color: "#000",
                padding: "12px 28px",
                fontSize: "20px",
                borderRadius: "12px",
                border: "none",
              }}
            >
              Proceed To Checkout
            </button>

            <h1
              style={{
                fontWeight: "700",
              }}
            >
              Grand Total: ₹{grandTotal.toFixed(2)}
            </h1>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
