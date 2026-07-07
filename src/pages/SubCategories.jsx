import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import AdminTable from "../Components/Admin/AdminTable";

import {
  getSubCategories,
  deleteSubCategory,
} from "../Services/subCategoryService";

import {
  FaHome,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function SubCategories() {
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSubCategories();
  }, []);

  const loadSubCategories = async () => {
    try {
      const data = await getSubCategories();
      setSubCategories(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load sub categories");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sub category?")) return;

    try {
      await deleteSubCategory(id);
      loadSubCategories();
    } catch (error) {
      console.log(error);
      alert("Failed to delete sub category");
    }
  };

  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-breadcrumb">
        <FaHome className="me-2" />
        Home / Sub Categories
      </div>

      <Header title="Sub Categories" />

      <div className="d-flex justify-content-between align-items-center mb-4">

        <input
          type="text"
          className="form-control w-50"
          placeholder="Search Sub Categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/admin/add-subcategory")
          }
        >
          <FaPlus className="me-2" />
          Add Sub Category
        </button>

      </div>

      <AdminTable
        title="Sub Categories"
        columns={[
          "Image",
          "Sub Category",
          "Category",
          "Display Order",
          "Status",
          "Created",
          "Actions",
        ]}
      >
        {filteredSubCategories.length > 0 ? (
          filteredSubCategories.map((subCategory) => (
            <tr key={subCategory.id}>

              <td>
                <img
                  src={
                    subCategory.imageUrl ||
                    "https://via.placeholder.com/70"
                  }
                  alt={subCategory.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </td>

              <td>{subCategory.name}</td>

              <td>{subCategory.category?.name}</td>

              <td>{subCategory.displayOrder}</td>

              <td>
                {subCategory.isActive ? (
                  <span className="badge bg-success">
                    Active
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    Inactive
                  </span>
                )}
              </td>

              <td>
                {new Date(
                  subCategory.createdAt
                ).toLocaleDateString()}
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate(
                      `/admin/edit-subcategory/${subCategory.id}`
                    )
                  }
                >
                  <FaEdit />
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(subCategory.id)
                  }
                >
                  <FaTrash />
                </button>

              </td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center p-5">
              No Sub Categories Found
            </td>
          </tr>
        )}
      </AdminTable>

    </AdminLayout>
  );
}

export default SubCategories;