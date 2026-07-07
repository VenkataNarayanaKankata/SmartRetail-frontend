import { FaSyncAlt } from "react-icons/fa";

function Header({ title }) {
  return (
    <div className="admin-header">
      <div>
        <h2>{title}</h2>
        <p className="text-muted mb-0">
          Welcome back, Administrator
        </p>
      </div>

      <button
        className="btn btn-outline-secondary"
        onClick={() => window.location.reload()}
      >
        <FaSyncAlt className="me-2" />
        Refresh
      </button>
    </div>
  );
}

export default Header;