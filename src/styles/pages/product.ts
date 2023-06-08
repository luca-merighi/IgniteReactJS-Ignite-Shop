import { styled } from '..'

export const ProductContainer = styled('main', {
    margin: '0 auto',
    maxWidth: '1180px',
    
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',
    gap: '4rem',
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: '576px',
    height: 'calc(656px - 0.5rem)',
    padding: '0.25rem',
    
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    borderRadius: '8px',
    
    img: {
        objectFit: 'cover'
    }
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    
    h1: {
        fontSize: '$2xl',
        color: '$gray300'
    },
    
    span: {
        marginTop: '1rem',
        
        display: 'block',
        
        fontSize: '$2xl',
        color: '$green300'
    },
    
    p: {
        marginTop: '2.5rem',
        
        fontSize: '$md',
        lineHeight: '1.6',
        color: '$gray300'
    },
    
    button: {
        marginTop: 'auto',
        
        padding: '1.25rem',
        backgroundColor: '$green500',
        
        fontSize: '$md',
        color: '$white',
        
        border: '0',
        borderRadius: '8px',
        cursor: 'pointer',
        
        '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed'
        },
        
        '&:hover': {
            backgroundColor: '$green300',
        }
    }
})