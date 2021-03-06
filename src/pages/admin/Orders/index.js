import React, { useEffect, useState, Component } from 'react';
import Proptype from 'prop-types';
import { toast } from 'react-toastify';
import {
  FaPencilAlt,
  FaSearch,
  FaTrashAlt,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import {
  Title,
  Container,
  MainContainer,
  Table,
  Table1,
  Button,
  ButtonRes,
  Detalhe,
  MasterTable,
  CategoryStyle,
  CategoryStyle1,
} from './styled';

import Loading from '../../../components/Loading';
import ScrollTop from '../../../components/ScrollTop';
import axios from '../../../services/axios';
import history from '../../../services/history';

class OrderDetailStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Sem stock',
      editCategory: false,
    };
    this.handleChangeDetailStat = this.handleChangeDetailStat.bind(this);
  }

  handleChangeDetailStat = (category) => {
    const { orderitem, exitOrder, orderid } = this.props;
    // SEM STOCK
    if (category === 'Sem stock') {
      this.setState({ editCategory: false });
      return;
    }

    // OK
    if (category === 'Ok') {
      try {
        axios.get(`/stock/${orderitem.product_id}`).then(({ data }) => {
          if (data.stock.warehouse < orderitem.quantity) {
            toast.error('Não existe quantidade disponível em armazém');
            this.setState({
              editCategory: false,
              category: 'Sem stock',
            });
            return;
          }

          axios.put(`/stock/admin/${orderitem.product_id}`, {
            warehouse: data.stock.warehouse - orderitem.quantity,
            expedition: data.stock.expedition + orderitem.quantity,
          });

          axios.put(`/orderdetail/admin/${orderitem.id}`, {
            status: category,
          });

          axios.get(`/order/admin/?id=${orderid}`).then((response) => {
            axios.put(`/order/admin/${orderid}`, {
              ship_status: 'Sem stock',
              nrstockout: response.data.nrstockout - 1,
            });
          });

          toast.info('Item actualizado');
        });

        exitOrder();
      } catch (err) {
        toast.error(
          `Não foi possivel atualizar o detalhe de ordem ${orderitem.id}!`
        );
      }

      this.setState({ editCategory: false });
    }

    // CANCELADO
    if (category === 'Cancelado') {
      try {
        this.setState({
          editCategory: false,
          category: 'Cancelado',
        });

        axios.put(`/orderdetail/admin/${orderitem.id}`, {
          status: category,
        });

        axios.get(`/order/admin/?id=${orderid}`).then((response) => {
          axios.put(`/order/admin/${orderid}`, {
            nrstockout: response.data.nrstockout - 1,
          });
        });

        toast.info('Item cancelado');

        exitOrder();
      } catch (err) {
        toast.error(
          `Não foi possivel atualizar o detalhe de ordem ${orderitem.id}!`
        );
      }

      this.setState({ editCategory: false });
    }
  };

  render() {
    const { category, editCategory } = this.state;
    const { orderitem } = this.props;

    if (orderitem.status !== 'Sem stock')
      return (
        <span>
          <strong>Estado:</strong> {orderitem.status}
        </span>
      );

    return (
      <>
        <strong>Estado:</strong>
        {editCategory ? (
          <CategoryStyle1
            id="category"
            name="category"
            value={category}
            onChange={(e) => this.setState({ category: e.currentTarget.value })}
          >
            <option value="Sem stock" key="s1">
              Sem stock
            </option>
            <option value="Ok" key="s2">
              Ok
            </option>
            <option value="Cancelado" key="s3">
              Cancelado
            </option>
          </CategoryStyle1>
        ) : (
          <span style={{ color: 'red' }}>{orderitem.status}</span>
        )}
        {'  '}
        <span className="editCat">
          {editCategory ? (
            <>
              <span>
                <FaCheck
                  size="13"
                  color="green"
                  title="Modificar"
                  onClick={() => this.handleChangeDetailStat(category)}
                  cursor="pointer"
                />
              </span>
              <span>
                <FaTimes
                  size="13"
                  color="red"
                  title="Cancelar"
                  onClick={() => this.setState({ editCategory: false })}
                  cursor="pointer"
                />
              </span>
            </>
          ) : (
            <FaPencilAlt
              size="13"
              title="Mudar estado"
              onClick={() => this.setState({ editCategory: true })}
              cursor="pointer"
            />
          )}
        </span>
      </>
    );
  }
}

OrderDetailStatus.defaultProps = {
  orderitem: {},
  orderid: '',
  exitOrder: () => {},
};

OrderDetailStatus.propTypes = {
  orderitem: Proptype.shape({
    quantity: Proptype.number,
    product_id: Proptype.number,
    id: Proptype.number,
    status: Proptype.string,
    orderId: Proptype.string,
  }),
  orderid: Proptype.string,
  exitOrder: Proptype.func,
};

