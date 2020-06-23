import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import {
  Form,
  MainContainer,
  Container,
  Title,
  Button,
  Button2,
  PriceDiv,
  BDiv,
  CategoryStyle,
} from './styled';
import Loading from '../../../components/Loading';
import axios from '../../../services/axios';
import history from '../../../services/history';

export default function ProEdit(props) {
  const prodId = get(props, 'location.state.prodId', null);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [runOnce, setRunOnce] = useState(true);
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [priceUnit, setPriceUnit] = useState('');
  const [weight, setWeight] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [category, setCategory] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [url, setUrl] = useState('');
  const [imagem, setImagem] = useState(null);

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

    async function getProdData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/product/${prodId}`);

        setName(data.product.name);
        setShortDesc(data.product.short_desc);
        setLongDesc(data.product.long_desc);
        setPrice(data.product.price);
        setTax(data.product.tax);
        setPriceUnit(data.product.priceunit);
        setWeight(data.product.weight);
        setIsVisible(data.product.visible);
        setCategory(data.product.category_id);
        setUrl(data.product.Photo.url);

        setIsLoading(false);
        setRunOnce(false);
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

    getProdCat();
    if (prodId && runOnce) getProdData();
  }, [prodId, runOnce, url]);

  const handleClick = (evt) => {
    evt.preventDefault();
    history.push('/productAdmin');
  };

  const handleChangePhoto = async (e) => {
    const imagemNew = e.target.files[0];
    const fotoURL = URL.createObjectURL(imagemNew);
    setUrl(fotoURL);
    setImagem(imagemNew);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;

      toast.error('Nome deve ter entre 3 a 255 caracteres');
    }

    if (shortDesc.length > 100) {
      formErrors = true;

      toast.error('Descrição curta não pode ter mais de 100 caracteres');
    }

    if (longDesc.length > 255) {
      formErrors = true;

      toast.error('Descrição longa não pode ter mais de 255 caracteres');
    }

    if (priceUnit.length < 2 || priceUnit.length > 3) {
      formErrors = true;

      toast.error('Unidade de Preço deve ter entre 2 a 3 caracteres');
    }

    if (formErrors) return;

    if (prodId) {
      const formData = new FormData();

      formData.append('product_id', prodId);
      formData.append('photo', imagem);

      try {
        setIsLoading(true);

        if (imagem) {
          await axios.post('/photos/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        await axios.put(`/product/${prodId}`, {
          name,
          short_desc: shortDesc,
          long_desc: longDesc,
          price,
          tax,
          priceunit: priceUnit,
          weight,
          visible: isVisible,
          category_id: category,
        });

        setIsLoading(false);
        toast.info('Produto atualizado com sucesso');
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
    } else {
      try {
        setIsLoading(true);
        const { data } = await axios.post('/product/', {
          name,
          short_desc: shortDesc,
          long_desc: longDesc,
          price,
          tax,
          priceunit: priceUnit,
          weight,
          visible: isVisible,
          category_id: category,
        });

        await axios.post(`/photos/${data.id}`);

        setIsLoading(false);
        toast.info('Produto criado com sucesso');
        history.push('/productAdmin/product', { prodId: data.id });
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
  }

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />
        <Title>{prodId ? 'Editar produto' : 'Crie novo produto'}</Title>
        <p>* - campo de preenchimento obrigatório</p>
        <Form onSubmit={handleSubmit}>
          {prodId && (
            <label htmlFor="photo">
              {prodId ? <img src={url} alt="Foto" /> : 'Selecionar Imagem'}
              <input type="file" id="foto" onChange={handleChangePhoto} />
            </label>
          )}
          <label htmlFor="nome">
            Nome*:
            <input
              type="text"
              className="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite nome do produto"
            />
          </label>
          <label htmlFor="shortDesc">
            Descrição curta:
            <input
              type="text"
              className="shortDesc"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Digite uma descrição curta"
            />
          </label>
          <label htmlFor="longDesc">
            Descrição longa:
            <textarea
              className="longDesc"
              rows="4"
              cols="50"
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
              placeholder="Digite uma descrição longa"
            />
          </label>
          <PriceDiv>
            <label htmlFor="price">
              Preço (€)*:
              <input
                type="number"
                className="price"
                value={price}
                onChange={(e) => {
                  if (!e.target.value.match(/^[0-9]*\.?[0-9]+$/)) return;
                  setPrice(e.target.value);
                }}
                placeholder="Digite o preço"
              />
            </label>
            <label htmlFor="priceunit">
              Unidade*:
              <input
                type="text"
                className="priceunit"
                value={priceUnit}
                onChange={(e) => setPriceUnit(e.target.value)}
                placeholder="kg/un/pack/..."
              />
            </label>
            <label htmlFor="tax">
              Taxa IVA (%)*:
              <input
                type="number"
                className="tax"
                value={tax}
                onChange={(e) => {
                  if (!e.target.value.match(/^[0-9]*\.?[0-9]+$/)) return;
                  setTax(e.target.value);
                }}
                placeholder="Digite o IVA associado"
              />
            </label>
            <label htmlFor="weight">
              Peso:
              <input
                type="number"
                className="weight"
                value={weight}
                onChange={(e) => {
                  if (!e.target.value.match(/^[0-9]*\.?[0-9]+$/)) return;
                  setWeight(e.target.value);
                }}
                placeholder="Digite o peso"
              />
            </label>
          </PriceDiv>
          Categoria:
          <CategoryStyle
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
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
          <label htmlFor="isVisible">
            Disponível na loja?
            <input
              type="checkbox"
              className="isVisible"
              checked={isVisible}
              onChange={() => {
                setIsVisible(!isVisible);
              }}
            />
          </label>
        </Form>
        <BDiv>
          <Button type="submit" onClick={(evt) => handleSubmit(evt)}>
            {prodId ? 'Atualizar dados' : 'Criar produto'}
          </Button>
          <Button2 type="submit" onClick={(evt) => handleClick(evt)}>
            Voltar
          </Button2>
        </BDiv>
      </Container>
    </MainContainer>
  );
}
