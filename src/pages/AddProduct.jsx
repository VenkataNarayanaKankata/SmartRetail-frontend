import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    sku: "",
    weight: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://localhost:7107/api/Product", product);

      alert("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Product");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Title</label>

              <input
                type="text"
                name="title"
                className="form-control"
                value={product.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Brand</label>

              <input
                type="text"
                name="brand"
                className="form-control"
                value={product.brand}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>

              <input
                type="text"
                name="category"
                className="form-control"
                value={product.category}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>

              <input
                type="number"
                name="price"
                className="form-control"
                value={product.price}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Stock</label>

              <input
                type="number"
                name="stock"
                className="form-control"
                value={product.stock}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Rating</label>

              <input
                type="number"
                step="0.1"
                name="rating"
                className="form-control"
                value={product.rating}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Discount Percentage</label>

              <input
                type="number"
                name="discountPercentage"
                className="form-control"
                value={product.discountPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">SKU</label>

              <input
                type="text"
                name="sku"
                className="form-control"
                value={product.sku}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Weight</label>

              <input
                type="number"
                name="weight"
                className="form-control"
                value={product.weight}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Availability Status</label>

              <input
                type="text"
                name="availabilityStatus"
                className="form-control"
                value={product.availabilityStatus}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Description</label>

              <textarea
                rows="4"
                name="description"
                className="form-control"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Warranty Information</label>

              <input
                type="text"
                name="warrantyInformation"
                className="form-control"
                value={product.warrantyInformation}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Shipping Information</label>

              <input
                type="text"
                name="shippingInformation"
                className="form-control"
                value={product.shippingInformation}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success me-2">
            Save Product
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
