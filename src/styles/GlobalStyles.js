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



  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    color: ${colors.primaryColor};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.sucessColor};
    font-size: 13px;

  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.errorColor};
    font-size: 13px;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--warn {
    background: ${colors.warningColor};
    font-size: 13px;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--info {
    background: ${colors.infoColor};
    font-size: 13px;
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
