import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { ThemeContext } from "../Context/Themecontext";

import {
  FaShoppingCart,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaSearch,
} from "react-icons/fa";

import { getUserCart } from "../Services/cartService";

function Navbar({
  search,
  setSearch,
  handleSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [cartCount, setCartCount] = useState(0);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // LOAD CART COUNT
  useEffect(() => {
    loadCartCount();
  }, [location.pathname]);

  const loadCartCount = async () => {
    try {
      if (!currentUser) {
        setCartCount(0);

        return;
      }

      const cartItems = await getUserCart(currentUser.email);

      // COUNT PRODUCTS ONLY
      setCartCount(cartItems.length);
    } catch (error) {
      console.log(error);

      setCartCount(0);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");

    window.location.reload();
  };

  return (
   <nav
  className={`navbar navbar-expand-lg sticky-top shadow-sm py-3 ${
    theme === "dark" ? "bg-dark navbar-dark" : "bg-white navbar-light"
  }`}
>
  <div className="container-fluid px-4">

    {/* LOGO */}
    <div
      className="d-flex align-items-center me-4"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/home")}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "45px",
          height: "45px",
          background: "#2563eb",
          borderRadius: "12px",
          color: "#fff",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        S
      </div>

      <div className="ms-2">
        <h5 className="mb-0 fw-bold">SmartRetail</h5>
        <small className="text-muted">Shop Smart</small>
      </div>
    </div>

    {/* SEARCH SECTION */}
    <div className="d-flex align-items-center flex-grow-1 mx-3">

      <div
        className="d-flex align-items-center border bg-light px-3"
        style={{
          borderRadius: "12px",
          height: "50px",
          width: "100%",
          maxWidth: "550px",
        }}
      >
        <FaSearch className="text-secondary" />

        <input
          type="text"
          className="form-control border-0 bg-light shadow-none ms-2"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary ms-2 px-4"
        onClick={handleSearch}
      >
        Search
      </button>

      <select
        className="form-select ms-3"
        style={{ width: "180px" }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
      </select>

      <select
        className="form-select ms-2"
        style={{ width: "180px" }}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="lowToHigh">Price Low → High</option>
        <option value="highToLow">Price High → Low</option>
        <option value="rating">Highest Rated</option>
        <option value="name">Name A → Z</option>
      </select>
    </div>

    {/* RIGHT SECTION */}
    <div className="d-flex align-items-center">

      {/* ORDERS */}
      {currentUser && currentUser.role !== "Admin" && (
        <Link
          to="/my-orders"
          className="text-decoration-none me-4 fw-semibold"
        >
          Orders
        </Link>
      )}

      {/* WISHLIST */}
      <Link
        to="/wishlist"
        className={`text-decoration-none me-4 fw-semibold ${
          theme === "dark" ? "text-white" : "text-dark"
        }`}
      >
        ❤️ Wishlist
      </Link>

      {/* CART */}
      {currentUser && (
        <Link
          to="/cart"
          className={`position-relative me-4 ${
            theme === "dark" ? "text-white" : "text-dark"
          }`}
        >
          <FaShoppingCart size={24} />

          {cartCount > 0 && (
            <span
              className="position-absolute badge rounded-pill bg-danger"
              style={{
                top: "-10px",
                right: "-12px",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      )}

      {/* USER */}
     {currentUser && (
  <Link
    to="/profile"
    className={`text-decoration-none me-4 ${
      theme === "dark" ? "text-white" : "text-dark"
    }`}
  >
    <FaUserCircle
      size={30}
      style={{
        cursor: "pointer",
      }}
    />
  </Link>
)}

      {/* THEME */}
      <button
        className={`btn me-2 ${
          theme === "dark"
            ? "btn-outline-light"
            : "btn-outline-dark"
        }`}
        onClick={toggleTheme}
        style={{
          borderRadius: "12px",
        }}
      >
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>

      {/* LOGIN / LOGOUT */}
      {currentUser ? (
        <button
          className="btn btn-danger rounded-pill px-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="btn btn-primary rounded-pill px-4"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  </div>
</nav>
  );
}

export default Navbar;
