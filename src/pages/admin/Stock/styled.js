import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryDarkColor } from '../../../config/colors';

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

export const CategoryStyle = styled.select`
  font-size: 12px;
  width: 200px;
  position: relative;
  margin-left: 10px;
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

export const Table = styled.table`
  width: 100%;
  margin-top: 30px;

  td {
    vertical-align: top;
    text-align: center;
    font-size: 13px;
  }

  .prodName {
    vertical-align: top;
    text-align: left;
    font-size: 13px;
  }

  th {
    padding-bottom: 20px;
    font-size: 15px;
  }

  span {
    margin-left: 5px;
  }
`;

export const ButtonRes = styled(Link)`
  cursor: pointer;
  background: ${primaryDarkColor};
  border: none;
  color: #fff;
  border-radius: 4px;
  margin: 10px 5px 30px 5px;
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
