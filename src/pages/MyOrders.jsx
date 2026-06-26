import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../Services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      const data = await getOrders(currentUser.email);

      setOrders(data);
    } catch (error) {
      console.log(error);

      alert("Failed To Load Orders");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      alert("Order Deleted Successfully");

      loadOrders();
    } catch (error) {
      console.log(error);

      alert("Failed To Delete Order");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card p-4 my-3 shadow-sm">
            <h4>Order #{order.id}</h4>

            <p>
              <strong>Amount:</strong> ₹{order.totalAmount}
            </p>

            <h5>
              Status:
              <span
                className={`ms-2 badge ${
                  order.status === "Delivered"
                    ? "bg-success"
                    : order.status === "Cancelled"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                }`}
              >
                {order.status}
              </span>
            </h5>
            <div className="mt-3">
              {order.status === "Placed" && "📦 Order Placed"}

              {order.status === "Processing" && "⚙️ Processing"}

              {order.status === "Shipped" && "🚚 Shipped"}

              {order.status === "Out For Delivery" && "🛵 Out For Delivery"}

              {order.status === "Delivered" && "✅ Delivered"}
            </div>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>

            <button
              className="btn btn-danger mt-2"
              onClick={() => handleDelete(order.id)}
            >
              Delete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
