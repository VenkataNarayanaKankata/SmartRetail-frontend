import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import AdminTable from "../Components/Admin/AdminTable";

import {
  getCategories,
  deleteCategory,
} from "../Services/categoryService";

import {
  FaHome,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load categories");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.log(error);
      alert("Failed to delete category");
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-breadcrumb">
        <FaHome className="me-2" />
        Home / Categories
      </div>

      <Header title="Categories" />

      <div className="d-flex justify-content-between align-items-center mb-4">

        <input
          type="text"
          className="form-control w-50"
          placeholder="Search Categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/add-category")}
        >
          <FaPlus className="me-2" />
          Add Category
        </button>

      </div>

      <AdminTable
        title="Categories"
        columns={[
  "Image",
  "Category",
  "Display Order",
  "Status",
  "Created",
  "Actions",
]}
      >
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
           <tr key={category.id}>

  {/* IMAGE */}

  <td>
    <img
      src={
        category.imageUrl ||
        "https://via.placeholder.com/70"
      }
      alt={category.name}
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "10px",
        objectFit: "cover",
      }}
    />
  </td>

  {/* CATEGORY */}

  <td className="fw-semibold">
    {category.name}
  </td>

  {/* DISPLAY ORDER */}

  <td>
    {category.displayOrder}
  </td>

  {/* STATUS */}

  <td>
    {category.isActive ? (
      <span className="badge bg-success">
        Active
      </span>
    ) : (
      <span className="badge bg-danger">
        Inactive
      </span>
    )}
  </td>

  {/* CREATED */}

  <td>
    {new Date(category.createdAt).toLocaleDateString()}
  </td>

              <td>

                <button
  className="btn btn-warning btn-sm me-2"
  onClick={() =>
    navigate(`/admin/edit-category/${category.id}`)
  }
>
  <FaEdit />
</button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(category.id)
                  }
                >
                  <FaTrash />
                </button>

              </td>

            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              className="text-center p-5"
            >
              No Categories Found
            </td>
          </tr>
        )}
      </AdminTable>
    </AdminLayout>
  );
}

export default Categories;