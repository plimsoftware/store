import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaShoppingCart, FaCarrot } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/shopcart/actions';

// import { toast } from 'react-toastify';
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

export default function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [prodcats, setProdCats] = useState([]);
  const [prod, setProd] = useState(0);
  const [prodTitle, setProdTitle] = useState('');
  const [inputFields, setInputFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detailStatus, setDetailStatus] = useState(false);
  const [currentProd, setCurrentProd] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prodQty, setProdQty] = useState(0);

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
      if (prod === 0) {
        const response = await axios.get('/product');
        setProducts(response.data);
        setInputsInitial(response.data.length);
      } else {
        const response = await axios.get(`/product/?id=${prod}`);
        setProducts(response.data);
        setInputsInitial(response.data.length);
      }
    }

    getData();

    async function getDataMenu() {
      const response = await axios.get('/prodcat');
      setProdCats(response.data);
      setIsLoading(false);
    }

    getDataMenu();
  }, [prod, prodTitle]);

  const handleInputChange = (index, evt) => {
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

  const addItenCart = (index) => {
    const prodID = products[index].id;
    dispatch(actions.addIten({ prodID }));
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
        <ProductDetail
          detailStatus={detailStatus}
          currentProd={currentProd}
          currentIndex={currentIndex}
          prodQty={Number(prodQty)}
          close={(qty) => handleCloseDetail(qty)}
        />
        <h1>Produtos{prodTitle}:</h1>

        <ProductContainer>
          {products.length === 0 ? (
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
                        value={inputFields[index] || 0}
                        onChange={(evt) => handleInputChange(index, evt)}
                      />
                    </NumberBox>
                    <AddRemove>
                      <Button onClick={() => handleInputBUp(index)}>+</Button>
                      <br />
                      <Button onClick={() => handleInputBDown(index)}>-</Button>
                    </AddRemove>
                  </QuantityDiv>
                  <IconBasket onClick={() => addItenCart(index)}>
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
