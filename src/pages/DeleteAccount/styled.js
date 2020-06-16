import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryDarkColor } from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 17px;
`;

export const TitleHeader = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 26px;
  font-weight: bolder;
  margin-bottom: 10px;
`;

export const Container = styled.section`
  width: 600px;
  background: #fff;
  margin: 20px auto;
  margin-top: 120px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const OptionLink = styled(Link)`
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
  cursor: pointer;

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

export const Option = styled.section`
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
  cursor: pointer;

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
  table-layout: auto;
  align-items: center;
  vertical-align: baseline;
`;
