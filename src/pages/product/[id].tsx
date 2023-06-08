import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import axios from 'axios'

import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'

interface ProductProps {
    product: {
        id: string,
        name: string,
        description: string,
        imageUrl: string,
        price: string,
        defaultPriceId: string
    }
}

export default function Product({product}: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    
    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })
            const {checkoutUrl} = response.data
            window.location.href = checkoutUrl
        } catch (error) {
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout')
        }
    }
    
    return (
        <React.Fragment>
            <Head>
                <title>Ignite Shop </title>
            </Head>
            
            <ProductContainer>
                <ImageContainer>
                    <Image 
                        src={product.imageUrl} 
                        alt={`Camiseta ${product.name}`} 
                        width={520} height={480} />
                </ImageContainer>
                
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>
                        {product.description}
                    </p>
                    
                    <button
                        type="button"
                        disabled={isCreatingCheckoutSession}
                        onClick={handleBuyProduct}>
                        Comprar
                    </button>
                </ProductDetails>
            </ProductContainer>
        </React.Fragment>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {id: 'prodd_O2ojgRSPSNjZxg'}}
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const productId = String(params?.id)
    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })
    
    const price = product.default_price as Stripe.Price
    
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount as number / 100),
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 24 // 24 hours
    }
}