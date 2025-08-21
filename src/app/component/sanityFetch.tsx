import { client } from "@/sanity/lib/client";


export const getProductSanity = async () => {
  try {
       
    const products = await client.fetch(`
      *[_type == "product"]{
        _id,
        price,
        name,
        category,
        "imageUrl": image.asset->url,
        isNew
      }
    `);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}