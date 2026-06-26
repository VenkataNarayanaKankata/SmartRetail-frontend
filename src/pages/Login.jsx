import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/authService";
import { ArrowLeft, Mail, Lock } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email Required
    if (!formData.email) {
      alert("Email is required");
      return;
    }

    // Password Required
    if (!formData.password) {
      alert("Password is required");
      return;
    }

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          email: data.email,
          role: data.role,
        }),
      );

      if (data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Login Failed");
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "25px",
        }}
      >
        <div className="position-relative text-center">
          {/* BACK BUTTON */}
          <button
            className="btn position-absolute start-0 top-0"
            onClick={() => navigate("/")}
            style={{
              border: "none",
              background: "transparent",
            }}
          >
            <ArrowLeft size={28} />
          </button>

          <div
            className="mx-auto mb-3 d-flex justify-content-center align-items-center"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: "#0d6efd",
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            S
          </div>

          <h1
            className="fw-bold mb-3"
            style={{
              color: "#0d1b4d",
            }}
          >
            Welcome to My Store
          </h1>

          <p className="text-secondary fs-5 mb-5">Login to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 position-relative">
            <Mail
              size={20}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
            />

            <input
              type="email"
              name="email"
              className="form-control ps-5 py-3"
              placeholder="Enter your email"
              onChange={handleChange}
              style={{
                borderRadius: "15px",
              }}
            />
          </div>

          <div className="mb-4 position-relative">
            <Lock
              size={20}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
            />

            <input
              type="password"
              name="password"
              className="form-control ps-5 py-3"
              placeholder="Enter your password"
              onChange={handleChange}
              style={{
                borderRadius: "15px",
              }}
            />
          </div>

          <button
            className="btn w-100 py-3 fw-bold text-white"
            style={{
              backgroundColor: "#0d6efd",
              borderRadius: "15px",
              fontSize: "20px",
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?
          <a href="/signup" className="ms-2 text-decoration-none fw-bold">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
