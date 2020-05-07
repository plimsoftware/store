import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: #fff;
    color: ${colors.primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;
  }

  button:hover {
    filter: brightness(75%);
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    color: ${colors.primaryColor};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.sucessColor}
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.errorColor}
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--warn {
    background: ${colors.warningColor}
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--info {
    background: ${colors.infoColor}
  }
`;

export const Container = styled.section`
  max-width: 70%;
  background: #fff;
  margin: 20px auto;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;
