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

  // Load product
  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setVariants(res.data.variants || []);
    });
  }, [id]);

  // Add variant locally
  const addVariant = () => {
    if (!variant.color || !variant.size) {
      toast.error("Color and size are required");
      return;
    }

    setVariants([...variants, variant]);

    setVariant({
      color: "",
      size: "",
      price: "",
      stock: "",
    });
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

  return (
    <Layout>
      <h1>Add Variants</h1>

      {product && <h3>Product: {product.name}</h3>}

      <hr />

      {/* Variant Input */}
      <h3>Add Variant</h3>

      <input
        placeholder="Color"
        value={variant.color}
        onChange={(e) => setVariant({ ...variant, color: e.target.value })}
      />

      <input
        placeholder="Size"
        value={variant.size}
        onChange={(e) => setVariant({ ...variant, size: e.target.value })}
      />

      <input
        placeholder="Price"
        value={variant.price}
        onChange={(e) => setVariant({ ...variant, price: e.target.value })}
      />

      <input
        placeholder="Stock"
        value={variant.stock}
        onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
      />

      <button onClick={addVariant}>+ Add Variant</button>

      <hr />

      {/* Variant List */}
      <h3>Variants</h3>

      {variants.map((v, i) => (
        <div key={i}>
          {v.color} | {v.size} | ${v.price} | stock: {v.stock}
        </div>
      ))}

      <hr />

      <button onClick={saveVariants}>Save Variants</button>
    </Layout>
  );
}
