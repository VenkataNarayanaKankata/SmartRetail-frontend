import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct as deleteProductService,
} from "../Services/productService";

import AdminLayout from "../Components/Admin/AdminLayout";
import Header from "../Components/Admin/Header";
import AdminTable from "../Components/Admin/AdminTable";

import { FaHome, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
const loadProducts = async () => {
  try {
    const data = await getProducts();

    setProducts(data);
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
    await deleteProductService(id);
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
  const filteredProducts = products.filter((product) =>
  product.title?.toLowerCase().includes(search.toLowerCase())
);

 return (
  <AdminLayout>

    <div className="admin-breadcrumb">
      <FaHome className="me-2" />
      Home / Products
    </div>

    <Header title="Products" />
    <div className="d-flex justify-content-between align-items-center mb-4">

  <input
    type="text"
    className="form-control w-50"
    placeholder="Search Products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button
    className="btn btn-primary"
    onClick={() => navigate("/admin/add-product")}
  >
    <FaPlus className="me-2" />
    Add Product
  </button>

</div>
<AdminTable
  title="Products"
 columns={[
    "Image",
    "Product",
    "Category",
    "Brand",
    "Price",
    "Stock",
    "Status",
    "Actions",
]}
>

  {filteredProducts.map((product) => (
    <tr key={product.id}>

      <td>
  <img
    src={product.media?.imageUrl || "https://via.placeholder.com/80"}
    alt={product.title}
    className="product-thumbnail"
  />
</td>

      <td>{product.title}</td>
      <td>{product.category}</td>

      <td>{product.brand}</td>

      <td>₹{product.price}</td>
      {/* STOCK */}

<td>{product.stock}</td>

{/* STATUS */}

<td>
  <span
    className={`badge ${
      product.availabilityStatus === "In Stock"
        ? "bg-success"
        : product.availabilityStatus === "Low Stock"
        ? "bg-warning text-dark"
        : "bg-danger"
    }`}
  >
    {product.availabilityStatus}
  </span>
</td>

{/* ACTIONS */}

<td>
  <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => navigate(`/admin/edit-product/${product.id}`)}
  >
    <FaEdit />
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteProduct(product.id)}
  >
    <FaTrash />
  </button>
</td>

    </tr>
  ))}

</AdminTable>

    {/* Search + Add Button */}

    {/* Product Table */}

  </AdminLayout>
);
}

export default AdminProducts;
