import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  Title,
  Container,
  MainContainer,
  Table,
  Button,
  Detalhe,
  MasterTable,
} from './styled';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Orders() {
  const [runGetData, setRunGetData] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [orderList, setOrderList] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const id = useSelector((state) => state.auth.client.id);

  useEffect(() => {
    async function getData() {
      setRunGetData(false);
      setIsLoading(true);

      try {
        const response = await axios.get(`/order/client/${id}`);
        setOrderList(response.data);
      } catch (err) {
        toast.error('Não foi possivel carregar as ordens!');
      }

      setIsLoading(false);
    }

    if (runGetData) getData();
  }, [runGetData, id]);

  // Função para formatar a Data.
  function zeroEsquerda(num) {
    return num >= 10 ? num : `0${num}`;
  }

  function setDate(myDate) {
    const dataSent = new Date(myDate);
    return `${zeroEsquerda(dataSent.getDate())}/${zeroEsquerda(
      dataSent.getMonth() + 1
    )}/${dataSent.getFullYear()}`;
  }

  const handleClick = (evt) => {
    evt.preventDefault();
    history.push('/profile');
  };

  async function showOrder(orderId) {
    try {
      const response = await axios.get(`/order/${orderId}`);
      setOrderDetail(response.data);
    } catch (err) {
      toast.error(`Não foi possivel carregar a ordem ${orderId}!`);
    }
  }

  function ShowOrder() {
    if (orderList.length === 0) return <>Ainda não efectuou nenhuma ordem</>;

    return (
      <>
        <Table>
          <tbody>
            <tr>
              <th>Nº Ordem</th>
              <th>Estado</th>
              <th>Data</th>
            </tr>
            {orderList.map((order) => (
              <tr key={order.id} onClick={() => showOrder(order.orderid)}>
                <td>{order.orderid}</td>
                <td>{order.ship_status}</td>
                <td>{setDate(order.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }

  function ShowTotal() {
    if (Object.entries(orderDetail).length === 0) return <></>;
    const { Orderdetails } = orderDetail;

    let total = 0;
    const taxArray = [];

    for (let i = 0; i < Orderdetails.length; i += 1) {
      total += Orderdetails[i].quantity * Orderdetails[i].price;

      const percentage = (
        Orderdetails[i].quantity *
        Orderdetails[i].price *
        (Orderdetails[i].tax / 100)
      ).toFixed(2);

      const existedItem = taxArray.find(
        (item) => Orderdetails[i].tax === item.tax
      );
      if (existedItem) {
        const index = taxArray.findIndex(
          (item) => item.tax === existedItem.tax
        );
        if (index > -1) {
          taxArray[index].sumTax += Number(percentage);
          taxArray[index].sumValue +=
            Orderdetails[i].quantity * Orderdetails[i].price;
        }
      } else {
        taxArray.push({
          tax: Orderdetails[i].tax,
          sumTax: Number(percentage),
          sumValue: Orderdetails[i].quantity * Orderdetails[i].price,
        });
      }
    }
    return (
      <>
        <Table>
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
            {taxArray.map((orderitem) => (
              <tr key={orderitem.tax}>
                <td>{orderitem.tax}%</td>
                <td>{(orderitem.sumValue - orderitem.sumTax).toFixed(2)}€</td>
                <td>{orderitem.sumTax.toFixed(2)}€</td>
                <td>{orderitem.sumValue.toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <div>
          <strong>Total:</strong> {total.toFixed(2)}€
        </div>
      </>
    );
  }

  function OrderDetail() {
    if (Object.entries(orderDetail).length === 0) return <></>;

    return (
      <Detalhe>
        <ul>
          <li>
            <span>
              <strong>Nº Ordem:</strong> {orderDetail.orderid}
            </span>
          </li>
          <li>
            <span>
              <strong>Data criação:</strong> {setDate(orderDetail.created_at)}
            </span>
          </li>
          <li>
            <span>
              <strong>Data atualização:</strong>{' '}
              {setDate(orderDetail.updated_at)}
            </span>
          </li>
          <li>
            <span>
              <strong>Estado:</strong> {orderDetail.ship_status}
            </span>
          </li>
          <li>
            <br />
          </li>
          <li>
            <span>
              <strong>Morada:</strong> {orderDetail.order_address1}
            </span>
          </li>
          <li>
            <span>
              <strong>Morada (cont.):</strong> {orderDetail.order_address2}
            </span>
          </li>
          <li>
            <span>
              <strong>Código Postal:</strong> {orderDetail.order_locationcp}
            </span>
          </li>
          <li>
            <span>
              <strong>Localidade:</strong> {orderDetail.order_location}
            </span>
          </li>
          <li>
            <br />
          </li>
          <li>
            <span>
              <strong>E-mail:</strong> {orderDetail.order_email}
            </span>
          </li>
          <li>
            <span>
              <strong>Telefone:</strong> {orderDetail.order_phone}
            </span>
          </li>
          <li>
            <br />
          </li>
        </ul>
        {orderDetail.Orderdetails.map((orderitem) => (
          <ul key={orderitem.id}>
            <li>
              <span>
                <strong>{orderitem.name}</strong>
              </span>
            </li>
            <li>
              <span>
                ({orderitem.price}€ x {orderitem.quantity}){' '}
                <strong>
                  {(orderitem.price * orderitem.quantity).toFixed(2)}€
                </strong>
              </span>
            </li>
          </ul>
        ))}
        <br />
        <ShowTotal />
      </Detalhe>
    );
  }

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <>
          <Title>As suas ordens</Title>
          <MasterTable>
            <tbody>
              <tr>
                <td>
                  <ShowOrder />
                </td>
                <td>
                  <OrderDetail />
                </td>
              </tr>
            </tbody>
          </MasterTable>
        </>
        <Button type="submit" onClick={(evt) => handleClick(evt)}>
          Voltar
        </Button>
      </Container>
    </MainContainer>
  );
}
