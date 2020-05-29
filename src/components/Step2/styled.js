import styled from 'styled-components';
import * as colors from '../../config/colors';

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

  input {
    height: 30px;
    font-size: 13px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 5px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
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
