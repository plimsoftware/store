import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaCarrot,
  FaTimesCircle,
  FaChevronCircleRight,
  FaChevronCircleLeft,
} from 'react-icons/fa';

import {
  Title,
  TitleHeader,
  Container,
  MainContainer,
  Table,
  ProfilePicture,
  Description,
  Price,
  QuantityDiv,
  NumberBox,
  AddRemove,
  Button,
  Remover,
  Total,
  Etapa,
  EtapaText,
  EtapaHolder,
  EtapaCont,
  EtapaOff,
  EtapaTextOff,
  Avancar,
  Voltar,
  Botton,
} from './styled';
import axios from '../../services/axios';
import Loading from '../Loading';
import * as actions from '../../store/modules/shopcart/actions';
import history from '../../services/history';

export default function Step1() {
  const dispatch = useDispatch();
  let cartItens = useSelector((state) => state.shopcart.cartItens);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket
  const [totalCompra, setTotalCompra] = useState(0);
  const [etapa, setEtapa] = useState(1);
  const [runGetData, setRunGetData] = useState(true);
  const [inputFields, setInputFields] = useState([]); // Campos quantidade

  function ShowTotal() {
    if (listProd.length === 0) return;
    let getTotal = 0;
    const values = [...inputFields];

    listProd.forEach((prod, index) => {
      let quantity = cartItens.find((item) => prod.id === item.id);

      if (quantity) {
        quantity = quantity.qtd;
      } else {
        quantity = 0;
      }

      const prodQtd = prod.price * quantity;
      getTotal += prodQtd;
      getTotal.toFixed(2);
      values[index] = quantity;
    });
    setInputFields(values);
    setTotalCompra(getTotal.toFixed(2));
  }

  useEffect(() => {
    function setInputsInitial(length) {
      const newInputFields = [];
      for (let i = 0; i < length; i += 1) {
        newInputFields.push('0');
      }
      setInputFields(newInputFields);
    }

    async function getData() {
      setRunGetData(false);

      const newList = [];
      cartItens.map((itens) => {
        newList.push(itens.id);

        return newList;
      });
      const listURL = newList
        .map((el, idx) => {
          return `list[${idx}]=${el}`;
        })
        .join('&');

      if (cartItens.length === 0) {
        setListProd([]);
        return;
      }
      setIsLoading(true);
      const response = await axios.get(`/product/?${listURL}`);

      setListProd(response.data);

      setInputsInitial(response.data.length);
      setIsLoading(false);
    }

    if (runGetData) getData();
    ShowTotal();
  }, [cartItens, listProd]);

  function GetQtdos(props) {
    const { product } = props;
    let quantity = cartItens.find((itemFind) => itemFind.id === product.id);

    if (quantity) {
      quantity = quantity.qtd;
    } else {
      quantity = 0;
    }

    const priceQtd = product.price * quantity;
    const finalPrice = priceQtd.toFixed(2);

    return (
      <>
        <p>
          <strong>Quantidade: </strong>
          {quantity}
        </p>
        <p>
          <strong>Preço total: </strong>
          {finalPrice}€
        </p>
      </>
    );
  }

  GetQtdos.defaultProps = {
    product: {},
  };

  GetQtdos.propTypes = {
    product: Proptype.shape([]),
  };

  const handleInputChange = (index, evt) => {
    const values = [...inputFields];
    values[index] = Math.abs(evt.target.value);
    setInputFields(values);
  };

  const handleInputBUp = (index, prodID, name) => {
    const values = [...inputFields];
    let newValue = Number(values[index]);
    const qtd = 1;
    newValue += 1;
    values[index] = newValue;
    setInputFields(values);

    dispatch(actions.addIten({ prodID, name, qtd }));
    ShowTotal();
  };

  const handleInputBDown = (index, prodID, name) => {
    const values = [...inputFields];
    let newValue = Number(values[index]);
    let qtd = -1;
    newValue -= 1;
    if (newValue < 0) {
      newValue = 0;
      qtd = 0;
    }
    values[index] = newValue;
    setInputFields(values);

    dispatch(actions.addIten({ prodID, name, qtd }));
    ShowTotal();
  };

  const deleteItenCart = (e) => {
    const id = e.currentTarget.name;
    if (id) {
      dispatch(actions.removeIten(id));
      cartItens = 0;
    }
    setRunGetData(true);
  };

  const handleStepBack = () => {
    switch (etapa) {
      case 1:
        history.push('/');
        break;
      case 2:
        break;
      case 3:
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
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  };

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <TitleHeader>Checkout</TitleHeader>
        <Title>Faça a revisão das suas compras antes de avançar</Title>
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
        <Table>
          <tbody>
            {listProd.length === 0 || listProd == null ? (
              <tr>
                <td>
                  <strong>Carrinho sem produtos.</strong>
                </td>
              </tr>
            ) : (
              listProd.map((product, index) => (
                <tr key={product.id}>
                  <ProfilePicture>
                    {get(product, 'Photo.url', false) ? (
                      <img src={product.Photo.url} alt="" />
                    ) : (
                      <FaCarrot size={50} />
                    )}
                  </ProfilePicture>
                  <Description>
                    <h4>{product.name}</h4>
                    <br />
                    <p>{product.short_desc}</p>
                  </Description>
                  <Price>
                    <p>
                      <strong>Preço unitário: </strong>
                      {product.price}€/{product.priceunit}
                    </p>
                    <GetQtdos product={product} />
                  </Price>
                  <td>
                    <QuantityDiv>
                      <NumberBox>
                        <input
                          disabled
                          type="number"
                          name={product.id}
                          value={inputFields[index] || 0}
                          onChange={(evt) => handleInputChange(index, evt)}
                        />
                      </NumberBox>
                      <AddRemove>
                        <Button
                          onClick={() =>
                            handleInputBUp(index, product.id, product.name)
                          }
                        >
                          +
                        </Button>
                        <br />
                        <Button
                          onClick={() =>
                            handleInputBDown(index, product.id, product.name)
                          }
                        >
                          -
                        </Button>
                      </AddRemove>
                    </QuantityDiv>
                  </td>
                  <td>
                    <Remover
                      name={product.id}
                      onClick={(evt) => deleteItenCart(evt)}
                    >
                      <FaTimesCircle size={15} />
                      <span>Remover</span>
                    </Remover>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Total>
          <p>Preço final: {totalCompra}€ </p>
        </Total>
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
        <Botton />
      </Container>
    </MainContainer>
  );
}
