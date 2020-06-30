import styled from 'styled-components';
import * as colors from '../../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    font-size: 14px;
  }

  .discount {
    width: 100px;
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

  textarea {
    font-size: 13px;
    border: 1px solid #ddd;
    padding: 10px;
    resize: none;
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

export const Title = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 25px;
`;

export const Container = styled.section`
  width: 600px;
  background: #fff;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin-top: 100px;
  padding: 20px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  p {
    color: grey;
    font-size: 12px;
    text-align: center;
  }

  img {
    width: 140px;
    height: 130px;
    padding-bottom: 7px;
  }
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
`;

export const BDiv = styled.div`
  display: flex !important;
  width: 550px;
  flex-direction: column;
  align-self: center;
`;

export const CategoryStyle = styled.select`
  font-size: 12px;
  width: 200px;
  position: relative;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  cursor: pointer;
  background: ${colors.primaryDarkColor};
  border: none;
  color: #fff;

  padding: 10px 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  margin: 5px;
  transition: all 300ms;

  &:hover {
    filter: brightness(75%);
  }
`;

export const Button2 = styled.button`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;

  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  margin: 5px;
  transition: all 300ms;

  &:hover {
    filter: brightness(75%);
  }
`;

export const PriceDiv = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row !important;

  label {
    margin-bottom: 15px;
    width: 50%;
    font-size: 14px;
  }

  input {
    width: 70%;
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
`;
