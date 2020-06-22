import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { FaTrashAlt, FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Proptype from 'prop-types';

import {
  TitleHeader,
  Title,
  Container,
  MainContainer,
  Option,
  Table,
  Button,
  ButtonRes,
} from './styled';
import Loading from '../../../components/Loading';
import axios from '../../../services/axios';
import history from '../../../services/history';

export default function Product() {
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [prodList, setProdList] = useState([]);
  const [runGetData, setRunGetData] = useState(true);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setRunGetData(false);

      try {
        const response = await axios.get('/product/');
        setProdList(response.data);
      } catch (err) {
        toast.error('Não foi possivel carregar os produtos!');
      }

      setIsLoading(false);
    }

    if (runGetData) getData();
  }, [runGetData]);

  const handleEdit = (evt) => {
    console.log(evt.previousSibling());
  };

  const handleDeleteAsk = (e) => {
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  async function handleDelete(prodCat) {
    try {
      await axios.delete(`/prodcat/${prodCat.id}`);
      toast.info(`Categoria ${prodCat.name} foi eliminado`);
      setRunGetData(true);
    } catch (err) {
      toast.info('Ocorreu um erro com a validação da conta');
      history.push('/');
    }
  }

  async function handleChange(prodCat, value) {
    try {
      await axios.put(`/prodcat/${prodCat.id}`, {
        name: value,
      });

      toast.info(`Categoria ${prodCat.name} foi alterado para ${value}`);
      setRunGetData(true);
    } catch (err) {
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

  function MyInput(props) {
    const { prod } = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [iconWrite, setIconWrite] = useState('block');
    const [iconOk, setIconOk] = useState('none');
    const [value, setValue] = useState(prod.name);

    return (
      <>
        <span>
          <input
            disabled={isDisabled}
            type="text"
            className="nome"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </span>
        <span>
          <FaPencilAlt
            size="13"
            title="Editar"
            display={iconWrite}
            onClick={() => {
              setIsDisabled(!isDisabled);
              setIconWrite('none');
              setIconOk('block');
            }}
            cursor="pointer"
          />
        </span>
        <span>
          <FaCheck
            size="13"
            color="green"
            display={iconOk}
            title="Modificar"
            onClick={() => handleChange(prod, value)}
            cursor="pointer"
          />
        </span>
        <span>
          <FaTimes
            size="13"
            color="red"
            display={iconOk}
            title="Cancelar"
            onClick={() => setRunGetData(true)}
            cursor="pointer"
          />
        </span>
        <span>
          <FaTrashAlt
            title="Eliminar"
            onClick={handleDeleteAsk}
            display={iconWrite}
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
      name: Proptype.string,
    }),
  };

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      <Container>
        <TitleHeader>Gestão de Produtos</TitleHeader>
        {prodList.map((prod) => (
          <div key={prod.id}>
            <MyInput prod={prod} />
          </div>
        ))}
        <section>
          <ButtonRes to="/adminconsole/">Voltar</ButtonRes>
        </section>
      </Container>
    </MainContainer>
  );
}
