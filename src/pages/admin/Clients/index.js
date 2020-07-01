import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import {
  Title,
  Container,
  MainContainer,
  Table,
  Button,
  ButtonRes,
  Detalhe,
  MasterTable,
} from './styled';

import Loading from '../../../components/Loading';
import axios from '../../../services/axios';
import history from '../../../services/history';

export default function AdminClients() {
  const [runGetData, setRunGetData] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [clientList, setClientList] = useState([]);
  const [clientDetail, setClientDetail] = useState({});
  const [searchId, setSearchId] = useState('0');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      if (searchId !== '0') {
        try {
          const response = await axios.get(`/clients/admin/${searchId}`);

          if (response.data.length === 0) {
            toast.warn('Não foi encontrado o cliente!');
            setIsLoading(false);
            setSearchId('0');
            return;
          }

          setClientList([response.data]);
          setRunGetData(false);
          setIsLoading(false);
          return;
        } catch (err) {
          toast.error('Não foi possivel carregar os clientes!');
          setSearchId('0');
        }
      }

      try {
        const response = await axios.get('/clients/');
        setClientList(response.data);
        setRunGetData(false);
      } catch (err) {
        toast.error('Não foi possivel carregar os clientes!');
        setSearchId('0');
      }

      setIsLoading(false);
    }
    if (runGetData) getData();
  }, [runGetData, searchId]);

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

  const handleSearchClient = (valueId) => {
    if (valueId === '') {
      setSearchId('0');
      setRunGetData(true);
      return;
    }
    setSearchId(valueId);
    setRunGetData(true);
  };

  async function showClient(clientEmail) {
    try {
      const response = await axios.get(`/clients/admin/${clientEmail}`);
      setClientDetail(response.data);
    } catch (err) {
      toast.error(`Não foi possivel carregar o cliente ${clientEmail}`);
    }
  }

  async function handleDelete(orderId) {
    try {
      await axios.delete(`/clients/admin/${orderId}`);
      setClientDetail({});
      setRunGetData(true);
    } catch (err) {
      toast.error('Não foi possivel eliminar o cliente');
    }
  }

  function ShowClient() {
    const [valueId, setValueId] = useState('');

    if (clientList.length === 0) return <>Não existem clientes</>;

    return (
      <>
        <Table>
          <tbody>
            <tr>
              <th>Email</th>
              <th>Nome completo</th>
              <th>Data Criação</th>
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
                  onClick={() => handleSearchClient(valueId)}
                />
              </td>
              <td className="other" />
              <td className="other" />
            </tr>
            {clientList.map((client) => (
              <tr key={client.id} onClick={() => showClient(client.email)}>
                <td className="other">{client.email}</td>
                <td className="other">
                  {client.name} {client.surname}
                </td>
                <td>{setDate(client.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }

  function ClientDetail() {
    if (Object.entries(clientDetail).length === 0) return <></>;

    return (
      <Detalhe>
        <ul>
          <li>
            <span>
              <strong>Email:</strong> {clientDetail.email}
            </span>
          </li>
          <li>
            <span>
              <strong>Nome:</strong> {clientDetail.name}
            </span>
          </li>
          <li>
            <span>
              <strong>Apelido:</strong> {clientDetail.surname}
            </span>
          </li>
          <li>
            <span>
              <strong>Data criação:</strong> {setDate(clientDetail.created_at)}
            </span>
          </li>
          <li>
            <span>
              <strong>Data atualização:</strong>{' '}
              {setDate(clientDetail.updated_at)}
            </span>
          </li>
          <li>
            <br />
          </li>
          <li>
            <span>
              <strong>Morada:</strong> {clientDetail.address1}
            </span>
          </li>
          <li>
            <span>
              <strong>Morada (cont.):</strong> {clientDetail.address2}
            </span>
          </li>
          <li>
            <span>
              <strong>Código Postal:</strong> {clientDetail.locationcp}
            </span>
          </li>
          <li>
            <span>
              <strong>Localidade:</strong> {clientDetail.location}
            </span>
          </li>
          <li>
            <br />
          </li>
          <li>
            <span>
              <strong>Telefone:</strong> {clientDetail.phone}
            </span>
          </li>
          <li>
            <br />
          </li>
          <li>
            <span>
              <strong>Verificação Email:</strong>{' '}
              {clientDetail.email_verification ? 'Efectuado' : 'Não efectuado'}
            </span>
          </li>
        </ul>
        {}
        <br />
        <ButtonRes onClick={() => handleDelete(clientDetail.id)}>
          Apagar cliente <FaTrashAlt size="12" color="white" />
        </ButtonRes>
      </Detalhe>
    );
  }

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <>
          <Title>Gestão de clientes</Title>
          <MasterTable>
            <tbody>
              <tr>
                <td>
                  <ShowClient />
                </td>
                <td>
                  <ClientDetail />
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
