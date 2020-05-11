import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 30px;
`;

export const Close = styled.button`
  z-index: 2;
  position: absolute;
  margin-top: 5px;
  margin-right: 5px;
  top: 0%;
  right: 0;
  color: black;
  font-size: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ProdBackColor = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -325px;
  margin-top: -200px;
  width: 650px;
  height: 400px;
  border-radius: 10px;
  z-index: 1;
  background-color: ${colors.primaryColor};
  opacity: 1;
`;

export const ProdImage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -325px;
  margin-top: -200px;
  width: 650px;
  height: 400px;
  z-index: 1;
  background-image: url('${(props) => props.url}');
  background-size: cover;
  background-color: blue;
  border-radius: 10px;
  opacity: 0.3;
`;

export const ProdContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -325px;
  margin-top: -200px;
  width: 650px;
  height: 400px;
  z-index: 2;
  display: block;
  align-items: left;
  justify-content: left;
  font-size: 30px;
  border: 0.5px solid;
  border-radius: 10px;
  border-color: rgba(110, 205, 246, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  h1 {
    margin-top: 15px;
    margin-left: 20px;
    font-size: 30px;
  }

  h2 {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: normal;
  }

  p {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    font-size: 15px;
  }

  span {
    margin-top: 40px;
    margin-right: 20px;
    float: right;
    font-size: 20px;
  }
`;

export const ProfilePicture = styled.div`
  svg {
    margin-bottom: 45px;
    align-items: center;
  }

  img {
    width: 200px;
    height: 150px;
  }

  cursor: pointer;
`;

export const ProdAddBasket = styled.section`
  font-size: 10px;
  position: absolute;
  display: flex;
  margin-right: 5px;
  bottom: 0;
  right: 0;
`;

export const QuantityDiv = styled.div`
  width: 50%;
  display: inline-flex;
  margin-bottom: 20px;
`;

export const NumberBox = styled.div`
  width: 60px;
  display: inline-flex;
  input {
    width: 40px;
    height: 30px;
    align-content: center;
    justify-content: center;
    text-align: center;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const AddRemove = styled.div`
  width: 40%;
`;

export const Button = styled.button`
  width: 15px;
  height: 14px;
  line-height: 0.25em;
  color: white;
  background-color: red;
  border: none;
  margin-bottom: 1px;
  font-size: 11px;
  align-content: center;
  justify-content: center;
  cursor: pointer;
`;

export const IconBasket = styled(Link)`
  margin-left: 10px;
`;