export default function AdminOrders() {
  const [runGetData, setRunGetData] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [orderList, setOrderList] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [searchId, setSearchId] = useState('0');
  const [searchEmail, setSearchEmail] = useState('0');
  const [searchStatus, setSearchStatus] = useState(0);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      if (searchId !== '0') {
        try {
          const response = await axios.get(`/order/admin/?id=${searchId}`);

          if (response.data.length === 0) {
            toast.warn('Não foi encontrado ordens!');
            setIsLoading(false);
            setSearchId('0');
            setSearchEmail('0');
            setSearchStatus(0);
            return;
          }

          setOrderList([response.data]);
          setRunGetData(false);
          setIsLoading(false);
          return;
        } catch (err) {
          toast.error('Não foi possivel carregar as ordens!');
          setSearchId('0');
          setSearchEmail('0');
          setSearchStatus(0);
        }
      }

      if (searchEmail !== '0') {
        try {
          const response = await axios.get(
            `/order/admin/?email=${searchEmail}`
          );

          if (response.data.length === 0) {
            toast.warn('Não foi encontrado ordens!');
            setIsLoading(false);
            setSearchId('0');
            setSearchEmail('0');
            setSearchStatus(0);
            return;
          }

          setOrderList(response.data);
          setRunGetData(false);
          setIsLoading(false);
          return;
        } catch (err) {
          toast.error('Não foi possivel carregar as ordens!');
          setSearchId('0');
          setSearchEmail('0');
          setSearchStatus(0);
        }
      }

      if (searchStatus !== 0) {
        try {
          const response = await axios.get(
            `/order/admin/?status=${searchStatus}`
          );

          if (response.data.length === 0) {
            toast.warn('Não foi encontrado ordens!');
            setIsLoading(false);
            setSearchId('0');
            setSearchEmail('0');
            setSearchStatus(0);
            return;
          }
          setOrderList(response.data);
          setRunGetData(false);
          setIsLoading(false);
          return;
        } catch (err) {
          toast.error('Não foi possivel carregar as ordens!');
          setSearchId('0');
          setSearchEmail('0');
          setSearchStatus(0);
        }
      }

      try {
        const response = await axios.get('/order/');
        setOrderList(response.data);
        setRunGetData(false);
      } catch (err) {
        toast.error('Não foi possivel carregar as ordens!');
        setSearchId('0');
        setSearchEmail('0');
        setSearchStatus(0);
      }

      setIsLoading(false);
    }
    if (runGetData) getData();
  }, [runGetData, searchId, searchEmail, searchStatus]);

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
    history.push('/adminconsole/');
  };

  const handleSearchOrder = (valueId) => {
    if (valueId === '') {
      setSearchId('0');
      setSearchEmail('0');
      setSearchStatus(0);
      setRunGetData(true);
      return;
    }
    setSearchId(valueId);
    setRunGetData(true);
  };

  const handleSearchEmail = (valueEmail) => {
    if (valueEmail === '') {
      setSearchId('0');
      setSearchEmail('0');
      setSearchStatus(0);
      setRunGetData(true);
      return;
    }
    setSearchEmail(valueEmail);
    setRunGetData(true);
  };

  const handleSearchStatus = (valueStatus) => {
    if (valueStatus === '--none--') {
      setSearchId('0');
      setSearchEmail('0');
      setSearchStatus(0);
      setRunGetData(true);
      return;
    }
    setSearchStatus(valueStatus);
    setRunGetData(true);
  };

  async function showOrder(orderId) {
    try {
      const response = await axios.get(`/order/admin/?id=${orderId}`);
      setOrderDetail(response.data);
    } catch (err) {
      toast.error(`Não foi possivel carregar a ordem ${orderId}!`);
    }
  }

  async function handleDelete(orderId) {
    try {
      await axios.delete(`/order/${orderId}`);
      setOrderDetail({});
      setRunGetData(true);
    } catch (err) {
      toast.error(`Não foi possivel eliminar a ordem ${orderId}!`);
    }
  }

  async function handleChangeCat(cat, order) {
    try {
      const { data } = await axios.get(`/order/admin/?id=${order.orderid}`);
      if (data.nrstockout > 0) {
        toast.error('Ainda tem itens sem stock para validar');
        return;
      }

      if (cat === 'Cancelado' || cat === 'Enviado') {
        for (let i = 0; i < order.Orderdetails.length; i += 1) {
          if (order.Orderdetails[i].status === 'Ok') {
            axios
              .get(`/stock/${order.Orderdetails[i].product_id}`)
              .then((response) => {
                axios.put(`/stock/admin/${order.Orderdetails[i].product_id}`, {
                  expedition:
                    response.data.stock.expedition -
                    order.Orderdetails[i].quantity,
                });
              });
          }
        }
      }

      await axios.put(`/order/admin/${order.orderid}`, {
        ship_status: cat,
      });

      setOrderDetail({});
      setRunGetData(true);
    } catch (err) {
      toast.error(`Não foi possivel actualizar a ordem ${order.orderId}!`);
    }
  }

  function ShowOrder() {
    const [valueId, setValueId] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [category, setCategory] = useState(0);

    if (orderList.length === 0)
      return <span className="noOrders">Ainda não existe nenhuma ordem</span>;

    return (
      <>
        <Table>
          <tbody>
            <tr>
              <th>Nº Ordem</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Data</th>
              <th> </th>
            </tr>
            <tr>
              <td className="other">
                <input
                  type="text"
                  value={valueId}
                  onChange={(e) => setValueId(e.target.value)}
                />{' '}
                <br />
                <FaSearch
                  sixe="23"
                  onClick={() => handleSearchOrder(valueId)}
                />
              </td>
              <td className="other">
                <input
                  type="text"
                  value={valueEmail}
                  onChange={(e) => setValueEmail(e.target.value)}
                />{' '}
                <br />
                <FaSearch
                  sixe="23"
                  onClick={() => handleSearchEmail(valueEmail)}
                />
              </td>
              <td className="category">
                <CategoryStyle
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.currentTarget.value)}
                >
                  <option value="--none--" key="s0">
                    --none--
                  </option>
                  <option value="Pendente" key="s1">
                    Pendente
                  </option>
                  <option value="Em progresso" key="s2">
                    Em progresso
                  </option>
                  <option value="Sem stock" key="s3">
                    Sem stock
                  </option>
                  <option value="Em preparação" key="s4">
                    Em preparação
                  </option>
                  <option value="Enviado" key="s5">
                    Enviado
                  </option>
                  <option value="Cancelado" key="s6">
                    Cancelado
                  </option>
                </CategoryStyle>
                <FaSearch
                  sixe="23"
                  onClick={() => handleSearchStatus(category)}
                />
              </td>
              <td> </td>
            </tr>
            {orderList.map((order) => (
              <tr key={order.id} onClick={() => showOrder(order.orderid)}>
                <td className="other">{order.orderid}</td>
                <td className="other">{order.order_email}</td>
                <td>{order.ship_status}</td>
                <td className="other">{setDate(order.created_at)}</td>
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
        <Table1>
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
        </Table1>
        <br />
        <div>
          <strong>Total:</strong> {total.toFixed(2)}€
        </div>
      </>
    );
  }

  function OrderDetail() {
    const [category, setCategory] = useState('Pendente');
    const [editCategory, setEditcategory] = useState(false);

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
              <strong>Estado:</strong>{' '}
              {editCategory ? (
                <CategoryStyle1
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.currentTarget.value)}
                >
                  <option value="Pendente" key="s1">
                    Pendente
                  </option>
                  <option value="Em progresso" key="s2">
                    Em progresso
                  </option>
                  <option value="Sem stock" key="s3">
                    Sem stock
                  </option>
                  <option value="Em preparação" key="s4">
                    Em preparação
                  </option>
                  <option value="Enviado" key="s5">
                    Enviado
                  </option>
                  <option value="Cancelado" key="s6">
                    Cancelado
                  </option>
                </CategoryStyle1>
              ) : (
                orderDetail.ship_status
              )}
            </span>
            <span className="editCat">
              {editCategory ? (
                <>
                  <span>
                    <FaCheck
                      size="13"
                      color="green"
                      title="Modificar"
                      onClick={() => handleChangeCat(category, orderDetail)}
                      cursor="pointer"
                    />
                  </span>
                  <span>
                    <FaTimes
                      size="13"
                      color="red"
                      title="Cancelar"
                      onClick={() => setEditcategory(!editCategory)}
                      cursor="pointer"
                    />
                  </span>
                </>
              ) : orderDetail.ship_status !== 'Cancelado' &&
                orderDetail.ship_status !== 'Enviado' ? (
                <FaPencilAlt
                  size="13"
                  title="Mudar estado"
                  onClick={() => setEditcategory(!editCategory)}
                  cursor="pointer"
                />
              ) : (
                <></>
              )}
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
          {orderDetail.Orderdetails.map((orderitem) => (
            <li key={orderitem.id}>
              <strong>{orderitem.name}</strong>
              <span>
                {' '}
                ({orderitem.price.toFixed(2)}€ x {orderitem.quantity}){' '}
                {(orderitem.price * orderitem.quantity).toFixed(2)}€
              </span>
              <br />
              <span>
                <OrderDetailStatus
                  orderitem={orderitem}
                  orderid={orderDetail.orderid}
                  exitOrder={() => {
                    setOrderDetail({});
                    setRunGetData(true);
                  }}
                />
              </span>
            </li>
          ))}
        </ul>
        {}
        <br />
        <ShowTotal />
        <ButtonRes onClick={() => handleDelete(orderDetail.orderid)}>
          Apagar ordem <FaTrashAlt size="12" color="white" />
        </ButtonRes>
      </Detalhe>
    );
  }

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <ScrollTop />
      <Container>
        <>
          <Title>Gestão de ordens</Title>
          <Button type="submit" onClick={(evt) => handleClick(evt)}>
            Voltar
          </Button>
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
