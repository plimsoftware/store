import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaChevronCircleRight } from 'react-icons/fa';

import {
  Form,
  Container,
  Separador1,
  Separador2,
  Checkbox,
  MyTable,
  MyTable2,
  Avancar,
  OrderList,
  Detail,
  DetailTotal,
} from './styled';
import axios from '../../services/axios';
import Loading from '../Loading';
import history from '../../services/history';
import * as actions from '../../store/modules/shopcart/actions';

export default function Step4({ nextStep }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [runGetDataUser, setRunGetDataUser] = useState(true);
  const [runGetData, setRunGetData] = useState(false);
  const [runOrderDetail, setRunOrderDetail] = useState(false);
  const [runGetOrderDetail, setRunGetOrderDetail] = useState(false);
  const [runCartData, setRunCartData] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderIdBD, setOrderIdBD] = useState(0);
  const [orderDetail, setOrdedDetail] = useState([]);
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
  const [total, setTotal] = useState(0);
  const [taxList, setTaxList] = useState([]);

  useEffect(() => {
    // GET dos dados do cliente
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

    // Criação da Ordem
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
          nrstockout: 0,
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

    // Criação das OrderDetails
    async function setOrderDetail() {
      if (orderIdBD === 0) return;
      if (listProd.length === 0) return;
      let semStock = false;
      let orderStatus = 'Ok';

      setRunOrderDetail(false);
      try {
        let newTotal = total;
        const taxArray = [];
        for (let i = 0; i < listProd.length; i += 1) {
          const quantity = cartItens.find((item) => listProd[i].id === item.id)
            .qtd;
          const { name } = cartItens.find((item) => listProd[i].id === item.id);

          if (listProd[i].myStock.store < quantity) {
            semStock = true;
            orderStatus = 'Sem stock';
          }

          const newListProd = [...listProd];

          if (newListProd[i].discount > 0) {
            const percentDis =
              (newListProd[i].price * newListProd[i].discount) / 100;
            newListProd[i].price -= percentDis;
            setListProd(newListProd);
          }

          // Cria OrderDetail
          axios.post('/orderdetail/', {
            order_id: orderIdBD,
            name,
            price: newListProd[i].price,
            tax: newListProd[i].tax,
            quantity,
            status: orderStatus,
            product_id: newListProd[i].id,
          });

          // Update Stock
          if (!semStock) {
            // eslint-disable-next-line no-await-in-loop
            const { data } = await axios.get(`/stock/${newListProd[i].id}`);

            axios.put(`/stock/${newListProd[i].id}`, {
              store: data.stock.store - quantity,
              expedition: data.stock.expedition + quantity,
            });
          }

          newTotal += quantity * newListProd[i].price;

          const percentage = (
            quantity *
            newListProd[i].price *
            (newListProd[i].tax / 100)
          ).toFixed(2);

          const existedItem = taxArray.find(
            (item) => newListProd[i].tax === item.tax
          );
          if (existedItem) {
            const index = taxArray.findIndex(
              (item) => item.tax === existedItem.tax
            );
            if (index > -1) {
              taxArray[index].sumTax += Number(percentage);
              taxArray[index].sumValue += quantity * newListProd[i].price;
            }
          } else {
            taxArray.push({
              tax: newListProd[i].tax,
              sumTax: Number(percentage),
              sumValue: quantity * newListProd[i].price,
            });
          }
        }
        setTotal(newTotal);
        setTaxList(taxArray);
        setRunGetOrderDetail(true);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        // history.push('/');
        if (status === 401) {
          errors.map(() =>
            toast.error('A sua sessão expirou fala login novamente')
          );
          history.push('/');
        }
      }

      if (semStock) {
        try {
          axios.get(`/order/${orderId}`).then(({ data }) => {
            axios.put(`/order/${orderId}`, {
              ship_status: 'Sem stock',
              nrstockout: data.nrstockout + 1,
            });
          });
        } catch (err) {
          const status = get(err, 'response.status', 0);
          const errors = get(err, 'response.data.errors', []);

          if (status === 400) errors.map((error) => toast.error(error));
          // history.push('/');
          if (status === 401) {
            errors.map(() =>
              toast.error('A sua sessão expirou fala login novamente')
            );
            history.push('/');
          }
        }
      }
      setIsLoading(false);
    }

    async function getOrderDetail() {
      if (orderId === 0) return;
      setRunGetOrderDetail(false);
      try {
        const { data } = await axios.get(`/order/${orderId}`);
        setOrdedDetail(data.Orderdetails);
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
    if (runOrderDetail) setOrderDetail();
    if (runGetOrderDetail) getOrderDetail();
  }, [
    runGetData,
    runOrderDetail,
    runGetDataUser,
    runGetOrderDetail,
    client.id,
    address1DeliverOrder,
    address2DeliverOrder,
    locationDeliverOrder,
    locationcpDeliverOrder,
    emailOrder,
    phoneOrder,
    nameOrder,
    orderIdBD,
    orderDetail,
    cartItens,
    listProd,
    runCartData,
    orderId,
    total,
    taxList,
  ]);

  function GetOrders(props) {
    const { detail } = props;
    if (detail.length !== cartItens.length) return <></>;
    // dispatch(actions.clearShopCart());
    return (
      <Detail>
        <MyTable2>
          <tbody>
            {detail.map((product) => (
              <tr key={product.id}>
                <td>{product.tax}%</td>
                <td>{product.name}</td>
                <td>
                  {product.price.toFixed(2)}€ x {product.quantity}
                </td>
                <td>{(product.price * product.quantity).toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </MyTable2>
        <DetailTotal>Total a pagar: {total.toFixed(2)}€</DetailTotal>
        <MyTable2>
          <tbody>
            <tr>
              <td>
                <strong>Taxa</strong>
              </td>
              <td>
                <strong>Valor s/IVA</strong>
              </td>
              <td>
                <strong>Valor IVA</strong>
              </td>
              <td>
                <strong>Valor c/IVA</strong>
              </td>
            </tr>
            {taxList.map((taxItem) => (
              <tr key={taxItem.tax}>
                <td>{taxItem.tax}%</td>
                <td>{(taxItem.sumValue - taxItem.sumTax).toFixed(2)}€</td>
                <td>{taxItem.sumTax.toFixed(2)}€</td>
                <td>{taxItem.sumValue.toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </MyTable2>
      </Detail>
    );
  }

  GetOrders.defaultProps = {
    detail: {},
  };

  GetOrders.propTypes = {
    detail: Proptype.arrayOf(Proptype.shape({})),
  };

  const handleStepForward = () => {
    dispatch(actions.clearShopCart());
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
          <OrderList>
            <GetOrders detail={orderDetail} />
          </OrderList>
        </Form>
      </Container>
      <MyTable>
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
      </MyTable>
    </>
  );
}

Step4.defaultProps = {
  nextStep: () => {},
};

Step4.propTypes = {
  nextStep: Proptype.func,
};
