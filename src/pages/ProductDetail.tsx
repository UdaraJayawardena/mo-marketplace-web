import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import type { Product } from "../types";
import VariantSelector from "../components/VariantSelector";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <button
          onClick={() => navigate("/products")}
          style={{
            marginBottom: "15px",
            padding: "6px 12px",
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
          }}
        >
          ← Back to Products
        </button>

        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <h3>Variants</h3>

        <VariantSelector variants={product.variants} />
      </div>
    </Layout>
  );
}
