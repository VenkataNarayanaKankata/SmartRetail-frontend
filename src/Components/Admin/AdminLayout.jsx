import Sidebar from "./Sidebar";
import "../../styles/admin.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;