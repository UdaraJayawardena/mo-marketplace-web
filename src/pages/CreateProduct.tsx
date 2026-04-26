import { useState } from "react";
import { createProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }

    try {
      setLoading(true);

      await createProduct({
        name,
        description,
      });

      toast.success("Product created successfully! 🎉");

      navigate("/products");
    } catch (err) {
      alert("");
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "700", color: "#111" }}>
            Create Product
          </h1>
          <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>
            Fill in the details below to add a new product.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          {/* Product Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#444",
                marginBottom: "6px",
              }}
            >
              Product Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="e.g. Basic T-Shirt"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#111")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "28px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#444",
                marginBottom: "6px",
              }}
            >
              Description{" "}
              <span style={{ fontWeight: "400", color: "#aaa" }}>(optional)</span>
            </label>
            <textarea
              placeholder="Describe the product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
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
                fontFamily: "inherit",
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#111")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/products")}
              style={{
                flex: 1,
                padding: "12px",
                background: "white",
                color: "#444",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: 2,
                padding: "12px",
                background: loading ? "#aaa" : "black",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "#333";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "black";
              }}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}