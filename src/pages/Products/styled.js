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
  margin-top: 100px;
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
  background-color: ${colors.primaryMenuColor};
  cursor: pointer;

  &:hover {
    transition: all 300ms;
  }
`;

export const ProdAddBasket = styled.section`
  width: 100px;
  font-size: 10px;
  background-color: yellow;
  display: flex;
`;

export const QuantityDiv = styled.div`
  width: 60%;
  background-color: red;
  display: flex;
`;

export const IconBasket = styled(Link)`
  margin-left: 10px;
`;

export const NumberBox = styled.div`
  width: 70%;
  background-color: green;
`;

export const AddRemove = styled.div`
  width: 30%;
  background-color: blue;
`;
