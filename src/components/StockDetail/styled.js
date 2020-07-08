import styled from 'styled-components';
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
  width: 450px;
  height: 250px;
  border-radius: 10px;
  z-index: 1;
  background-color: ${colors.primaryColor};
  opacity: 1;
`;

export const ProdImage = styled.div`
  position: fixed;
  width: 450px;
  height: 250px;
  z-index: 1;
  background-image: url('${(props) => props.url}');
  background-size: cover;
  background-color: blue;
  border-radius: 10px;
  opacity: 0.3;
`;

export const ProdContainer = styled.div`
  position: fixed;
  width: 450px;
  height: 250px;
  z-index: 2;
  display: block !important;
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
    font-size: 20px;
  }

  h2 {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    font-size: 15px;
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
    font-size: 15px;
  }
`;

export const Table = styled.table`
  width: 95%;
  margin: 30px 5px 0 5px;

  td {
    width: 25%;
    vertical-align: center;
    text-align: center;
    font-size: 13px;
  }

  th {
    padding-bottom: 20px;
    width: 25%;
    text-align: center;
    font-size: 15px;
  }
`;
