import styled from 'styled-components';
import { stepOn, stepOff } from '../../config/colors';

export const Title = styled.h3`
  text-align: center;
  padding: 10px;
  font-size: 18px;
`;

export const TitleHeader = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 26px;
  font-weight: bolder;
`;

export const Container = styled.section`
  width: 1000px;
  background: #fff;
  margin: 20px auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 4px;
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const EtapaHolder = styled.section`
  margin-top: 15px;
  justify-self: center;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
`;

export const EtapaCont = styled.div`
  display: inline;
  justify-content: center;
  vertical-align: middle;
`;

export const Etapa = styled.div`
  margin: 10px 0px 10px 10px;
  background-color: ${stepOn};
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;

  font-size: 20px;
  width: 40px;
  height: 40px;
`;

export const EtapaOff = styled.div`
  margin: 10px 0px 10px 10px;
  background-color: ${stepOff};
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;

  font-size: 17px;
  width: 37px;
  height: 37px;
`;

export const EtapaText = styled.div`
  margin: 10px 10px 10px 0px;
  background-color: ${stepOn};
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  width: 180px;
  height: 25px;
`;

export const EtapaTextOff = styled.div`
  margin: 10px 10px 10px 0px;
  background-color: ${stepOff};
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 11px;
  width: 180px;
  height: 25px;
`;
