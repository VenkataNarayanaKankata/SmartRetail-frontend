import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const API_URL = "https://localhost:7107/api/Order";

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await axios.get(API_URL);

      setOrders(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed To Load Orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/status/${id}?status=${status}`);

      alert("Status Updated");

      loadOrders();
    } catch (error) {
      console.log(error);

      alert("Failed To Update Status");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Order Deleted");

      loadOrders();
    } catch (error) {
      console.log(error);

      alert("Failed To Delete Order");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Orders</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>

              <td>{order.userEmail}</td>

              <td>₹{order.totalAmount}</td>

              <td>
                <select
                  className="form-select"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option value="Placed">Placed</option>

                  <option value="Packed">Packed</option>

                  <option value="Shipped">Shipped</option>

                  <option value="Delivered">Delivered</option>

                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              <td>{order.paymentStatus}</td>

              <td>{new Date(order.orderDate).toLocaleDateString()}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
