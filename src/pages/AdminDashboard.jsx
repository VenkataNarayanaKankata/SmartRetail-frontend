import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import DashboardCard from "../Components/Admin/DashboardCard";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaTags ,
  FaHome
} from "react-icons/fa";
import { getDashboardStats } from "../Services/dashboardService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
     totalCategories: 0,
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
  <AdminLayout>
    <div className="container-fluid">
      {/* HEADER */}
      <div className="mb-4">
<div className="admin-breadcrumb">
  <FaHome className="me-2" />
  Home / Dashboard
</div>

  <Header title="Dashboard" />
</div>

      {/* DASHBOARD CARDS */}
   <div className="row g-4">

  <div className="col">
    <DashboardCard
      title="Users"
      value={stats.totalUsers}
      icon={<FaUsers color="#7c3aed" />}
      iconBg="#f3e8ff"
    />
  </div>

  <div className="col">
    <DashboardCard
      title="Categories"
      value={stats.totalCategories}
      icon={<FaTags color="#f59e0b" />}
      iconBg="#fef3c7"
    />
  </div>

  <div className="col">
    <DashboardCard
      title="Products"
      value={stats.totalProducts}
      icon={<FaBoxOpen color="#2563eb" />}
      iconBg="#dbeafe"
    />
  </div>

  <div className="col">
    <DashboardCard
      title="Orders"
      value={stats.totalOrders}
      icon={<FaShoppingCart color="#ea580c" />}
      iconBg="#ffedd5"
    />
  </div>

  <div className="col">
    <DashboardCard
      title="Revenue"
      value={`₹${stats.totalRevenue}`}
      icon={<FaRupeeSign color="#16a34a" />}
      iconBg="#dcfce7"
    />
  </div>
  <div className="row mt-4">

  {/* Recent Orders */}
  <div className="col-lg-6 mb-4">
    <div className="dashboard-section">

      <div className="section-header">
        <h5>Recent Orders</h5>

        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => navigate("/admin/orders")}
        >
          View All
        </button>
      </div>

      <div className="empty-section">
        No Orders Yet
      </div>

    </div>
  </div>

  {/* Recent Products */}
  <div className="col-lg-6 mb-4">
    <div className="dashboard-section">

      <div className="section-header">
        <h5>Recent Products</h5>

        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => navigate("/admin/products")}
        >
          View All
        </button>
      </div>

      <div className="empty-section">
        No Products Yet
      </div>

    </div>
  </div>

</div>

</div>

      </div>
  </AdminLayout>
);
}

export default AdminDashboard;
