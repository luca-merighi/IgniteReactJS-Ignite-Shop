import { styled } from '..'

export const HomeContainer = styled('main', {
    marginLeft: 'auto',
    maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
    width: '100%',
    minHeight: '656px',
    
    display: 'flex',
})

export const Product = styled('div', {
    position: 'relative',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    color: '$gray100',
    
    borderRadius: '8px',
    cursor: 'pointer',
    overflow: 'hidden',
    
    img: {
        objectFit: 'cover'
    },
    
    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        borderRadius: '6px',
        transform: 'translateY(110%)',
        opacity: '0',
        transition: 'all 0.2s ease-in-out',
        
        strong: {
            fontSize: '&lg'
        },
        
        span: {
            fontSize: '&xl',
            fontWeight: 'bold',
            color: '$green300'
        }
    },
    
    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: '1',
        }
    }
})