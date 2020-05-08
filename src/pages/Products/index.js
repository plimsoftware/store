import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaShoppingCart, FaCarrot } from 'react-icons/fa';

import { toast } from 'react-toastify';
import {
  ProductContainer,
  ProfilePicture,
  ProductShow,
  MiddleContainer,
  MainContainer,
  MenuContainer,
  MenuItem,
  QuantityDiv,
  NumberBox,
  AddRemove,
  ProdAddBasket,
  IconBasket,
} from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [prodcats, setProdCats] = useState([]);
  const [prod, setProd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      if (prod === 0) {
        const response = await axios.get('/product');
        setProducts(response.data);
      } else {
        const response = await axios.get(`/product/?id=${prod}`);
        setProducts(response.data);
      }
    }

    getData();

    async function getDataMenu() {
      const response = await axios.get('/prodcat');
      setProdCats(response.data);
      setIsLoading(false);
    }

    getDataMenu();
  }, [prod]);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...products];
      novosAlunos.splice(index, 1);
      setProducts(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }

      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <MenuContainer>
        <ul>
          <MenuItem key="0" onClick={() => setProd(0)}>
            Todos
          </MenuItem>
          {prodcats.map((prodcat) => (
            <MenuItem
              key={String(prodcat.id)}
              onClick={() => setProd(prodcat.id)}
            >
              {prodcat.name}
            </MenuItem>
          ))}
        </ul>
      </MenuContainer>
      <MiddleContainer>
        <Loading isLoading={isLoading} />
        <h1>Produtos:</h1>

        <ProductContainer>
          {products.map((product) => (
            <ProductShow key={String(product.id)}>
              <ProfilePicture>
                {get(product, 'Photo.url', false) ? (
                  <img src={product.Photo.url} alt="" />
                ) : (
                  <FaCarrot size={50} />
                )}
              </ProfilePicture>

              <span>{product.name}</span>
              <ProdAddBasket>
                <QuantityDiv>
                  Q<NumberBox>N</NumberBox>
                  <AddRemove>
                    A<br />R
                  </AddRemove>
                </QuantityDiv>
                <IconBasket
                  onClick={handleDeleteAsk}
                  to={`/aluno/${product.id}/delete`}
                >
                  <FaShoppingCart size={26} color="red" />
                </IconBasket>
              </ProdAddBasket>
            </ProductShow>
          ))}
        </ProductContainer>
      </MiddleContainer>
    </MainContainer>
  );
}
