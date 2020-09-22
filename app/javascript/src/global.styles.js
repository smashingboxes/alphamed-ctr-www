import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html {
        font-size: 16px;
    }

    div {
        box-sizing: border-box;
    }

    body {
        font-family: 'Franklin Gothic Medium', arial;
        box-sizing: border-box;
    }
`;
