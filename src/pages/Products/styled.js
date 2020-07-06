import styled from 'styled-components';
import * as colors from '../../config/colors';

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const MiddleContainer = styled.div`
  max-width: 100%;
  margin-left: 100px;
  margin-top: 100px;
  width: 90%;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const MenuContainer = styled.div`
  max-width: 250px;
  left: -175px;
  position: fixed;
  background: #fff;
  margin-top: 100px;
  z-index: 10;
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

  .pagination {
    text-align: center;
    margin-top: 30px;
  }
`;

export const ProfilePicture = styled.div`
  position: relative;
  top: 0;
  left: 0;

  svg {
    margin-bottom: 45px;
    align-items: center;
  }

  .image1 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 180px;
    height: 130px;
  }

  .image2 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 180px;
    height: 130px;
    opacity: 0.5;
  }

  .image3 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 30px;
    height: 15px;
    opacity: 1;
  }

  cursor: pointer;
`;

export const ProductShow = styled.div`
  display: inline-flex;

  width: 180px;
  flex-direction: column;
  font-size: 13px;
  margin-right: 15px;
  padding: 5px;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  section {
    margin-top: 140px;
  }
`;

export const MenuItem = styled.li`
  font-size: 15px;
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

export const ProdAddBasket = styled.div`
  width: 100px;
  font-size: 10px;
  margin-top: 5px;
  display: flex;
`;

export const QuantityDiv = styled.div`
  width: 60%;
  display: flex;
`;

export const IconBasket = styled.div`
  margin-left: 10px;
  cursor: pointer;
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

export const Button2 = styled.button`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: 700;
  margin: 5px;
  transition: all 300ms;

  &:hover {
    filter: brightness(75%);
  }
`;
