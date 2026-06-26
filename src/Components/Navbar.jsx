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
      className={`navbar navbar-expand-lg shadow-sm py-3 ${
        theme === "dark" ? "bg-dark navbar-dark" : "bg-white navbar-light"
      }`}
    >
      <div className="container-fluid px-4">
        {/* LOGO */}
        <div
          className="d-flex align-items-center px-4 py-2 me-4"
          style={{
            backgroundColor: "#ffe500",
            borderRadius: "12px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        >
          <span
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#2874f0",
              marginRight: "8px",
            }}
          >
            S
          </span>

          <span
            style={{
              fontWeight: "700",
              fontSize: "22px",
            }}
          >
            My Store
          </span>
        </div>

        {/* SEARCH */}
        <div className="d-flex align-items-center flex-grow-1 me-4">
          <div
            className="d-flex align-items-center bg-light px-3"
            style={{
              borderRadius: "12px",
              height: "50px",
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <FaSearch className="text-secondary" size={18} />

            <input
              type="text"
              placeholder="Search products..."
              className="form-control border-0 bg-light shadow-none ms-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn btn-primary ms-3 px-4" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          <select
            className="form-select ms-3"
            style={{ width: "200px" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>

            <option value="beauty">Beauty</option>

            <option value="fragrances">Fragrances</option>

            <option value="furniture">Furniture</option>

            <option value="groceries">Groceries</option>
          </select>
        </div>
        <div>
          <select
            className="form-select ms-2"
            style={{ width: "200px" }}
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

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center">
          {currentUser && (
            <Link
              to="/cart"
              className={`d-flex align-items-center text-decoration-none me-4 ${
                theme === "dark" ? "text-white" : "text-dark"
              }`}
            >
              <FaShoppingCart size={22} />

              <span className="ms-2 fw-semibold">Cart ({cartCount})</span>
            </Link>
          )}

          {/* USER EMAIL */}
          {currentUser && (
            <div className="d-flex align-items-center me-4">
              <FaUserCircle size={22} />

              <h6 className="mb-0 ms-2">{currentUser.email}</h6>
            </div>
          )}
          {currentUser && currentUser.role !== "Admin" && (
            <Link to="/my-orders" className="text-decoration-none me-4">
              My Orders
            </Link>
          )}
          <Link to="/wishlist" className="nav-link">
            ❤️ Wishlist
          </Link>

          {/* LOGIN / LOGOUT */}
          {currentUser ? (
            <button
              className="btn btn-danger rounded-pill px-4 me-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-primary rounded-pill px-4 me-3"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* THEME */}
          <button
            className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`}
            onClick={toggleTheme}
            style={{
              width: "45px",
              height: "45px",
            }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
