"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import Image from "next/image";

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
    //   <section className="flex flex-col gap-8 justify-self-center items-center">
            
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold">{product.name}</h1>
    //   <Image src={product.imageUrl} alt={product.name} className="w-64 h-64" />
    //   <p className="text-lg">Price: ${product.price}</p>
    //   <p>Category: {product.category}</p>
    //   {product.isNew && <span className="text-green-500">New Arrival 🚀</span>}
    // </div>
        //   </section>
        


        <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      {/* Product Image */}
      <div className="flex-1">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        {product.isNew && (
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            New Arrival 🚀
          </span>
        )}

        <p className="text-xl text-gray-700 font-semibold">Price: ${product.price}</p>

        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> {product.category}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">Availability:</span>{" "}
          {product.isAvailable ? (
            <span className="text-green-600">In Stock ({product.quantity})</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">Description:</h2>
        <p className="text-gray-700">{product.description}</p>

        {/* Action Button */}
        <button
          className={`mt-6 w-full lg:w-1/2 py-3 rounded-md text-white font-semibold ${
            product.isAvailable ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!product.isAvailable}
        >
          {product.isAvailable ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  
  );
}
