import { globalCss } from '.'

export const GlobalStyles = globalCss({
    '*': {
        boxSizing: 'border-box',
        margin: '0',
        padding: '0',
    },
    
    'body': {
        '-webkit-font-smoothing': 'antialiased',  
        backgroundColor: '$gray900',
        color: '$white'
    },
    
    'body, input, button': {
        fontFamily: 'Roboto'
    }
})