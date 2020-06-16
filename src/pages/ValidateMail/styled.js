import styled from 'styled-components';

export const Title = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 20px;
`;

export const Container = styled.section`
  width: 600px;
  background: #fff;
  margin: 20px auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  p {
    font-size: 15px;
    text-align: center;
  }
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;
