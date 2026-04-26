import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import type { Product, Variant } from "../types";
import VariantSelector from "../components/VariantSelector";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then(setProduct)
        .catch(() => alert("Failed to load product."))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p style={{ padding: "40px", color: "#888" }}>Loading...</p>;
  if (!product) return <p style={{ padding: "40px", color: "#888" }}>Product not found.</p>;

  const handleQuickBuy = () => {
    if (!selectedVariant) {
      alert("Please select a variant");
      return;
    }

    toast.success(`Purchase Successful!\n\nProduct: ${product.name}\nVariant: ${selectedVariant.attributes?.color} - ${selectedVariant.attributes?.size}\nPrice: $${selectedVariant.price}`);
  };

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" }}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/products")}
          style={{
            marginBottom: "24px",
            padding: "7px 14px",
            border: "1px solid #e0e0e0",
            background: "white",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "13px",
            color: "#555",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          ← Back to Products
        </button>

        {/* Product Header Card */}
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: "700", color: "#111" }}>
                {product.name}
              </h1>
              {product.description && (
                <p style={{ margin: 0, color: "#777", fontSize: "15px", lineHeight: "1.6" }}>
                  {product.description}
                </p>
              )}
            </div>

            <button
              onClick={() => navigate(`/products/${id}/variants`)}
              style={{
                padding: "8px 16px",
                background: "#f5f5f5",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                color: "#444",
                whiteSpace: "nowrap",
                marginLeft: "16px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#eee")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            >
              + Add Variant
            </button>
          </div>
        </div>

        {/* Variants Card */}
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
            Select a Variant
          </h3>

          <VariantSelector
            variants={product.variants}
            onSelect={setSelectedVariant}
          />
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleQuickBuy}
          disabled={!selectedVariant}
          style={{
            width: "100%",
            padding: "14px",
            background: selectedVariant ? "black" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: selectedVariant ? "pointer" : "not-allowed",
            letterSpacing: "0.4px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            if (selectedVariant) e.currentTarget.style.background = "#333";
          }}
          onMouseLeave={(e) => {
            if (selectedVariant) e.currentTarget.style.background = "black";
          }}
        >
          {selectedVariant ? "Buy Now" : "Select a variant to continue"}
        </button>
      </div>
    </Layout>
  );
}