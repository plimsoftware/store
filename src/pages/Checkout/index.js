import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

import {
  Title,
  TitleHeader,
  Container,
  MainContainer,
  Table,
  Etapa,
  EtapaText,
  EtapaHolder,
  EtapaCont,
  EtapaOff,
  EtapaTextOff,
  Avancar,
  Voltar,
} from './styled';
import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import history from '../../services/history';

export default function CheckOut() {
  const [etapa, setEtapa] = useState(1);
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket

  const getDataStep1 = (dataFromStep1) => {
    setListProd(dataFromStep1);
  };

  const handleStepBack = () => {
    switch (etapa) {
      case 1:
        history.push('/');
        break;
      case 2:
        setEtapa(1);
        break;
      case 3:
        setEtapa(2);
        break;
      default:
        break;
    }
  };

  const handleStepForward = () => {
    switch (etapa) {
      case 1:
        if (listProd.length === 0 || listProd == null) {
          toast.warn('Sem produtos no carrinho!');
          history.push('/');
          break;
        }
        setEtapa(2);
        break;
      case 2:
        setEtapa(3);
        break;
      case 3:
        break;
      default:
        break;
    }
  };

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
        {etapa === 1 && <Step1 getDataStep1={(list) => getDataStep1(list)} />}
        {etapa === 2 && <Step2 />}
        <Table>
          <tbody>
            <tr>
              <td>
                <div className="col1">
                  <Voltar type="submit" onClick={handleStepBack}>
                    <span className="letras">Voltar</span>
                    <span className="back">O</span>
                    <FaChevronCircleLeft className="BotAvanc" size={24} />
                  </Voltar>
                </div>
              </td>
              <td>
                <div className="col2">
                  <Avancar type="submit" onClick={handleStepForward}>
                    <span className="letras">Avançar</span>
                    <span className="back">O</span>
                    <FaChevronCircleRight className="BotAvanc" size={24} />
                  </Avancar>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </MainContainer>
  );
}
