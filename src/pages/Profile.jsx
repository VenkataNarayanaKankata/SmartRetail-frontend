import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-body p-4">

          <div className="text-center mb-4">
            <h1>👤</h1>
            <h3>{user?.name}</h3>
          </div>

          <hr />

          <h5>Email</h5>
          <p>{user?.email}</p>

          <h5>Phone</h5>
          <p>{user?.phone || "Not Available"}</p>

          <h5>Role</h5>
          <p>{user?.role}</p>

        </div>
      </div>
    </div>
  );
}

export default Profile;