import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

import styles from './styles.module.scss'

interface SuccessProps {
    customerName: string,
    product: {
        name: string,
        imageUrl: string
    }
}

export default function Success({ customerName, product}: SuccessProps) {
    return (
        <React.Fragment>
            <Head>
                <meta name="robots" content="noindex" />
                <title>Compra Efetuada! - Ignite Shop</title>
            </Head>
            
            <main className={styles.successContainer}>
                <h1>Compra efetuada</h1>
                
                <div className={styles.imageContainer}>
                    <Image
                        src={product.imageUrl} alt="Camiseta"
                        width={120} height={110} />
                </div>
                
                <p>
                    Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho de sua casa
                </p>
                
                <Link href="/">
                    Voltar ao catálogo
                </Link>
            </main>
        </React.Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if(!query.sessionId) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    const sessionId = String(query.session_id)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })
    const customerName = session.customer_details!.name
    const product= session.line_items!.data[0].price?.product as Stripe.Product
    
    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}