import styled from 'styled-components';
import * as colors from '../../config/colors';

export const BasketContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 400px;
  padding-bottom: 13px;
  border-bottom-left-radius: 20px;
  top: ${(props) => (Number(props.totalItens) > 0 ? '-270px' : '-350px')};
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  background: rgba(255, 194, 137, 0.95);
  color: red;
  font-size: 15px;
  transition: all 500ms;

  ul {
    margin-bottom: 15px;
    text-align: left;
    margin-left: 20px;
    li {
      margin-bottom: 10px;
      display: flex;
      justify-items: center;

      color: black;
    }

    .botao {
      align-self: center;
      width: 15%;
      margin-left: 5px;
      cursor: pointer;
      color: red;
    }

    .item {
      width: 85%;
      text-align: left;
    }
  }

  &:hover {
    top: 0;
  }
`;

export const Avancar = styled.button`
  background-color: red;
  border: none;
  color: white;
  width: 150px;
  height: 30px;
  margin: 20px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;

  span {
    font-weight: bold;
    margin: 5px;
  }
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

export const IconBasket = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
