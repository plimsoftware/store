import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 30px;
`;

export const Close = styled.button`
  z-index: 4;
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

export const ProdContainer = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
  z-index: 3;
  display: block !important;
  align-items: left;
  justify-content: left;
  background-color: ${colors.primaryDarkColor};
  border: 0.5px solid;
  border-radius: 10px;
  border-color: rgba(110, 205, 246, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  h1 {
    margin-top: 15px;
    margin-left: 20px;
    font-size: 20px;
  }

  h2 {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    font-size: 15px;
    font-weight: normal;
  }

  span {
    margin-top: 40px;
    margin-right: 20px;
    float: right;
    font-size: 15px;
  }

  label {
    margin-left: 5px;
  }

  fieldset {
    padding: 10px 10px 10px 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 17px;
    font-size: 12px;
  }

  legend {
    padding: 0 5px 0 5px;
  }

  input {
    margin-top: 5px;
    width: 100px;
    padding-left: 5px;
    font-size: 12px;
  }
`;

export const Button = styled.button`
  width: 25px;
  height: 15px;
  color: black;
  background-color: ${colors.primaryColor};
  border: none;
  margin-left: 5px;
  font-size: 11px;
  align-content: center;
  justify-content: center;
  cursor: pointer;
`;
