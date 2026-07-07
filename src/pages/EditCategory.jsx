import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import FormSection from "../Components/Admin/FormSection";
import FormInput from "../Components/Admin/FormInput";

import {
  getCategoryById,
  updateCategory,
} from "../Services/categoryService";

import { FaHome } from "react-icons/fa";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    isActive: true,
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const data = await getCategoryById(id);

      setCategory({
        name: data.name,
        isActive: data.isActive,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load category");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCategory(id, category);

      alert("Category Updated Successfully");

      navigate("/admin/categories");
    } catch (error) {
      console.log(error);

      alert("Failed To Update Category");
    }
  };

  return (
    <AdminLayout>

      <div className="admin-breadcrumb">
        <FaHome className="me-2" />
        Home / Categories / Edit Category
      </div>

      <Header title="Edit Category" />

      <form onSubmit={handleSubmit}>

        <FormSection title="Category Information">

          <FormInput
            label="Category Name"
            name="name"
            value={category.name}
            onChange={handleChange}
          />

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

        </FormSection>

        <div className="d-flex justify-content-end gap-2 mt-4">

          <button className="btn btn-success">
            Update Category
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

export default EditCategory;