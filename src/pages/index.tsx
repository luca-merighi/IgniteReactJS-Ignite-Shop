import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

import ProductCard from '@/components/ProductCard'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import styles from '../styles/home.module.scss'

export interface Product {
  id: string,
  name: string,
  imageUrl: string,
  price: number,
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  
  return (
    <React.Fragment>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      
      <main 
        className={`keen-slider ${styles.homeContainer}`} 
        ref={sliderRef}>
          {products.map(product => {
            return (
              <ProductCard product={product} />
            )})}
      </main>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount as number / 100),
    }
  })
  
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
// Próxima aula -> Prefetch de links
