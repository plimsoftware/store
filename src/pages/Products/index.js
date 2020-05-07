import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaWindowClose, FaCarrot } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { ProductContainer, ProfilePicture, ProductShow } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/product');
      setProducts(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

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
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Produtos:</h1>

      <ProductContainer>
        {products.map((product, index) => (
          <ProductShow key={String(product.id)}>
            <ProfilePicture>
              {get(product, 'Photo.url', false) ? (
                <img src={product.Photo.url} alt="" />
              ) : (
                <FaCarrot size={50} />
              )}
            </ProfilePicture>

            <span>{product.name}</span>

            <Link onClick={handleDeleteAsk} to={`/aluno/${product.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </ProductShow>
        ))}
      </ProductContainer>
    </Container>
  );
}
