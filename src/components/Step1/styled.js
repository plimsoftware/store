import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  margin-top: 40px;
  table-layout: auto;
  align-items: center;
  vertical-align: baseline;
`;

export const ProfilePicture = styled.td`
  width: 100px;
  height: 100px;
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
  margin-top: 30px;
  font-size: 17px;
  text-align: right;
  border-top: 1px solid;
  padding-top: 15px;
`;

export const Avancar = styled.button`
  border: none;
  display: flex;
  cursor: pointer;
  color: red;
  float: right;
  position: relative;
  right: 0;

  .BotAvanc {
    z-index: 3;
    color: red;
    position: absolute;
    float: right;
    right: 0;
  }

  .back {
    z-index: 2;
    background-color: white;
    color: white;
    width: 22px;
    font-size: 20px;
    border-radius: 50%;
    float: right;
    position: absolute;
    right: 0;
  }

  .letras {
    background-color: red;
    float: right;
    z-index: 1;
    padding: 5px;
    padding-right: 12px;
    font-size: 12px;
    position: absolute;
    right: 13px;

    color: white;
  }
`;

export const Voltar = styled.button`
  border: none;
  display: flex;
  cursor: pointer;
  color: red;
  float: left;
  position: relative;
  left: 0;

  .BotAvanc {
    z-index: 3;
    color: red;
    position: absolute;
    float: left;
    left: 0;
  }

  .back {
    z-index: 2;
    background-color: white;
    color: white;
    width: 22px;
    font-size: 20px;
    border-radius: 50%;
    float: left;
    position: absolute;
    left: 0;
  }

  .letras {
    background-color: red;
    float: left;
    z-index: 1;
    padding: 5px;
    padding-left: 14px;
    padding-right: 12px;
    font-size: 12px;
    position: absolute;
    left: 13px;

    color: white;
  }
`;

export const TableB = styled.table`
  width: 100%;
  margin-top: 40px;
  table-layout: auto;
  align-items: center;
  vertical-align: baseline;
`;
