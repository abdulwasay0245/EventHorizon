'use client'
import Image from 'next/image'
import React from 'react'
import logos from './component/data/logos';
import { client } from '@/sanity/lib/client';
import Products from './component/products';
import { useEffect, useState } from 'react';
import Loading from './loading';
import Link from 'next/link';
   const getProduct = async () => {
      try {
         const products = await client.fetch(`
      *[_type == "product"][0]{
       
        "imageUrl":image.asset->url,
        
        }
        `);
        
         return products;
      } catch (error) {
         console.error('Error fetching products:', error);
         return [];
       }
   
};
getProduct()
   
interface Products{
  imageUrl: string
}
const Hero = () => {
  const [product, setProduct] = useState<Products | null>(null);
  const [loading , setLoading] = useState(true)
  useEffect (() => {
    const fetchedData = async () => {
      try {
        setLoading(true)
        const fetchedProducts = await getProduct();
        setProduct(fetchedProducts)
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchedData()
  
  },[])
  return (
      <main className='bg-[#F0F2F3] rounded-b-[48px] items-center flex flex-col lg:flex-row  justify-center py-36 px-[70px] max-w-[1500px] justify-self-center'>
          <article className='flex flex-col gap-6 '>
              <div className='flex flex-col gap-4 text-[#272343]'>
                      <p className='text-[14px] '>Welcome to Event Horizon</p>
              <h1 className='text-4xl lg:text-[60px] font-bold leading-none  lg:w-[557px]'>Best Space design
Collection for you.</h1>
              </div>
        <Link href={"/productPage"}>
        <button className='py-[14px] px-[24px] bg-[#029FAE] flex gap-2 items-center w-[170px] text-white rounded-lg'>Shop Now <span className='text-[24px]'> &#8594;</span></button>
        </Link>
      </article>
      {loading ? (
        <Loading/>
      ) : 
          product && (
        <Image
          src={product.imageUrl}
          alt='Product Image'
          width={434}
          height={584}
          className='hidden lg:block mix-blend-multiply'
        />
      )}
              {/* <Image
                  alt='chair'
                  src={product.imageUrl}
                  width={434}
              height={584}
          className='hidden lg:block'>
              
                  </Image> */}
    </main>
  )
}

export default Hero