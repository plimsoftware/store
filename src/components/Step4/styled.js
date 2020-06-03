import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

export const Separador1 = styled.div`
  border-bottom: 1px solid;
  margin-top: 20px;
`;

export const Separador2 = styled.div`
  border-bottom: 1px solid;
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: 12px;
    margin-left: 10px;
    padding-top: 5px;
    font-weight: bold;
  }
`;

export const Form = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 15px;
  }

  p {
    color: black;
  }

  div {
    display: inline-flex;

    span {
      justify-content: space-between;
    }

    .cp {
      width: 20%;
    }
    .local {
      width: 80%;
      margin-right: 10px;
    }
  }
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

export const Table = styled.table`
  width: 100%;
  margin-top: 40px;
  table-layout: auto;
  align-items: center;
  vertical-align: baseline;
`;
