import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Nunito Sans', sans-serif;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.2s  ease-in-out;
        width: 100%;
        min-height: 100vh;
    }

    a{
        text-decoration: none;
        color: ${({ theme }) => theme.text};

    }
`;
