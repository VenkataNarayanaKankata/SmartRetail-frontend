import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import FormSection from "../Components/Admin/FormSection";
import FormInput from "../Components/Admin/FormInput";

import { addCategory } from "../Services/categoryService";
import { uploadProductImage } from "../Services/uploadService";

import { FaHome } from "react-icons/fa";

function AddCategory() {
  const navigate = useNavigate();

 const [category, setCategory] = useState({
  name: "",
  imageUrl: "",
  displayOrder: 1,
  isActive: true,
});
const [previewImage, setPreviewImage] = useState("");
const fileInputRef = useRef(null);
const removeImage = () => {
  setPreviewImage("");

  setCategory((prev) => ({
    ...prev,
    imageUrl: "",
  }));

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setPreviewImage(URL.createObjectURL(file));

  try {
    const imageUrl = await uploadProductImage(file);

    setCategory((prev) => ({
      ...prev,
      imageUrl,
    }));
  } catch (error) {
    console.log(error);
    alert("Image Upload Failed");
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory({
      ...category,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCategory(category);

      alert("Category Added Successfully");

      navigate("/admin/categories");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Category");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-breadcrumb">
        <FaHome className="me-2" />
        Home / Categories / Add Category
      </div>

      <Header title="Add Category" />

      <form onSubmit={handleSubmit}>
      <FormSection title="Category Information">

  <FormInput
    label="Category Name"
    name="name"
    value={category.name}
    onChange={handleChange}
  />

  <FormInput
    label="Display Order"
    name="displayOrder"
    type="number"
    value={category.displayOrder}
    onChange={handleChange}
  />

  <div className="col-md-6 mb-3">

    <label className="form-label fw-semibold">
      Category Image
    </label>
<input
  ref={fileInputRef}
  type="file"
  className="form-control"
  accept="image/*"
  onChange={handleImageUpload}
/>

  </div>

  <div className="col-md-6 mb-3">

    <label className="form-label fw-semibold">
      Status
    </label>

    <select
      className="form-select"
      value={category.isActive}
      onChange={(e) =>
        setCategory({
          ...category,
          isActive: e.target.value === "true",
        })
      }
    >
      <option value={true}>Active</option>
      <option value={false}>Inactive</option>
    </select>

  </div>

{previewImage && (
  <div className="col-12 mt-3">

    <label className="form-label fw-semibold">
      Preview
    </label>

    <div
      style={{
        position: "relative",
        width: "180px",
      }}
    >

      <img
        src={previewImage}
        alt="Category Preview"
        style={{
          width: "180px",
          height: "180px",
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
          fontSize: "18px",
        }}
      >
        ×
      </button>

    </div>

  </div>
)}

</FormSection>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-success">
            Save Category
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/categories")}
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

export default AddCategory;