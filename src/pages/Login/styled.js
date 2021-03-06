import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  margin-bottom: 50px;
`;

export const ContainerLogin = styled.section`
  width: 500px;
  background: #fff;
  margin: 20px auto;
  margin-top: 120px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const Button = styled.button`
  cursor: pointer;
  background: ${colors.primaryDarkColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  margin: 5px;
  transition: all 300ms;

  &:hover {
    filter: brightness(75%);
  }
`;

export const Button2 = styled.button`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  margin: 5px;
  transition: all 300ms;

  &:hover {
    filter: brightness(75%);
  }
`;

export const ButtonRes = styled(Link)`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  margin: 5px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  transition: all 300ms;

  &:hover {
    filter: brightness(75%);
  }
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;
