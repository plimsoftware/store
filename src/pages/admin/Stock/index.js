import React, { useState, useEffect } from 'react';
import { FaCubes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import StockDetail from '../../../components/StockDetail';

import {
  TitleHeader,
  Container,
  MainContainer,
  Table,
  ButtonRes,
  ProdValues,
  CategoryStyle,
} from './styled';
import Loading from '../../../components/Loading';
import axios from '../../../services/axios';
import history from '../../../services/history';

export default function Stock() {
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [prodList, setProdList] = useState([]);
  const [runGetData, setRunGetData] = useState(true);
  const [category, setCategory] = useState('0');
  const [categoryList, setCategoryList] = useState([]);
  const [detailStatus, setDetailStatus] = useState(false); // Janela detalhes
  const [currentProd, setCurrentProd] = useState({
    myStock: { store: 0, warehouse: 0 },
  });

  useEffect(() => {
    async function getProdCat() {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/prodcat/');

        setCategoryList(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const data = get(err, 'response.data', {});
        const errors = get(data, 'errors', []);
        if (status === 401) {
          toast.warn('Ocorreu um erro com a validação da conta');
          history.push('/');
        }
        toast.error(errors[0]);
      }
    }

    async function getData() {
      setIsLoading(true);
      setRunGetData(false);

      try {
        if (category === '0') {
          const responseProd = await axios.get('/product/?admin=true');
          setProdList(responseProd.data);
        } else {
          const responseProd = await axios.get(
            `/product/?catid=${category}&admin=true`
          );
          setProdList(responseProd.data);
        }
      } catch (err) {
        toast.error('Não foi possivel carregar os produtos!');
      }

      setIsLoading(false);
    }

    getProdCat();
    if (runGetData) getData();
  }, [runGetData, category]);

  const handleClickDetail = (prod) => {
    setCurrentProd(prod);
    setDetailStatus(true);
  };

  const handleCloseDetail = () => {
    setDetailStatus(false);
    setRunGetData(true);
  };

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <TitleHeader>Gestão de Stock</TitleHeader>
        <StockDetail
          detailStatus={detailStatus}
          currentProd={currentProd}
          close={() => handleCloseDetail()}
        />

        <Table>
          <tbody>
            <tr>
              <th>Lista de Produtos</th>
              <th>Loja</th>
              <th>Armazém</th>
              <th>Em expedição</th>
              <th> </th>
            </tr>

            {prodList.length !== 0 ? (
              prodList.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div>
                      <img src={prod.Photo.url} alt="" />
                      <ProdValues>{prod.name}</ProdValues>
                    </div>
                  </td>
                  <td>{prod.myStock.store}</td>
                  <td>{prod.myStock.warehouse}</td>
                  <td>{prod.myStock.expedition}</td>
                  <th>
                    <FaCubes
                      cursor="pointer"
                      title="Opções"
                      size="15"
                      onClick={() => handleClickDetail(prod)}
                    />
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <div>
                    <span>
                      <strong>Sem produtos disponiveis</strong>
                    </span>
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>
            )}
          </tbody>
        </Table>
        <div>
          Filtar por categoria:
          <CategoryStyle
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.currentTarget.value);
              setRunGetData(true);
            }}
          >
            <option value="0" key="0">
              --none--
            </option>
            {categoryList.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </CategoryStyle>
        </div>
        <div>
          <ButtonRes to="/adminconsole/">Voltar</ButtonRes>
        </div>
      </Container>
    </MainContainer>
  );
}
