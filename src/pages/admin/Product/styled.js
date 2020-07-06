import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryDarkColor, primaryColor } from '../../../config/colors';

export const Title = styled.h1`
  text-align: center;
  padding: 10px;
`;

export const TitleHeader = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 26px;
  font-weight: bolder;
`;

export const ProdValues = styled.span`
  width: 150px;
  display: inline-flex;
  font-size: 12px;
  margin-left: 10px;
  margin-bottom: 5px;
  align-items: center;
`;

export const Container = styled.section`
  width: 600px;
  background: #fff;
  margin: 20px auto;
  margin-top: 120px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  div {
    justify-content: center;
    display: flex;
    flex-direction: row;
    font-size: 12px;
  }

  img {
    width: 40px;
    height: 30px;
    padding-bottom: 7px;
  }

  input {
    margin-bottom: 5px;
    margin-left: 3px;
    border: none;
    background-color: white;
  }
  span {
    margin-right: 20px;
    align-items: center;
    display: inline-flex;
    margin-bottom: 5px;
    font-size: 12px;
  }

  section {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  span + span {
    margin-right: 5px;
  }
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const Option = styled(Link)`
  width: 90%;
  display: inline-flex;
  height: 60px;
  margin: 10px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
  border: none;
  color: ${primaryDarkColor};
  align-items: center;

  &:hover {
    transition: all 300ms;
    filter: brightness(95%);
  }

  .icon {
    width: 20%;
  }
  .letras {
    width: 65%;
    text-align: center;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 30px;

  td {
    vertical-align: top;
  }

  th {
    padding-bottom: 20px;
  }

  span {
    margin-left: 5px;
  }
`;

export const DivCat = styled.div`
  justify-content: left !important;
  display: flex;
  flex-direction: row;
  font-size: 12px;
`;

export const ButtonRes = styled(Link)`
  cursor: pointer;
  background: ${primaryDarkColor};
  border: none;
  color: #fff;
  border-radius: 4px;
  margin: 5px;
  font-size: 13px;
  height: 25px;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  transition: all 300ms;
  width: 300px;
  align-self: center;
  padding-top: 5px;

  &:hover {
    filter: brightness(75%);
  }
`;

export const Button = styled(Link)`
  cursor: pointer;
  background: ${primaryColor};
  border: none;
  color: #fff;
  border-radius: 4px;
  margin: 5px;
  margin-bottom: 15px;
  font-size: 12px;
  height: 25px;
  font-weight: bold;
  text-align: center;
  transition: all 300ms;
  width: 150px;
  align-self: center;
  padding-top: 4px;

  &:hover {
    filter: brightness(75%);
  }
`;
