import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FaCarrot } from 'react-icons/fa';

import {
  Title,
  TitleHeader,
  Container,
  MainContainer,
  Table,
  ProfilePicture,
  Description,
  Price,
} from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/shopcart/actions';

export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket
  const cartItens = useSelector((state) => state.shopcart.cartItens);

  useEffect(() => {
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

    async function getData() {
      setIsLoading(true);
      const response = await axios.get(`/product/?${listURL}`);
      setListProd(response.data);
      setIsLoading(false);
    }

    getData();
  }, [cartItens]);

  const getQtdos = (product) => {
    const quantity = cartItens.find((itemFind) => itemFind.id === product.id)
      .qtd;

    const priceQtd = product.price * quantity;
    const percent = priceQtd * (product.tax / 100);
    const finalPrice = (priceQtd + percent).toFixed(2);

    return (
      <>
        <p>
          <strong>Quantidade: </strong>
          {quantity} ({priceQtd.toFixed(2)}€)
        </p>
        <p>
          <strong>Iva: </strong>
          {product.tax}% ({percent.toFixed(2)}€)
        </p>
        <p>
          <strong>Preço Final: </strong>
          {finalPrice}€
        </p>
      </>
    );
  };

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <TitleHeader>CheckOut</TitleHeader>
        <Title>Faça a revisão das suas compras antes de avançar</Title>
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
                      <strong>Preço: </strong>
                      {product.price}€/{product.priceunit}
                    </p>

                    {getQtdos(product)}
                  </Price>
                  <td>remover</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </MainContainer>
  );
}
