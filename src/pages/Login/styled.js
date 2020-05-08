import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

export const ContainerLogin = styled.section`
  width: 600px;
  background: #fff;
  margin: 20px auto;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;
