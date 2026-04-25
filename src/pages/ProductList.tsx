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
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h1 style={{ margin: 0 }}>Products</h1>
          <button
            onClick={() => navigate("/create")}
            style={{
              padding: "10px 18px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            + Create Product
          </button>
        </div>

        {loading && <p style={{ color: "#888" }}>Loading products...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p style={{ color: "#888" }}>
            No products found. Create your first one!
          </p>
        )}

        <div>
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "12px",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <h3 style={{ margin: "0 0 6px 0" }}>{product.name}</h3>

              {product.description && (
                <p style={{ margin: "0 0 10px 0", color: "#555" }}>
                  {product.description}
                </p>
              )}

              <span
                style={{
                  fontSize: "12px",
                  background: "#f0f0f0",
                  padding: "3px 8px",
                  borderRadius: "20px",
                  color: "#444",
                }}
              >
                {product.variants?.length || 0} variant
                {product.variants?.length !== 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
