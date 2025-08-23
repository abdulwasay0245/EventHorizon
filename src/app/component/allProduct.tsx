'use client'
import Image from 'next/image'
import React from 'react'
import ProductInfo from './data/products'
import Link from 'next/link'
import { client } from "@/sanity/lib/client";
import { product } from "@/sanity/schemaTypes/product";
import Loading from "../loading";


import { useState, useEffect } from "react";
import Products from './products';
const getProduct = async () => {
  try {
    const products = await client.fetch(`
      *[_type == "product"]{
        _id,
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
interface product{
  _id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  isNew: boolean;
}


const AllProducts = () => {
    const [products, setProducts] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading 
  const [filter , setFilter] = useState("all")
    
  const handleFilter = () => {
    console.log("filter")
  }
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
    return (
        <section className='flex flex-col gap-8 justify-self-center'>
        <h1 className='text-[#272343] font-semibold text-[32px]'>All Products</h1>
       <div>
  <label htmlFor="category" className="mr-2">Choose Category:</label>
  <select
    id="category"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="w-64 p-2 border rounded-md"
  >
    <option value="all">All</option>
    <option value="event">Event</option>
    <option value="furniture">Furniture</option>
    <option value="electronics">Electronics</option>
    {/* you can add more categories as needed */}
  </select>
</div>
      <div className='grid lg:grid-cols-4 gap-5 justify-self-center'>
          
          {[...products, ...products, ...products, ...products].filter((products ) => {
            if(filter == "all") return true
            return products.category === filter
          }).map((info) =>
              <Link href={`/${info._id}`} key={info._id}>
                 <div className='justify-self-center' >
          <div className=' w-[312px] h-[312px] bg-cover pt-5 pl-5'
          style={{backgroundImage: `url(${info.imageUrl})`}}>
                      <div className={` py-[6px] px-[10px] rounded-[4px] w-[49px]  `}
                          style={{ backgroundColor: info.isNew ? '#FFD600' : '#029FAE' }}>
                          <p className='text-center text-[13px] font-medium text-white'>{info.category}</p></div>
          </div>
                  <div className='flex items-center justify-between'>
                      <div className='flex flex-col gap-[10px]'>
                          <p className='text-base text-[#007580]'>Library Stool Chair{info.name}</p>
                          <p className='text-lg'>$20
                            <span className='text-[14px] line-through text-[#9A9CAA]'>{info.name}</span> </p>
                      </div>
                      <div className=' py-[10px] px-[10px] rounded-lg'
                      style={{backgroundColor: info.isNew ? '#F0F2F3' : '#029FAE '}}>
                          <Image
                              alt='cart'
                              width={24}
                              height={24}
                              src='/cart.png'
                           
                              style={{
                                  filter: info.isNew ? 'none' : 'invert(1)',
                                  
                               }}></Image>
                      </div>
                      </div>
                        </div>
                        </Link>
        )}
            </div>
            </section>
  )
}

export default AllProducts