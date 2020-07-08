import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryDarkColor } from '../../../config/colors';

export const TitleHeader = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 26px;
  font-weight: bolder;
  margin-bottom: 20px;
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
  }

  input {
    margin-bottom: 5px;
  }
  span {
    margin-right: 20px;
  }

  section {
    justify-content: center;
    display: flex;
    flex-direction: row;
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

export const Newdiv = styled.div`
  margin-top: 10px;
`;

export const ButtonRes = styled(Link)`
  cursor: pointer;
  background: ${primaryDarkColor};
  border: none;
  color: #fff;
  border-radius: 4px;
  margin: 5px;
  font-size: 13px;
  height: 20px;
  font-weight: bold;
  text-align: center;
  transition: all 300ms;
  width: 300px;
  align-self: center;
  padding-top: 3px;

  &:hover {
    filter: brightness(75%);
  }
`;
