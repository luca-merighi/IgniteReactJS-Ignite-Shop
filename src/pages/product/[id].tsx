import React, { useState } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import axios from 'axios'

import styles from './styles.module.scss'

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string
    } 
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    
    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)
            
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })
            const { checkoutUrl } = response.data
            window.location.href = checkoutUrl
        } catch (error) {
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout')
        }
    }
    
    return (
        <React.Fragment>
            <Head>
                <title>{product.name} - Ignite Shop</title>
            </Head>
            
            <main className={styles.product}>
                <div className={styles.imageContainer}>
                    <Image 
                        src={product.imageUrl} alt="Camiseta"
                        width={520} height={480} />
                </div>
                        
                <div className={styles.productDetails}>
                    <h1>
                        {product.name}
                    </h1>
                    <span>
                        {product.price}
                    </span>
                    <p>
                        {product.description ?? 'Não há uma descrição para esse produto :('}
                    </p>
                    
                    <button 
                        type="button" 
                        disabled={isCreatingCheckoutSession}
                        onClick={handleBuyProduct}>
                        Comprar Agora
                    </button>
                </div>
            </main>
        </React.Fragment>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{
            params: { id: 'prod_Osx1y7tvkglcD9'}
        }],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const productId = String(params!.id)
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
        revalidate: 60 * 60 * 1 // 1 hour
    }
}
