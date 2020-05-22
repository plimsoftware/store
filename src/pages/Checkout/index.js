import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useSelector } from 'react-redux';
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

export default function CheckOut() {
  const cartItens = useSelector((state) => state.shopcart.cartItens);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket
  const [totalCompra, setTotalCompra] = useState(0);
  const [totalIva, setTotalIva] = useState([]);
  const [runGetData, setRunGetData] = useState(true);

  useEffect(() => {
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
      setIsLoading(true);
      const response = await axios.get(`/product/?${listURL}`);
      setListProd(response.data);
      setIsLoading(false);
    }

    function ShowTotal() {
      if (listProd.length === 0) return;

      let getTotal = totalCompra;
      const getIva = [...totalIva];

      listProd.forEach((prod) => {
        const quantity = cartItens.find((item) => prod.id === item.id).qtd;
        getTotal += prod.price * quantity;

        const percent = getTotal * (prod.tax / 100);

        if (getIva.length === 0) {
          getIva.push({
            tax: prod.tax,
            total: Number(percent.toFixed(2)),
          });
        } else {
          const index = getIva.indexOf(prod.tax);
          if (index > -1) {
            getIva[index].total += Number(percent.toFixed(2));
          }
        }
      });
      setTotalCompra(getTotal.toFixed(2));
      setTotalIva(getIva);
    }

    if (runGetData) getData(ShowTotal);
    ShowTotal();
  }, [cartItens, listProd]);

  function GetQtdos(props) {
    const { product } = props;
    const quantity = cartItens.find((itemFind) => itemFind.id === product.id)
      .qtd;

    const priceQtd = product.price * quantity;
    const finalPrice = priceQtd.toFixed(2);

    return (
      <>
        <p>
          <strong>Quantidade: </strong>
          {quantity}
        </p>
        <p>
          <strong>Preço final: </strong>
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
              listProd.map((product) => (
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
                  <td>remover</td>
                </tr>
              ))
            )}
            <tr>
              <td>
                <p>Preço final: {totalCompra}€ </p>
              </td>
            </tr>
            {totalIva.map((iva) => (
              <tr key={iva}>
                <td>
                  <p>
                    Iva {iva.tax}%: {iva.total}€
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </MainContainer>
  );
}
