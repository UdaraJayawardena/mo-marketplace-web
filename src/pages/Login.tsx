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
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleLogin} style={{ width: "100%" }}>
        Login
      </button>
    </div>
  );
}
