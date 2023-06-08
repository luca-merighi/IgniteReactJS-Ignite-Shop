import { styled } from '..'

export const SuccessContainer = styled('main', {
    margin: '0 auto',
    height: '656px',
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    h1: {
        fontSize: '$2xl',
        color: '$gray100'
    },
    
    p: {
        marginTop: '2rem',
        maxWidth: '560px',
        
        fontSize: '$xl',
        lineHeight: '1.6',
        color: '$gray300',
        textAlign: 'center'
    },
    
    a: {
        marginTop: '5rem',
        
        textDecoration: 'none',
        fontWeight: 'bold',
        
        display: 'block',
        fontSize: '$lg',
        color: '$green500',
        
        '&:hover': {
            color: '$green300',
        }
    }
})

export const ImageContainer = styled('div', {
    marginTop: '4rem',
    
    width: '100%',
    maxWidth: '130px',
    height: '145px',
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