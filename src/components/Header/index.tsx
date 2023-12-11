import Image from 'next/image'
import styles from './styles.module.scss'

export default function Header() {
    return (
        <header className={styles.header}>
            <Image 
                src="/logo.svg" 
                alt="Logo Ignite Shop" 
                width={130} height={52} />
        </header>
    )
}