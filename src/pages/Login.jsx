import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password");
      return;
    }

    setError("");
    navigate(user?.role === "admin" ? "/admin" : "/employee");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #0ea5e9)",
      }}>
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{
          width: "90%",
          maxWidth: "380px",
          background: "#f8fafc", // Light card background
        }}>
        <div className="card-body p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1 text-dark">Welcome Back</h3>
            <p className="text-muted small mb-0">Sign in to continue</p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2 text-center small">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg bg-white text-dark border-0 shadow-sm"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">Password</label>
              <input
                type="password"
                className="form-control form-control-lg bg-white text-dark border-0 shadow-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-gradient btn-lg w-100 fw-semibold text-white"
              style={{
                background: "linear-gradient(90deg, #0ea5e9, #2563eb)",
                border: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #2563eb, #0ea5e9)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #0ea5e9, #2563eb)")
              }>
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div
            className="mt-4 p-3 rounded text-dark"
            style={{
              background: "#e0f2fe",
              border: "1px solid #60a5fa",
            }}>
            <p className="mb-1 small text-center font-semibold">
              Demo Credentials
            </p>
            <p className="mb-1 small text-center">
              <strong>Admin:</strong> admin@gmail.com / admin123
            </p>
            <p className="mb-0 small text-center">
              <strong>Employee:</strong> employee@gmail.com / emp123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
