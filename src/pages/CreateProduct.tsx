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

      const product = await createProduct({
        name,
        description,
      });

      toast.success("Product created successfully! 🎉");

      // redirect to product list OR product detail
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
      <h1>Create Product</h1>

      {/* Product Name */}
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      {/* Description */}
      <div style={{ marginBottom: "10px" }}>
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "8px", height: "100px" }}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </Layout>
  );
}
