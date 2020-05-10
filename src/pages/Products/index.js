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
  Button,
} from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [prodcats, setProdCats] = useState([]);
  const [prod, setProd] = useState(0);
  const [prodTitle, setProdTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState([{}]);

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
  }, [prod, prodTitle, products, inputFields]);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleOnChange = (e, index) => {
    e.persist();
    const values = [...inputFields];
    values[index].input = e.target.value;
    setInputFields(values);
  };

  const handleOnChangeInit = (e) => {
    const values = [...inputFields];
    values.push({ input: '' });
    setInputFields(values);
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

  const handleUpButton = (e) => {
    e.persist();
    console.log(e);
  };

  return (
    <MainContainer>
      <MenuContainer>
        <ul>
          <MenuItem key="0" onClick={() => (setProd(0), setProdTitle(''))}>
            Todos
          </MenuItem>
          {prodcats.map((prodcat) => (
            <MenuItem
              key={String(prodcat.id)}
              onClick={() => (
                setProd(prodcat.id), setProdTitle(`(${prodcat.name})`)
              )}
            >
              {prodcat.name}
            </MenuItem>
          ))}
        </ul>
      </MenuContainer>
      <MiddleContainer>
        <Loading isLoading={isLoading} />
        <h1>Produtos{prodTitle}:</h1>

        <ProductContainer>
          {products.length === 0 ? (
            <strong>Sem produtos disponiveis nesta categoria.</strong>
          ) : (
            products.map((product, index) => (
              <ProductShow key={String(product.id)}>
                <ProfilePicture>
                  {get(product, 'Photo.url', false) ? (
                    <img src={product.Photo.url} alt="" />
                  ) : (
                    <FaCarrot size={50} />
                  )}
                </ProfilePicture>

                <strong>{product.name}</strong>
                <span>
                  Preço: {product.price}€/{product.priceunit}
                </span>
                <ProdAddBasket>
                  <QuantityDiv>
                    <NumberBox>
                      <input
                        type="number"
                        name={product.id}
                        value={inputFields[index].input}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                    </NumberBox>
                    <AddRemove>
                      <Button onClick={(e) => {}}>+</Button>
                      <br />
                      <Button type="submit">-</Button>
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
            ))
          )}
        </ProductContainer>
      </MiddleContainer>
    </MainContainer>
  );
}
