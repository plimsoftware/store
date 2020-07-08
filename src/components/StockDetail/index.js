import React, { useState, useEffect } from 'react';
import Proptype from 'prop-types';
import {
  FaArrowLeft,
  FaArrowRight,
  FaTrashAlt,
  FaFileImport,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import StockDetailPrompt from '../StockChange';
import axios from '../../services/axios';

import {
  ProdContainer,
  Container,
  Close,
  ProdImage,
  ProdBackColor,
  Table,
} from './styled';

export default function StockDetail({ detailStatus, currentProd, close }) {
  const [detailStatusPrompt, setDetailStatusPrompt] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [myStore, setMyStore] = useState(0);
  const [myWarehouse, setMyWarehouse] = useState(0);
  const [myExpedition, setMyExpedition] = useState(0);
  const [myData, setMyData] = useState(false);
  const [runOnce, setRunOnce] = useState(true);
  const [myCurrentProd, setMyCurrentProd] = useState('');

  useEffect(() => {
    function getData() {
      if (myCurrentProd === currentProd.name) return;
      const { myStock } = currentProd;
      const { store, warehouse, expedition } = myStock;
      setMyStore(store);
      setMyWarehouse(warehouse);
      setMyExpedition(expedition);
      setMyCurrentProd(currentProd.name);
      if (store + warehouse > 0) setRunOnce(false);
    }

    async function updateData() {
      setMyData(false);
      try {
        await axios.put(`/stock/admin/${currentProd.id}`, {
          store: myStore,
          warehouse: myWarehouse,
        });
      } catch (err) {
        toast.error('Ocorreu um erro desconhecido');
      }
    }

    if (myData) updateData();
    if (runOnce) getData();
  }, [
    currentProd,
    myCurrentProd,
    myWarehouse,
    myStore,
    myData,
    setMyData,
    runOnce,
    setRunOnce,
  ]);

  const handletransfStore = () => {
    setTo('Loja');
    setFrom('Armazém');
    setDetailStatusPrompt(true);
  };

  const handledeleteStore = () => {
    setTo('Delete');
    setFrom('');
    setDetailStatusPrompt(true);
  };

  const handleaddStore = () => {
    setTo('Add');
    setFrom('');
    setDetailStatusPrompt(true);
  };

  const handletransfWare = () => {
    setTo('Armazém');
    setFrom('Loja');
    setDetailStatusPrompt(true);
  };

  const handleCloseDetailPrompt = (qtd) => {
    setDetailStatusPrompt(false);

    if (qtd === 0) return;

    if (to === 'Delete') {
      if (qtd > myWarehouse) {
        toast.error(`Stock não disponível. Actualmente tem ${myWarehouse}`);
        return;
      }

      setMyWarehouse(Number(myWarehouse) - Number(qtd));
      setMyData(true);
    }

    if (to === 'Add') {
      setMyWarehouse(Number(myWarehouse) + Number(qtd));
      setMyData(true);
    }

    if (from === 'Armazém') {
      if (qtd > myWarehouse) {
        toast.error(`Stock não disponível. Actualmente tem ${myWarehouse}`);
        return;
      }

      setMyWarehouse(Number(myWarehouse) - Number(qtd));
      setMyStore(Number(myStore) + Number(qtd));
      setMyData(true);
    }

    if (from === 'Loja') {
      if (qtd > myStore) {
        toast.error(`Stock não disponível. Actualmente tem ${myStore}`);
        return;
      }

      setMyWarehouse(Number(myWarehouse) + Number(qtd));
      setMyStore(Number(myStore) - Number(qtd));
      setMyData(true);
    }
  };

  if (!detailStatus) return <></>;
  return (
    <Container>
      <StockDetailPrompt
        detailStatusPrompt={detailStatusPrompt}
        from={from}
        to={to}
        close={(qtd) => handleCloseDetailPrompt(qtd)}
      />
      <ProdBackColor />
      <ProdImage url={currentProd.Photo.url} />
      <ProdContainer>
        <Close
          onClick={() => {
            setRunOnce(true);
            close();
          }}
        >
          <strong>X</strong>
        </Close>
        <h1>Stock de {currentProd.name}</h1>
        <br />
        <p>Transferir stocks e eliminar stocks incorrectos</p>
        <Table>
          <tbody>
            <tr>
              <th>Loja</th>
              <th> </th>
              <th>Armazém</th>
              <th>Em expedição</th>
            </tr>
            <tr>
              <td>{myStore}</td>
              <td>
                <FaArrowLeft
                  size="14"
                  cursor="pointer"
                  title="Transferir para loja"
                  onClick={handletransfStore}
                />{' '}
                <br />
                <FaArrowRight
                  size="14"
                  cursor="pointer"
                  title="Transferir para armazém"
                  onClick={handletransfWare}
                />
              </td>
              <td>
                {myWarehouse}
                {'    '}
                <FaFileImport
                  size="14"
                  title="Adicionar stock"
                  cursor="pointer"
                  onClick={handleaddStore}
                />
                <FaTrashAlt
                  size="14"
                  cursor="pointer"
                  title="Apagar stock"
                  onClick={handledeleteStore}
                />
              </td>
              <td>{myExpedition}</td>
            </tr>
          </tbody>
        </Table>
      </ProdContainer>
    </Container>
  );
}

StockDetail.defaultProps = {
  detailStatus: false,
  currentProd: {
    myStock: {
      store: 0,
      warehouse: 0,
    },
  },
  close: () => {},
};

StockDetail.propTypes = {
  detailStatus: Proptype.bool,
  currentProd: Proptype.shape({
    id: Proptype.number,
    name: Proptype.string,
    myStock: Proptype.shape({
      store: Proptype.number,
      warehouse: Proptype.number,
      expedition: Proptype.number,
    }),
    Photo: Proptype.shape({
      url: Proptype.string,
    }),
  }),
  close: Proptype.func,
};
