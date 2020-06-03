import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaChevronCircleRight } from 'react-icons/fa';

import {
  Form,
  Container,
  Separador1,
  Separador2,
  Checkbox,
  Table,
  Avancar,
} from './styled';
import axios from '../../services/axios';
import Loading from '../Loading';
import history from '../../services/history';

export default function Step4({ nextStep }) {
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [runGetDataUser, setRunGetDataUser] = useState(true);
  const [runGetData, setRunGetData] = useState(false);
  const [runOrderDetail, setRunOrderDetail] = useState(false);
  const [runCartData, setRunCartData] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderIdBD, setOrderIdBD] = useState(0);
  // const [orderIdDetail, setOrderIdDetail] = useState([]);
  const [nameOrder, setNameOrder] = useState('');
  const [surnameOrder, setSurNomeOrder] = useState('');
  const [emailOrder, setEmailOrder] = useState('');
  const [phoneOrder, setPhoneOrder] = useState(0);
  const client = useSelector((state) => state.auth.client);
  const cartItens = useSelector((state) => state.shopcart.cartItens);
  const [address1DeliverOrder, setAddress1DeliverOrder] = useState('');
  const [address2DeliverOrder, setAddress2DeliverOrder] = useState('');
  const [locationDeliverOrder, setLocationDeliverOrder] = useState('');
  const [locationcpDeliverOrder, setLocationcpDeliverOrder] = useState('');
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket

  useEffect(() => {
    async function getDataUser() {
      try {
        setRunGetDataUser(false);
        setIsLoading(true);

        const response = await axios.get(`/clients/${client.id}`);
        const {
          name,
          surname,
          address1deliver,
          address2deliver,
          locationdeliver,
          locationcpdeliver,
          phone,
          email,
        } = response.data;

        setNameOrder(name);
        setSurNomeOrder(surname);
        setEmailOrder(email);
        setAddress1DeliverOrder(address1deliver);
        setAddress2DeliverOrder(address2deliver);
        setLocationcpDeliverOrder(locationcpdeliver);
        setLocationDeliverOrder(locationdeliver);
        setPhoneOrder(phone);

        setRunGetData(true);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
        if (status === 401) {
          errors.map(() =>
            toast.error('A sua sessão expirou fala login novamente')
          );
          history.push('/');
        }
      }
    }

    async function getData() {
      setRunGetData(false);
      try {
        const response = await axios.post('/order/', {
          client_id: client.id,
          order_address1: address1DeliverOrder,
          order_address2: address2DeliverOrder,
          order_location: locationDeliverOrder,
          order_locationcp: locationcpDeliverOrder,
          order_phone: phoneOrder,
          order_email: emailOrder,
        });

        setOrderId(response.data.orderid);
        setOrderIdBD(response.data.id);
        setRunCartData(true);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
        if (status === 401) {
          errors.map(() =>
            toast.error('A sua sessão expirou fala login novamente')
          );
          history.push('/');
        }
      }

      setIsLoading(false);
    }

    async function getCartInfo() {
      setRunCartData(false);

      // GET DATA FROM CART
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
      const responseBasket = await axios.get(`/product/?${listURL}`);

      setListProd(responseBasket.data);
      setRunOrderDetail(true);
    }

    async function getOrderDetail() {
      if (orderIdBD === 0) return;
      if (listProd.length === 0) return;

      setRunOrderDetail(false);
      try {
        for (let i = 0; i < listProd.length; i += 1) {
          const quantity = cartItens.find((item) => listProd[i].id === item.id)
            .qtd;
          axios.post('/orderdetail/', {
            order_id: orderIdBD,
            price: listProd[i].price,
            tax: listProd[i].tax,
            quantity,
            product_id: listProd[i].id,
          });
        }
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
        if (status === 401) {
          errors.map(() =>
            toast.error('A sua sessão expirou fala login novamente')
          );
          history.push('/');
        }
      }

      setIsLoading(false);
    }

    if (runGetDataUser) getDataUser();
    if (runGetData) getData();
    if (runCartData) getCartInfo();
    if (runOrderDetail) getOrderDetail();
    // if (!runGetDataUser && nameOrder !== '') setRunGetData(true);
  }, [
    runGetData,
    runOrderDetail,
    runGetDataUser,
    client.id,
    address1DeliverOrder,
    address2DeliverOrder,
    locationDeliverOrder,
    locationcpDeliverOrder,
    emailOrder,
    phoneOrder,
    nameOrder,
    orderIdBD,
    cartItens,
    listProd,
    runCartData,
  ]);

  /* function GetOrders(props) {
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
  } */

  const handleStepForward = () => {
    history.push('/');
    nextStep(1);
  };

  return (
    <>
      <Container>
        <Loading isLoading={isLoading} />
        <Form>
          <label htmlFor="order">
            Nº Ordem:
            <p className="order">{orderId}</p>
          </label>
          <label htmlFor="name">
            Nome:
            <p className="name">{nameOrder}</p>
          </label>
          <label htmlFor="surname">
            Apelido:
            <p className="surname">{surnameOrder}</p>
          </label>
          <label htmlFor="morada1">
            Morada de entrega:
            <p className="morada1">{address1DeliverOrder}</p>
          </label>
          <label htmlFor="morada2">
            Morada de entrega (cont.):
            <p className="morada2">{address2DeliverOrder}</p>
          </label>
          <div>
            <span className="local">
              <label htmlFor="localidade">
                Localidade:
                <p className="localidade">{locationDeliverOrder}</p>
              </label>
            </span>
            <span className="cp">
              <label htmlFor="localidadecp">
                Código Postal:
                <p className="localidadecp">{locationcpDeliverOrder}</p>
              </label>
            </span>
          </div>
          <label htmlFor="telefone">
            Telefone:
            <p className="telefone">{phoneOrder}</p>
          </label>
          <label htmlFor="email">
            E-mail:
            <p className="email">{emailOrder}</p>
          </label>
          <Separador1 />
          <Separador2 />
          <Checkbox>
            <span>Detalhe dos produtos adquiridos</span>
          </Checkbox>
        </Form>
      </Container>
      <Table>
        <tbody>
          <tr>
            <td />
            <td>
              <div className="col2">
                <Avancar type="submit" onClick={handleStepForward}>
                  <span className="letras">Voltar</span>
                  <span className="back">O</span>
                  <FaChevronCircleRight className="BotAvanc" size={24} />
                </Avancar>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

Step4.defaultProps = {
  nextStep: () => {},
};

Step4.propTypes = {
  nextStep: Proptype.func,
};
