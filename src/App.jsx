import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./Context/Themecontext";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";
import Wishlist from "./pages/Wishlist";

import AdminProducts from "./pages/AdminProducts";
import Navbar from "./Components/Navbar";
import ProductDetails from "./Components/Productdetails";
import OrderSummary from "./pages/OrderSummary";
import Payment from "./pages/Payment";
import ProtectedRoute, { AdminRoute } from "./Components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { getProducts } from "./Services/productService";

function App() {
  const { theme } = useContext(ThemeContext);
  const [category, setCategory] = useState("All");

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");

  const location = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const showNavbar =
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/admin";
  // LOAD PRODUCTS
  useEffect(() => {
    loadProducts();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [category, sortBy]);

  // GET PRODUCTS FROM BACKEND
  const loadProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);

      alert("Failed to load products");
    }
  };
  const handleSearch = () => {
    let result = [...products];

    // SEARCH
    if (search.trim() !== "") {
      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(search.toLowerCase()) ||
          product.brand?.toLowerCase().includes(search.toLowerCase()) ||
          product.category?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY
    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    // SORTING
    if (sortBy === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
  };
  return (
    <div
      className={
        theme === "dark"
          ? "bg-dark text-white min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >
      {showNavbar && (
        <Navbar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home products={filteredProducts} />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* SIGNUP */}
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home products={filteredProducts} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails products={products} />
            </ProtectedRoute>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ORDER SUMMARY */}
        <Route
          path="/order-summary"
          element={
            <ProtectedRoute>
              <OrderSummary />
            </ProtectedRoute>
          }
        />

        {/* PAYMENT */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
