import { Product } from '@/pages'
import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

interface ProductProps {
    product: Product
}

export default function ProductCard({ product }: ProductProps) {
    return (
        <Link 
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
            className={`keen-slider__slide ${styles.product}`}>
            <Image 
                src={product.imageUrl} alt="Camiseta"
                width={520} height={480} />
                
            <footer>
                <strong>
                    {product.name}
                </strong>
                <span>
                    {product.price}
                </span>
            </footer>
        </Link>
    )
}
