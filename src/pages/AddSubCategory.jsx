import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import FormSection from "../Components/Admin/FormSection";
import FormInput from "../Components/Admin/FormInput";

import {
  addSubCategory,
} from "../Services/subCategoryService";

import {
  getCategories,
} from "../Services/categoryService";

import {
  uploadProductImage,
} from "../Services/uploadService";

import { FaHome } from "react-icons/fa";

function AddSubCategory() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);

  const [previewImage, setPreviewImage] = useState("");

  const [subCategory, setSubCategory] = useState({
    name: "",
    categoryId: "",
    imageUrl: "",
    displayOrder: 1,
    isActive: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(
        data.filter((x) => x.isActive)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSubCategory({
      ...subCategory,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreviewImage(
      URL.createObjectURL(file)
    );

    try {
      const imageUrl =
        await uploadProductImage(file);

      setSubCategory((prev) => ({
        ...prev,
        imageUrl,
      }));
    } catch (error) {
      console.log(error);

      alert("Image Upload Failed");
    }
  };

  const removeImage = () => {
    setPreviewImage("");

    setSubCategory((prev) => ({
      ...prev,
      imageUrl: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addSubCategory(subCategory);

      alert(
        "Sub Category Added Successfully"
      );

      navigate("/admin/subcategories");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Sub Category");
    }
  };
    return (
    <AdminLayout>
      <div className="admin-breadcrumb">
        <FaHome className="me-2" />
        Home / Sub Categories / Add Sub Category
      </div>

      <Header title="Add Sub Category" />

      <form onSubmit={handleSubmit}>

        <FormSection title="Sub Category Information">

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">
              Parent Category
            </label>

            <select
              className="form-select"
              name="categoryId"
              value={subCategory.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            label="Sub Category Name"
            name="name"
            value={subCategory.name}
            onChange={handleChange}
          />

          <FormInput
            label="Display Order"
            name="displayOrder"
            type="number"
            value={subCategory.displayOrder}
            onChange={handleChange}
          />

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">
              Status
            </label>

            <select
              className="form-select"
              name="isActive"
              value={subCategory.isActive}
              onChange={(e) =>
                setSubCategory({
                  ...subCategory,
                  isActive:
                    e.target.value === "true",
                })
              }
            >
              <option value={true}>
                Active
              </option>

              <option value={false}>
                Inactive
              </option>
            </select>
          </div>

        </FormSection>

        <FormSection title="Sub Category Image">

          <div className="col-12 mb-3">

            <label className="form-label fw-semibold">
              Upload Image
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

        <div className="d-flex justify-content-end gap-2 mt-4">

          <button
            type="submit"
            className="btn btn-success"
          >
            Save Sub Category
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              navigate("/admin/subcategories")
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </AdminLayout>
  );
}

export default AddSubCategory;