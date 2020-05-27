import styled from 'styled-components';

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

export const Table = styled.table`
  width: 100%;
  margin-top: 40px;
  table-layout: auto;
  align-items: center;
  vertical-align: baseline;
`;

export const ProfilePicture = styled.td`
  width: 100px;
  padding: 5px;

  img {
    width: 80%;
    height: 50%;
  }
`;

export const Description = styled.td`
  font-size: 13px;
  padding: 5px;
  width: 45%;

  p {
    margin-bottom: 10px;
  }
`;

export const Price = styled.td`
  font-size: 13px;
  padding: 5px;
  width: 20%;

  p {
    margin-bottom: 10px;
  }
`;

export const QuantityDiv = styled.div`
  width: 80px;
  display: flexbox;
  vertical-align: inherit;
  justify-content: center;
  align-items: center;
`;

export const NumberBox = styled.div`
  width: 40px;
  align-content: center;
  justify-content: center;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input {
    align-self: center;
    width: 30px;
    height: 20px;
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

export const Remover = styled.button`
  background-color: red;
  border: none;
  display: flex;
  color: white;
  width: 100px;
  height: 30px;
  margin: 20px;
  border-radius: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  span {
    padding-left: 10px;
  }
`;

export const Total = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: right;
`;

export const Etapa = styled.div`
  margin: 10px;
  background-color: red;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;

  font-size: 25px;
  width: 45px;
  height: 45px;
`;

export const EtapaText = styled.div`
  margin: 10px;
  background-color: red;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;

  font-size: 15px;
  width: 200px;
  height: 30px;
`;
