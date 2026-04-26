import { useState } from "react";
import { api } from "../api/client";
import { setToken } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setToken(res.data.access_token);

      // IMPORTANT: wait for storage sync
      setTimeout(() => {
        navigate("/products", { replace: true });
      }, 0);

      toast.success("Login successful");

      navigate("/products", { replace: true });
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "48px 40px",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "black",
              borderRadius: "12px",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>M</span>
          </div>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#111" }}>
            Welcome
          </h2>
          <p style={{ margin: "6px 0 0", color: "#888", fontSize: "14px" }}>
            Sign in to MO Marketplace
          </p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>
            Email address
          </label>
          <input
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "11px 14px",
              fontSize: "14px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              outline: "none",
              boxSizing: "border-box",
              color: "#111",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#111")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>
              Password
            </label>
            <a href="#" style={{ fontSize: "13px", color: "#555", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>
          <input
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "11px 14px",
              fontSize: "14px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              outline: "none",
              boxSizing: "border-box",
              color: "#111",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#111")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
        >
          Sign in
        </button>

        {/* Footer */}
        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#888" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#111", fontWeight: "600", textDecoration: "none" }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}