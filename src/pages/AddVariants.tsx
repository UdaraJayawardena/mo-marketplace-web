import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { api } from "../api/client";
import { toast } from "react-toastify";

export default function AddVariants() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);

  const [variant, setVariant] = useState({
    color: "",
    size: "",
    price: "",
    stock: "",
  });

  const [variants, setVariants] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setVariants(res.data.variants || []);
    });
  }, [id]);

  const addVariant = () => {
    if (!variant.color || !variant.size) {
      toast.error("Color and size are required");
      return;
    }

    setVariants([...variants, variant]);

    setVariant({ color: "", size: "", price: "", stock: "" });
  };

  const saveVariants = async () => {
    try {
      for (const v of variants) {
        await api.post(`/products/${id}/variants`, {
          attributes: {
            color: v.color,
            size: v.size,
            material: "cotton",
          },
          price: Number(v.price),
          stock: Number(v.stock),
        });
      }

      toast.success("Variants saved successfully! 🎉");
      navigate(`/products/${id}`);
    } catch (err: any) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Error saving variants");
    }
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "11px 14px",
    fontSize: "14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box" as const,
    color: "#111",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600" as const,
    color: "#444",
    marginBottom: "6px",
  };

  return (
    <Layout>
      <div style={{ maxWidth: "680px", margin: "40px auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <button
            onClick={() => navigate(`/products/${id}`)}
            style={{
              background: "none",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#555",
              marginBottom: "16px",
            }}
          >
            ← Back to Product
          </button>

          <h1 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "700", color: "#111" }}>
            Add Variants
          </h1>

          {product && (
            <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>
              Adding variants to <strong style={{ color: "#111" }}>{product.name}</strong>
            </p>
          )}
        </div>

        {/* Variant Form Card */}
        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "600", color: "#111" }}>
            New Variant
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Color <span style={{ color: "red" }}>*</span></label>
              <input
                placeholder="e.g. Red"
                value={variant.color}
                onChange={(e) => setVariant({ ...variant, color: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>

            <div>
              <label style={labelStyle}>Size <span style={{ color: "red" }}>*</span></label>
              <input
                placeholder="e.g. M"
                value={variant.size}
                onChange={(e) => setVariant({ ...variant, size: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>

            <div>
              <label style={labelStyle}>Price ($)</label>
              <input
                placeholder="e.g. 29.99"
                type="number"
                value={variant.price}
                onChange={(e) => setVariant({ ...variant, price: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>

            <div>
              <label style={labelStyle}>Stock</label>
              <input
                placeholder="e.g. 100"
                type="number"
                value={variant.stock}
                onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>
          </div>

          <button
            onClick={addVariant}
            style={{
              width: "100%",
              padding: "11px",
              background: "#f5f5f5",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#444",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#eee")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          >
            + Add Variant
          </button>
        </div>

        {/* Variant List */}
        {variants.length > 0 && (
          <div
            style={{
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              marginBottom: "24px",
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "600", color: "#111" }}>
              Variants ({variants.length})
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {variants.map((v, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    border: "1px solid #f0f0f0",
                    fontSize: "14px",
                  }}
                >
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <span
                      style={{
                        background: "#111",
                        color: "white",
                        borderRadius: "20px",
                        padding: "2px 10px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {v.color}
                    </span>
                    <span style={{ color: "#555" }}>Size: <strong>{v.size}</strong></span>
                    <span style={{ color: "#555" }}>Price: <strong>${v.price}</strong></span>
                    <span style={{ color: "#555" }}>Stock: <strong>{v.stock}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={saveVariants}
          disabled={variants.length === 0}
          style={{
            width: "100%",
            padding: "13px",
            background: variants.length === 0 ? "#aaa" : "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: variants.length === 0 ? "not-allowed" : "pointer",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            if (variants.length > 0) e.currentTarget.style.background = "#333";
          }}
          onMouseLeave={(e) => {
            if (variants.length > 0) e.currentTarget.style.background = "black";
          }}
        >
          Save Variants
        </button>
      </div>
    </Layout>
  );
}