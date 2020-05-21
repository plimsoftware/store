import styled from 'styled-components';

export const Title = styled.h3`
  text-align: center;
  padding: 10px;
`;

export const TitleHeader = styled.h1`
  text-align: center;
  padding: 10px;
  font-size: 30px;
  font-weight: bolder;
`;

export const Container = styled.section`
  width: 1000px;
  background: #fff;
  margin: 20px auto;
  margin-top: 120px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const MainContainer = styled.section`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 40px;
  border: 1px solid;
  table-layout: fixed;
`;

export const ProfilePicture = styled.td`
  border: solid 1px;
  width: 100px;
  padding: 5px;

  img {
    width: 80%;
    height: 50%;
  }
`;

export const Description = styled.td`
  border: solid 1px;
  font-size: 13px;
  padding: 5px;
  width: 45%;

  p {
    margin-bottom: 10px;
  }
`;

export const Price = styled.td`
  border: solid 1px;
  font-size: 13px;
  padding: 5px;
  width: 20%;

  p {
    margin-bottom: 10px;
  }
`;
