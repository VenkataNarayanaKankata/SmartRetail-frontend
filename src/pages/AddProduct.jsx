import { useEffect, useState } from "react";
import { addProduct } from "../Services/productService";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import FormSection from "../Components/Admin/FormSection";
import FormInput from "../Components/Admin/FormInput";
import { uploadProductImage } from "../Services/uploadService";
import { getCategories } from "../Services/categoryService";

import { FaHome } from "react-icons/fa";

function AddProduct() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);

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

  // ProductMedia
  imageUrl: "",
  thumbnail: "",
  barcode: "",
  qrCode: "",
  minimumOrderQuantity: "",
  returnPolicy: "",
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
      await addProduct(product);

      alert("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Product");
    }
  };
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Preview
  setPreviewImage(URL.createObjectURL(file));

  try {
    const imageUrl = await uploadProductImage(file);

    setProduct((prev) => ({
      ...prev,
      imageUrl,
      thumbnail: imageUrl,
    }));
  } catch (error) {
    console.log(error);

    alert("Image Upload Failed");
  }
};
useEffect(() => {
  loadCategories();
}, []);

const loadCategories = async () => {
  try {
    const data = await getCategories();
    setCategories(data.filter((x) => x.isActive));
  } catch (error) {
    console.log(error);
  }
};

  return (
    <AdminLayout>
      <div className="admin-breadcrumb">
        <FaHome className="me-2" />
        Home / Products / Add Product
      </div>

      <Header title="Add Product" />

      <form onSubmit={handleSubmit}>
        {/* BASIC INFORMATION */}

        <FormSection title="Basic Information">
          <FormInput
            label="Title"
            name="title"
            value={product.title}
            onChange={handleChange}
          />

          <FormInput
            label="Brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
          />

  <div className="col-md-6 mb-3">
  <label className="form-label fw-semibold">
    Category
  </label>

  <select
    className="form-select"
    name="category"
    value={product.category}
    onChange={handleChange}
  >
    <option value="">Select Category</option>

    {categories.map((category) => (
      <option
        key={category.id}
        value={category.name}
      >
        {category.name}
      </option>
    ))}
  </select>
</div>
        </FormSection>

        {/* PRICING */}

        <FormSection title="Pricing">
          <FormInput
            label="Price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />

          <FormInput
            label="Discount Percentage"
            type="number"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleChange}
          />

          <FormInput
            label="Rating"
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
          />

          <FormInput
            label="Stock"
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </FormSection>

        {/* INVENTORY */}

        <FormSection title="Inventory">
          <FormInput
            label="SKU"
            name="sku"
            value={product.sku}
            onChange={handleChange}
          />

          <FormInput
            label="Weight"
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
          />

          <FormInput
  label="Availability Status"
  type="select"
  name="availabilityStatus"
  value={product.availabilityStatus}
  onChange={handleChange}
  options={[
    "In Stock",
    "Low Stock",
    "Out Of Stock",
  ]}
/>
        </FormSection>
 <FormSection title="Media">

  <div className="col-12 mb-3">

    <label className="form-label fw-semibold">
      Product Image
    </label>

    <input
      type="file"
      className="form-control"
      accept="image/*"
      onChange={handleImageUpload}
    />

  </div>

  {previewImage && (
    <div className="col-12">

      <img
        src={previewImage}
        alt="Preview"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      />

    </div>
  )}

</FormSection>
<FormSection title="Business Details">

  <FormInput
    label="Minimum Order Quantity"
    name="minimumOrderQuantity"
    type="number"
    value={product.minimumOrderQuantity}
    onChange={handleChange}
  />

  <FormInput
    label="Return Policy"
    name="returnPolicy"
    value={product.returnPolicy}
    onChange={handleChange}
  />

</FormSection>
<FormSection title="Tracking">

  <FormInput
    label="Barcode"
    name="barcode"
    value={product.barcode}
    onChange={handleChange}
  />

  <FormInput
    label="QR Code"
    name="qrCode"
    value={product.qrCode}
    onChange={handleChange}
  />

</FormSection>

        {/* DESCRIPTION */}

        <FormSection title="Description">
        <FormInput
    label="Description"
    type="textarea"
    name="description"
    value={product.description}
    onChange={handleChange}
    rows={5}
/>
        </FormSection>

        {/* ADDITIONAL INFORMATION */}

        <FormSection title="Additional Information">
          <FormInput
            label="Warranty Information"
            name="warrantyInformation"
            value={product.warrantyInformation}
            onChange={handleChange}
          />

          <FormInput
            label="Shipping Information"
            name="shippingInformation"
            value={product.shippingInformation}
            onChange={handleChange}
          />
        </FormSection>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-success">
            Save Product
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

export default AddProduct;