function DashboardCard({ title, value, icon, iconBg }) {
  return (
    <div className="dashboard-card">
      <div className="card-top">
        <span className="card-title">{title}</span>

        <div
          className="card-icon"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
      </div>

      <h2 className="card-value">{value}</h2>
    </div>
  );
}

export default DashboardCard;