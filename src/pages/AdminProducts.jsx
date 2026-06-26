import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const API_URL = "https://localhost:7107/api/Product";

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const response = await axios.get(API_URL);

      setProducts(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to load products");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Product Deleted Successfully");

      loadProducts();
    } catch (error) {
      console.log(error);

      alert("Failed To Delete Product");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>

        <button
          className="btn btn-success"
          onClick={() => navigate("/admin/add-product")}
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT TABLE */}
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              <td>
                <img
                  src={
                    product.media?.imageUrl || "https://via.placeholder.com/80"
                  }
                  alt={product.title}
                  width="80"
                  height="80"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </td>

              <td>{product.title}</td>

              <td>{product.brand}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product.id)}
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

export default AdminProducts;
