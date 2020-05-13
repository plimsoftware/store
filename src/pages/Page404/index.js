import React from 'react';
import { Title, TitleHeader, Container404, MainContainer } from './styled';

export default function Page404() {
  return (
    <MainContainer>
      <Container404>
        <TitleHeader>401</TitleHeader>
        <Title>Ooops!! Esta página não existe</Title>
      </Container404>
    </MainContainer>
  );
}
