import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Services/authService";
import { ArrowLeft, Mail, Lock } from "lucide-react";

function Signup() {
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

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      alert("Enter valid email");
      return;
    }

    // Password Required
    if (!formData.password) {
      alert("Password is required");
      return;
    }

    // Strong Password Validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordPattern.test(formData.password)) {
      alert(
        "Password must contain capital letter, small letter, number and special symbol",
      );

      return;
    }

    try {
      const data = await signupUser(formData);

      alert(data.message);

      // Navigate to Login Page
      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
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
      <div className="position-absolute top-0 start-0 m-4">
        <ArrowLeft size={28} />
      </div>

      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "25px",
        }}
      >
        <div className="text-center">
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

          <p className="text-secondary fs-5 mb-5">
            Create your account to continue
          </p>
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
            Signup
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?
          <a href="/login" className="ms-2 text-decoration-none fw-bold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
