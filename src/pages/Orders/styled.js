import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 25px;
  margin-bottom: 50px;
`;

export const Container = styled.section`
  width: 900px;
  background: #fff;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-size: 15px;
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const Table = styled.table`
  font-size: 12px;

  align-items: center;
  width: 100%;
  vertical-align: baseline;
  text-align: center;

  tr {
    cursor: pointer;
  }

  td {
    padding-right: 10px;
    padding-bottom: 5px;
  }

  th {
    padding-right: 10px;
    padding-bottom: 15px;
  }
`;

export const MasterTable = styled.table`
  td {
    vertical-align: top;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  width: 50%;
  border-radius: 4px;
  font-weight: 700;
  margin: 5px;
  margin-top: 15px;
  transition: all 300ms;
  justify-content: center;
  align-self: center;

  &:hover {
    filter: brightness(75%);
  }
`;

export const Detalhe = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;

  span {
    color: ${colors.primaryDarkColor};
    font-size: 13px;
  }
`;
