import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { FaCartPlus, FaCarrot } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Proptype from 'prop-types';

import * as actions from '../../store/modules/shopcart/actions';
import {
  ProductContainer,
  MiddleContainer,
  MainContainer,
  MenuContainer,
  MenuItem,
  ProfilePicture,
  QuantityDiv,
  NumberBox,
  AddRemove,
  ProdAddBasket,
  ProductShow,
  IconBasket,
  Button,
} from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import ProductDetail from '../../components/ProductDetail';
import Basket from '../../components/Basket';
import unavailable from '../../img/unavailable.png';
import discount from '../../img/discount.png';

export default function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]); // Lista Produtos
  const [prodcats, setProdCats] = useState([]); // Lista Menu
  const [prodcat, setProdCat] = useState(0); // Menu Corrente
  const [prodTitle, setProdTitle] = useState(''); // Menu Título
  const [inputFields, setInputFields] = useState([]); // Campos quantidade
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [detailStatus, setDetailStatus] = useState(false); // Janela detalhes
  const [currentProd, setCurrentProd] = useState({}); // Produto seleccionado
  const [currentIndex, setCurrentIndex] = useState(0); // Produto seleccionado (index)
  const [prodQty, setProdQty] = useState(0);
  const cartItenstmp = useSelector((state) => state.shopcart.cartItens);

  useEffect(() => {
    function setInputsInitial(length) {
      const newInputFields = [];
      for (let i = 0; i < length; i += 1) {
        newInputFields.push('0');
      }
      setInputFields(newInputFields);
    }

    async function getData() {
      setIsLoading(true);
      if (prodcat === 0) {
        const response = await axios.get('/product');
        setProducts(response.data);
        setInputsInitial(response.data.length);
      } else {
        const response = await axios.get(`/product/?catid=${prodcat}`);
        setProducts(response.data);
        setInputsInitial(response.data.length);
      }
    }

    async function getDataMenu() {
      const response = await axios.get('/prodcat');
      setProdCats(response.data);
      setIsLoading(false);
    }

    try {
      getData();
      getDataMenu();
    } catch (err) {
      const status = get(err, 'response.status', 0);
      toast.error(`Erro ${status}`);
    }
  }, [prodcat, prodTitle, cartItenstmp]);

  const handleInputChange = (index, evt) => {
    if (!evt.target.value.match(/^[0-9]+$/)) return;
    const values = [...inputFields];
    values[index] = Math.abs(evt.target.value);
    setInputFields(values);
  };

  const handleInputBUp = (index) => {
    const values = [...inputFields];
    let newValue = Number(values[index]);
    newValue += 1;
    values[index] = newValue;
    setInputFields(values);
  };

  const handleInputBDown = (index) => {
    const values = [...inputFields];
    let newValue = Number(values[index]);
    newValue -= 1;
    if (newValue < 0) newValue = 0;
    values[index] = newValue;
    setInputFields(values);
  };

  const handleClickDetail = (id, index, qty) => {
    setCurrentProd(id);
    setCurrentIndex(index);
    setProdQty(qty);
    setDetailStatus(true);
  };

  const handleCloseDetail = (qty) => {
    setDetailStatus(false);
    const values = [...inputFields];
    values[currentIndex] = Math.abs(qty);
    setInputFields(values);
    setCurrentProd({});
    setCurrentIndex(0);
    setProdQty(0);
  };

  const addItenCart = (index, prod, qtd) => {
    if (qtd > prod.myStock.store) {
      toast.error(`Sem stock disponível. Máximo: ${prod.myStock.store}`);
      return;
    }
    if (qtd > 0) {
      const prodID = products[index].id;
      const { name } = prod;
      dispatch(actions.addIten({ prodID, name, qtd }));
    }
  };

  function MyPrice({ product }) {
    if (product.discount > 0) {
      const percent = (product.price * product.discount) / 100;
      const finalPrice = (product.price - percent).toFixed(2);
      return (
        <span>
          Preço:{' '}
          <strike>
            {product.price}€/{product.priceunit.toFixed(2)}
          </strike>
          <p style={{ color: 'red' }}>
            Promoção: {finalPrice}€/{product.priceunit} ({product.discount}%)
          </p>
        </span>
      );
    }

    return (
      <span>
        Preço: {product.price}€/{product.priceunit}
        <p>
          <br />
        </p>
      </span>
    );
  }

  MyPrice.defaultProps = {
    product: {},
  };

  MyPrice.propTypes = {
    product: Proptype.shape({
      priceunit: Proptype.string,
      price: Proptype.number,
      discount: Proptype.number,
    }),
  };

  return (
    <MainContainer>
      <MenuContainer>
        <ul>
          <MenuItem
            key="0"
            onClick={() => {
              setProdCat(0);
              setProdTitle('');
            }}
          >
            Todos
          </MenuItem>
          {prodcats.map((prodcate) => (
            <MenuItem
              key={String(prodcate.id)}
              onClick={() => {
                setProdCat(prodcate.id);
                setProdTitle(`(${prodcate.name})`);
              }}
            >
              {prodcate.name}
            </MenuItem>
          ))}
        </ul>
      </MenuContainer>
      <MiddleContainer>
        <Loading isLoading={isLoading} />
        <ProductDetail
          detailStatus={detailStatus}
          currentProd={currentProd}
          prodQty={Number(prodQty)}
          close={(qty) => handleCloseDetail(qty)}
        />
        <Basket />
        <h3>Produtos{prodTitle}:</h3>

        <ProductContainer>
          {products == null || products.length === 0 ? (
            <strong>Sem produtos disponiveis nesta categoria.</strong>
          ) : (
            products.map((product, index) => (
              <ProductShow key={product.id}>
                <ProfilePicture
                  onClick={() =>
                    handleClickDetail(product, index, inputFields[index] || 0)
                  }
                >
                  {get(product, 'Photo.url', false) ? (
                    <>
                      <img className="image1" src={product.Photo.url} alt="" />
                      {product.myStock.store === 0 ? (
                        <img className="image2" src={unavailable} alt="" />
                      ) : (
                        <></>
                      )}
                      {product.discount > 0 ? (
                        <img className="image3" src={discount} alt="" />
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <FaCarrot size={50} />
                  )}
                </ProfilePicture>
                <section>
                  <strong>{product.name}</strong> <br />
                  <MyPrice product={product} />
                  <ProdAddBasket>
                    <QuantityDiv>
                      <NumberBox>
                        <input
                          type="text"
                          name={product.id}
                          value={inputFields[index] || 0}
                          onChange={(evt) => handleInputChange(index, evt)}
                        />
                      </NumberBox>
                      <AddRemove>
                        <Button onClick={() => handleInputBUp(index)}>+</Button>
                        <br />
                        <Button onClick={() => handleInputBDown(index)}>
                          -
                        </Button>
                      </AddRemove>
                    </QuantityDiv>
                    <IconBasket
                      onClick={() =>
                        addItenCart(index, product, inputFields[index] || 0)
                      }
                    >
                      <FaCartPlus size={26} color="red" />
                    </IconBasket>
                  </ProdAddBasket>
                </section>
              </ProductShow>
            ))
          )}
        </ProductContainer>
      </MiddleContainer>
    </MainContainer>
  );
}
