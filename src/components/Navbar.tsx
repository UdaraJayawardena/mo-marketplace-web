import { useNavigate } from "react-router-dom";
import { getToken } from "../store/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      {/* Left */}
      <div
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => navigate("/")}
      >
        MO Marketplace
      </div>

      {/* Right */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/products")}>Products</button>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </div>
  );
}
