import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Proptype from 'prop-types';

import {
  TitleHeader,
  Container,
  MainContainer,
  DivCat,
  Table,
  Button,
  ButtonRes,
  ProdValues,
} from './styled';
import Loading from '../../../components/Loading';
import axios from '../../../services/axios';
import history from '../../../services/history';

export default function Product() {
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [prodList, setProdList] = useState([]);
  const [prodCatList, setProdCatList] = useState([]);
  const [runGetData, setRunGetData] = useState(true);
  const [radioSelect, setRadioSelect] = useState(0);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setRunGetData(false);

      try {
        if (radioSelect === 0) {
          const responseProd = await axios.get('/product/?admin=true');
          setProdList(responseProd.data);
        } else {
          const responseProd = await axios.get(
            `/product/?catid=${radioSelect}&admin=true`
          );
          setProdList(responseProd.data);
        }
      } catch (err) {
        toast.error('Não foi possivel carregar os produtos!');
      }

      try {
        const responseProCat = await axios.get('/prodcat/');
        setProdCatList(responseProCat.data);
      } catch (err) {
        toast.error('Não foi possivel carregar as categorias!');
      }

      setIsLoading(false);
    }

    if (runGetData) getData();
  }, [runGetData, radioSelect]);

  const handleEdit = (id) => {
    history.push('/productAdmin/product', { prodId: id });
  };

  const handleDeleteAsk = (e) => {
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  async function handleDelete(prod) {
    try {
      const { data } = await axios.get(`/stock/${prod.id}`);
      console.log(data.total);
      if (data.total !== 0) {
        toast.warn(
          `Produto ${prod.name} não pode ser eliminado com stock disponível`
        );
        return;
      }
    } catch (err) {
      toast.info('Ocorreu um erro com a validação da conta');
      history.push('/');
    }

    try {
      await axios.delete(`/photos/${prod.id}`);
      await axios.delete(`/product/${prod.id}`);
      toast.info(`Produto ${prod.name} foi eliminado`);
      setRunGetData(true);
    } catch (err) {
      toast.info('Ocorreu um erro com a validação da conta');
      history.push('/');
    }
  }

  function MyInput(props) {
    const { prod } = props;

    return (
      <>
        <img src={prod.Photo.url} alt="" />
        <ProdValues>{prod.name}</ProdValues>
        <span>
          <FaPencilAlt
            size="13"
            title="Editar"
            onClick={() => handleEdit(prod.id)}
            cursor="pointer"
          />
        </span>
        <span>
          <FaTrashAlt
            title="Eliminar"
            onClick={handleDeleteAsk}
            cursor="pointer"
            size="13"
          />
          <FaTrashAlt
            color="red"
            title="Confirmação eliminar"
            display="none"
            cursor="pointer"
            onClick={() => handleDelete(prod)}
            size="13"
          />
        </span>
      </>
    );
  }

  MyInput.defaultProps = {
    prod: {},
  };

  MyInput.propTypes = {
    prod: Proptype.shape({
      id: Proptype.number,
      name: Proptype.string,
      Photo: Proptype.shape({
        url: Proptype.string,
      }),
    }),
  };

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <TitleHeader>Gestão de Produtos</TitleHeader>
        <Table>
          <tbody>
            <tr>
              <th>Filtar por categoria</th>
              <th>Lista de produtos</th>
            </tr>
            <tr>
              <td>
                <form>
                  <input
                    type="radio"
                    key="todos"
                    name="category"
                    value="0"
                    readOnly
                    checked={radioSelect === 0}
                    onClick={() => {
                      setRadioSelect(0);
                      setRunGetData(true);
                    }}
                  />
                  <span>Todos</span>
                  {prodCatList.map((prodcat) => (
                    <DivCat key={prodcat.id}>
                      <input
                        type="radio"
                        name="category"
                        readOnly
                        value={prodcat.name}
                        checked={radioSelect === prodcat.id}
                        onClick={() => {
                          setRadioSelect(prodcat.id);
                          setRunGetData(true);
                        }}
                      />
                      <span>{prodcat.name}</span>
                    </DivCat>
                  ))}
                </form>
              </td>
              <td>
                {prodList.length !== 0 ? (
                  prodList.map((prod) => (
                    <div key={prod.id}>
                      <MyInput prod={prod} />
                    </div>
                  ))
                ) : (
                  <div>
                    <span>
                      <strong>Sem produtos disponiveis</strong>
                    </span>
                  </div>
                )}

                <section>
                  <Button to="/productAdmin/product">Novo produto</Button>
                </section>
              </td>
            </tr>
          </tbody>
        </Table>
        <div>
          <ButtonRes to="/adminconsole/">Voltar</ButtonRes>
        </div>
      </Container>
    </MainContainer>
  );
}
