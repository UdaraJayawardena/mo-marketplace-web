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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 32px",
        height: "60px",
        background: "white",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Brand */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "black",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>M</span>
        </div>
        <span style={{ fontWeight: "700", fontSize: "16px", color: "#111" }}>
          MO Marketplace
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "7px 16px",
            background: "transparent",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#444",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Products
        </button>

        {token ? (
          <button
            onClick={logout}
            style={{
              padding: "7px 16px",
              background: "transparent",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#444",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "7px 16px",
              background: "black",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              color: "white",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}