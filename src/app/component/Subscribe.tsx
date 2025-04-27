'use client'
import React from 'react'
import { roboto, openSans } from './fonts'
import ProductInfo from './data/products'
import Image from 'next/image'

import { client } from '@/sanity/lib/client'
import { product } from "@/sanity/schemaTypes/product";
import Loading from '../loading'


import { useState, useEffect } from "react";


   const getProduct = async () => {
      try {
         const products = await client.fetch(`
      *[_type == "product"]{
        price,
        name,
        category,
        "imageUrl":image.asset->url,
        isNew,
        }
        `);
        
         return products;
      } catch (error) {
         console.error('Error fetching products:', error);
         return [];
      }
      
   };
   interface product {
      _id: string;
      name: string;
      price: number;
      category: string;
      imageUrl: string;
      isNew: boolean;
   }

const Subscribe = () => {

   const [products, setProducts] = useState<product[]>([]);
   const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  
   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsLoading(true); // Set loading to true before fetching
            const fetchedProducts = await getProduct();
            setProducts(fetchedProducts);
         } catch (error) {
            console.error('Error fetching products:', error);
         } finally {
            setIsLoading(false); // Set loading to false after fetching (success or failure)
         }
      };
    
      fetchData();
   }, []);


   {
      return (
         <section className={`${roboto.className} bg-[#1E28320D] py-[100px] lg:px-[300px] gap-[70px] flex flex-col items-center`}>
            <h2 className='font-medium text-2xl lg:text-[50px] text-center'>Or subscribe to the newsletter</h2>
            <div className='flex gap-4'>
               <input type="text" placeholder='Email address...' className='border-b bg-transparent font-semibold lg:w-[643px]' />
               <button className={`${openSans.className} text-center border-b text-[#1E2832]`}>SUBMIT</button>
            </div>

            <h2 className='font-medium text-2xl lg:text-[50px] text-center'>Follow products and discounts on Instagram</h2>

            <div className='flex flex-col  lg:flex-row gap-6'>
                 {isLoading ? (
                       <Loading /> // Render Loading component while loading
                     ) : (
                       products.filter((products) => products.category === "event").map(
                         (product:product) => (
                           <div key={product._id}>
                           <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="aspect-[3/4] object-cover"></Image>
                             {/* <img src={product.imageUrl } alt={product.name} /> */}
                           </div>
                         )
                       )
                     )}
          
               
            </div>
         </section>
      )
   }
}
   export default Subscribe;
