import React from 'react';
import { TitleHeader, Container, MainContainer } from './styled';

export default function InfoCookies() {
  return (
    <MainContainer>
      <Container>
        <TitleHeader>Local Storage / Cookies</TitleHeader>
        <p>Este site guarda informação localmente na Local Storage.</p>
        <br />
        <p>
          Esta informação é necessária para manter a sua sessão iniciada, como
          também para gerir o carrinho de compras.
        </p>
        <br />
        <p>A OnlineStore não usa cookies de terceiros.</p>
      </Container>
    </MainContainer>
  );
}
