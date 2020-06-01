import React, { useState } from 'react';

import {
  Title,
  TitleHeader,
  Container,
  MainContainer,
  Etapa,
  EtapaText,
  EtapaHolder,
  EtapaCont,
  EtapaOff,
  EtapaTextOff,
} from './styled';
import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';

export default function CheckOut() {
  const [etapa, setEtapa] = useState(1);

  return (
    <MainContainer>
      <Container>
        <TitleHeader>Checkout</TitleHeader>
        {etapa === 1 && (
          <Title>Faça a revisão das suas compras antes de avançar</Title>
        )}
        {etapa === 2 && (
          <Title>Verifique os seus dados para envio da encomenda</Title>
        )}
        <EtapaHolder>
          {etapa === 1 ? (
            <EtapaCont>
              <span>
                <Etapa>1</Etapa>
              </span>
              <span>
                <EtapaText>Revisão</EtapaText>
              </span>
            </EtapaCont>
          ) : (
            <EtapaCont>
              <span>
                <EtapaOff>1</EtapaOff>
              </span>
              <span>
                <EtapaTextOff>Revisão</EtapaTextOff>
              </span>
            </EtapaCont>
          )}
          {etapa === 2 ? (
            <EtapaCont>
              <span>
                <Etapa>2</Etapa>
              </span>
              <span>
                <EtapaText>Dados envio</EtapaText>
              </span>
            </EtapaCont>
          ) : (
            <EtapaCont>
              <span>
                <EtapaOff>2</EtapaOff>
              </span>
              <span>
                <EtapaTextOff>Dados envio</EtapaTextOff>
              </span>
            </EtapaCont>
          )}
          {etapa === 3 ? (
            <EtapaCont>
              <span>
                <Etapa>3</Etapa>
              </span>
              <span>
                <EtapaText>Pagamento</EtapaText>
              </span>
            </EtapaCont>
          ) : (
            <EtapaCont>
              <span>
                <EtapaOff>3</EtapaOff>
              </span>
              <span>
                <EtapaTextOff>Pagamento</EtapaTextOff>
              </span>
            </EtapaCont>
          )}
        </EtapaHolder>
        {etapa === 1 && <Step1 nextStep={(step) => setEtapa(step)} />}
        {etapa === 2 && <Step2 nextStep={(step) => setEtapa(step)} />}
      </Container>
    </MainContainer>
  );
}
