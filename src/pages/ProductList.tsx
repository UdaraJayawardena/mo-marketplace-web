import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/products";
import type { Product } from "../types";
import Layout from "../components/Layout";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: "26px", fontWeight: "700", color: "#111" }}>
              Products
            </h1>
            <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>
              {!loading && !error ? `${products.length} product${products.length !== 1 ? "s" : ""} found` : ""}
            </p>
          </div>

          <button
            onClick={() => navigate("/create")}
            style={{
              padding: "10px 20px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
          >
            + Create Product
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: "15px" }}>
            Loading products...
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "16px 20px",
              background: "#fff5f5",
              border: "1px solid #fcc",
              borderRadius: "8px",
              color: "#c00",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              border: "2px dashed #e0e0e0",
              borderRadius: "16px",
              color: "#aaa",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
            <p style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "600", color: "#555" }}>
              No products yet
            </p>
            <p style={{ margin: "0 0 20px", fontSize: "14px" }}>
              Get started by creating your first product.
            </p>
            <button
              onClick={() => navigate("/create")}
              style={{
                padding: "10px 20px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              + Create Product
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "20px 24px",
                cursor: "pointer",
                transition: "box-shadow 0.2s, border-color 0.2s",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = "#bbb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "600", color: "#111" }}>
                  {product.name}
                </h3>

                {product.description && (
                  <p style={{ margin: "0 0 10px", color: "#777", fontSize: "14px", lineHeight: "1.5" }}>
                    {product.description}
                  </p>
                )}

                <span
                  style={{
                    fontSize: "12px",
                    background: "#f0f0f0",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    color: "#555",
                    fontWeight: "500",
                  }}
                >
                  {product.variants?.length || 0} variant
                  {product.variants?.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Arrow */}
              <span style={{ fontSize: "18px", color: "#ccc", marginLeft: "16px" }}>→</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}