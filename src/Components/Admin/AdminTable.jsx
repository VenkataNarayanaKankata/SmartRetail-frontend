function AdminTable({ title, columns, children, actionButton }) {
  return (
    <div className="admin-table-card">
      <div className="admin-table-header">
        <h4>{title}</h4>

        {actionButton}
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTable;