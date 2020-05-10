import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const MiddleContainer = styled.div`
  max-width: 100%;
  margin-left: 100px;
  margin-top: 120px;
  width: 90%;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const MenuContainer = styled.div`
  max-width: 250px;
  left: -210px;
  position: fixed;
  background: #fff;
  margin-top: 120px;
  margin-right: 10px;
  padding: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgba(110, 205, 246, 0.5);
  transition: all 500ms;

  &:hover {
    left: 0;
  }
`;

export const ProductContainer = styled.div`
  margin-top: 20px;
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
`;

export const ProductShow = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-right: 15px;
  padding: 5px;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
`;

export const MenuItem = styled.li`
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: 0.5px solid;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  margin-bottom: 2px;
  background-color: ${colors.primaryColor};
  cursor: pointer;

  &:hover {
    transition: all 300ms;
    filter: brightness(75%);
  }
`;

export const ProdAddBasket = styled.section`
  width: 100px;
  font-size: 10px;
  margin-top: 5px;
  display: flex;
`;

export const QuantityDiv = styled.div`
  width: 60%;
  display: flex;
`;

export const IconBasket = styled(Link)`
  margin-left: 10px;
`;

export const NumberBox = styled.div`
  width: 60px;
  justify-content: left;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input {
    width: 40px;
    height: 30px;
    align-content: center;
    justify-content: center;
    text-align: center;
  }
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

export const AddRemove = styled.div`
  width: 40%;
`;
