import { createGlobalStyle } from 'styled-components/macro';
import {transparentize} from "polished";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Lato', sans-serif;
        background-color: #F3F8FA;
        color: #274060;
    }
    
    .confirm-overlay {
        background-color: ${transparentize(0.2, '#274060')};
    }

    .info {
        background-color: ${transparentize(0.2, '#274060')};
    }

`;