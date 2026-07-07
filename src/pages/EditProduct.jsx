import { useEffect, useState, useRef } from "react";
import {
  getProductById,
  updateProduct,
} from "../Services/productService";

import { uploadProductImage } from "../Services/uploadService";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import FormSection from "../Components/Admin/FormSection";
import FormInput from "../Components/Admin/FormInput";
import { getCategories } from "../Services/categoryService";

import { FaHome } from "react-icons/fa";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
const fileInputRef = useRef(null);

const removeImage = () => {
  setPreviewImage("");

  setProduct((prev) => ({
    ...prev,
    imageUrl: "",
    thumbnail: "",
  }));

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const loadProduct = async () => {
  try {
    const data = await getProductById(id);

    setProduct({
      title: data.title || "",
      description: data.description || "",
      category: data.category || "",

      price: data.price || "",
      discountPercentage: data.discountPercentage || "",
      rating: data.rating || "",
      stock: data.stock || "",

      brand: data.brand || "",
      sku: data.sku || "",
      weight: data.weight || "",

      warrantyInformation: data.warrantyInformation || "",
      shippingInformation: data.shippingInformation || "",
      availabilityStatus: data.availabilityStatus || "",

      imageUrl: data.media?.imageUrl || "",
      thumbnail: data.media?.thumbnail || "",
      barcode: data.media?.barcode || "",
      qrCode: data.media?.qrCode || "",
      minimumOrderQuantity:
        data.media?.minimumOrderQuantity || "",
      returnPolicy: data.media?.returnPolicy || "",
    });

    setPreviewImage(
      data.media?.imageUrl || ""
    );

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
      await updateProduct(id, product);

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

     alert("Failed To Update Product");
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
  loadProduct();
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
       Home / Products / Edit Product
      </div>

      <Header title="Edit Product" />

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
  ref={fileInputRef}
  type="file"
  className="form-control"
  accept="image/*"
  onChange={handleImageUpload}
/>

  </div>

{previewImage && (
  <div className="col-12">

    <div
      style={{
        position: "relative",
        width: "200px",
      }}
    >

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

      <button
        type="button"
        onClick={removeImage}
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "none",
          background: "#dc3545",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ×
      </button>

    </div>

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
           Update Product
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

export default EditProduct;