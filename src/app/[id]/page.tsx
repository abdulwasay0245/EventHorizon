"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const getProduct = async () => {
      const result = await client.fetch(
        `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          price,
          category,
          "imageUrl": image.asset->url,
          isNew
        }`,
        { id: params.id }
      );
      setProduct(result);
    };

    getProduct();
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-64 h-64" />
      <p className="text-lg">Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      {product.isNew && <span className="text-green-500">New Arrival 🚀</span>}
    </div>
  );
}
