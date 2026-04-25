import { useState } from "react";
import type { Variant } from "../types";
import { toast } from "react-toastify";

interface Props {
  variants: Variant[];
}

export default function VariantSelector({ variants }: Props) {
  const [selected, setSelected] = useState<Record<string, string>>({});

  // Extract attribute options
  const options: Record<string, Set<string>> = {};

  variants.forEach((variant) => {
    Object.entries(variant.attributes).forEach(([key, value]) => {
      if (!options[key]) options[key] = new Set();
      options[key].add(String(value));
    });
  });

  // Convert sets to arrays
  const optionLists = Object.fromEntries(
    Object.entries(options).map(([key, value]) => [key, Array.from(value)]),
  );

  const getVariant = (selection: Record<string, string>) => {
    return variants.find((variant) =>
      Object.entries(selection).every(
        ([key, value]) => variant.attributes[key] === value,
      ),
    );
  };

  const isOptionValid = (key: string, value: string) => {
    const testSelection = {
      ...selected,
      [key]: value,
    };
    const variant = getVariant(testSelection);
    return variant && variant.stock > 0;
  };

  const matchedVariant = getVariant(selected); // 👈 moved here

  return (
    <div>
      <h3>Select Options</h3>

      {Object.entries(optionLists).map(([key, values]) => (
        <div key={key} style={{ marginBottom: "10px" }}>
          <strong>{key}</strong>

          <div>
            {values.map((value) => (
              <button
                key={value}
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [key]: value,
                  }))
                }
                disabled={!isOptionValid(key, value)}
                style={{
                  marginRight: "5px",
                  padding: "5px 10px",
                  background: selected[key] === value ? "black" : "#eee",
                  color: selected[key] === value ? "white" : "black",
                  border: "none",
                  cursor: isOptionValid(key, value) ? "pointer" : "not-allowed",
                  opacity: isOptionValid(key, value) ? 1 : 0.4,
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {matchedVariant && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>Selected Variant</h4>

          <p>
            Price: <strong>${matchedVariant.price}</strong>
          </p>

          <p>
            Stock:{" "}
            {matchedVariant.stock > 0 ? (
              matchedVariant.stock
            ) : (
              <span style={{ color: "red" }}>Out of stock</span>
            )}
          </p>

          <button
            disabled={matchedVariant.stock === 0}
            onClick={() => toast.success("Purchase successful 🎉")}
            style={{
              marginTop: "10px",
              padding: "10px 15px",
              background: matchedVariant.stock > 0 ? "green" : "gray",
              color: "white",
              border: "none",
              cursor: matchedVariant.stock > 0 ? "pointer" : "not-allowed",
            }}
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}