import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();

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

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7107/api/Product/${id}`,
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed To Load Product");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:7107/api/Product/${id}`, product);

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert("Failed To Update Product");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={product.title || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                className="form-control"
                value={product.brand || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Category</label>
              <input
                type="text"
                name="category"
                className="form-control"
                value={product.category || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={product.price || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                value={product.stock || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                className="form-control"
                value={product.description || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-warning me-2">
            Update Product
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

export default EditProduct;
