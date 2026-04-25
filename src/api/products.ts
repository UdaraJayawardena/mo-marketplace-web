import { api } from "./client";
import type { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};


export const createProduct = async (data: any) => {
  const res = await api.post("/products", data);
  return res.data;
};