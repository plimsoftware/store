import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaCarrot, FaTimesCircle } from 'react-icons/fa';

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
} from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/shopcart/actions';

export default function CheckOut() {
  const dispatch = useDispatch();
  let cartItens = useSelector((state) => state.shopcart.cartItens);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket
  const [totalCompra, setTotalCompra] = useState(0);
  // const [totalIva, setTotalIva] = useState([]);
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
    // if (qtd === 0) dispatch(actions.removeIten(id));
  };

  const deleteItenCart = (e) => {
    const id = e.currentTarget.name;
    console.log(id);
    if (id) {
      dispatch(actions.removeIten(id));
      cartItens = 0;
    }
    setRunGetData(true);
  };

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <TitleHeader>Checkout</TitleHeader>
        <Title>Faça a revisão das suas compras antes de avançar</Title>
        <div>
          <span>
            <Etapa>1</Etapa>
          </span>
          <span>
            <EtapaText>Revisão</EtapaText>
          </span>
          <span>
            <Etapa>2</Etapa>
          </span>
          <span>
            <EtapaText>Dados envio</EtapaText>
          </span>
          <span>
            <Etapa>3</Etapa>
          </span>
          <span>
            <EtapaText>Pagamento</EtapaText>
          </span>
        </div>
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
      </Container>
    </MainContainer>
  );
}
