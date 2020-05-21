import styled from 'styled-components';

export const BasketContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 400px;
  padding-bottom: 13px;
  border-bottom-left-radius: 20px;
  top: ${(props) => (Number(props.totalItens) > 0 ? '-270px' : '-350px')};
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  background: rgba(255, 194, 137, 0.95);
  color: red;
  font-size: 13px;
  transition: all 500ms;

  ul {
    margin-bottom: 15px;
    text-align: left;
    margin-left: 20px;
    li {
      margin-bottom: 10px;
      display: flex;
      justify-items: center;

      color: black;
    }

    .botao {
      align-self: center;
      width: 15%;
      margin-left: 5px;
      cursor: pointer;
      color: red;
    }

    .item {
      width: 85%;
      text-align: left;
    }
  }

  &:hover {
    top: 0;
  }
`;

export const Avancar = styled.button`
  background-color: red;
  border: none;
  color: white;
  width: 150px;
  height: 30px;
  margin: 20px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;

  span {
    font-weight: bold;
    margin: 5px;
  }
`;
