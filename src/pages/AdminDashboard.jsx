import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../Services/dashboardService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);

      alert("Failed To Load Dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">
            <h5>Total Users</h5>

            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">
            <h5>Total Products</h5>

            <h2>{stats.totalProducts}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">
            <h5>Total Orders</h5>

            <h2>{stats.totalOrders}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow p-4 text-center">
            <h5>Total Revenue</h5>

            <h2>₹{stats.totalRevenue}</h2>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/admin/products")}
        >
          Manage Products
        </button>

        <button
          className="btn btn-warning ms-2"
          onClick={() => navigate("/admin/orders")}
        >
          Manage Orders
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
