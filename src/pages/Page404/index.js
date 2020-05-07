import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Title, TitleHeader } from './styled';

export default function Page404() {
  return (
    <Container>
      <TitleHeader>401</TitleHeader>
      <Title>Ooops!! Esta página não existe</Title>
    </Container>
  );
}
