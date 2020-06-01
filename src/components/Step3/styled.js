import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
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
    white-space: nowrap;
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

export const Table = styled.table`
  width: 100%;
  margin-top: 40px;
  table-layout: auto;
  align-items: center;
  vertical-align: baseline;
`;
