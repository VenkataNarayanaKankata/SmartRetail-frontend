import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBoxes,
  FaList,
  FaLayerGroup,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <h4>SmartRetail</h4>
        <small>Administrator</small>
      </div>

      {/* MAIN */}
      <div className="sidebar-section">
        <p className="sidebar-title">MAIN</p>

        <NavLink to="/admin" className="sidebar-link">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/orders" className="sidebar-link">
          <FaShoppingCart />
          <span>Orders</span>
        </NavLink>
      </div>

     {/* CATALOGUE */}
<div className="sidebar-section">
  <p className="sidebar-title">CATALOGUE</p>

  <NavLink
    to="/admin/categories"
    className="sidebar-link"
  >
    <FaList />
    <span>Categories</span>
  </NavLink>

  <NavLink
    to="/admin/subcategories"
    className="sidebar-link"
  >
    <FaLayerGroup />
    <span>Sub Categories</span>
  </NavLink>

  <NavLink
    to="/admin/products"
    className="sidebar-link"
  >
    <FaBoxes />
    <span>Products</span>
  </NavLink>
</div>

      {/* PEOPLE */}
      <div className="sidebar-section">
        <p className="sidebar-title">PEOPLE</p>

        <NavLink to="/admin/users" className="sidebar-link">
          <FaUsers />
          <span>Users</span>
        </NavLink>
      </div>

      {/* LOGOUT */}
      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;