import React, { useEffect, useState } from 'react';
import Proptype from 'prop-types';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../store/modules/shopcart/actions';

import {
  ProdContainer,
  Container,
  Close,
  ProdImage,
  ProdAddBasket,
  ProdBackColor,
  QuantityDiv,
  NumberBox,
  AddRemove,
  Button,
  IconBasket,
} from './styled';

export default function ProductDetail({
  detailStatus,
  currentProd,
  prodQty,
  close,
}) {
  const [inputField, setInputField] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputField(prodQty);
  }, [prodQty]);

  function Stock() {
    if (currentProd.myStock.store === 0)
      return <strong style={{ color: 'red' }}>Indisponível</strong>;

    if (currentProd.myStock.store > 0 && currentProd.myStock.store < 20)
      return <strong style={{ color: '#DC6E00' }}>Poucas unidades</strong>;

    return <strong style={{ color: 'green' }}>Disponível</strong>;
  }

  const handleInputBUp = () => {
    const values = inputField + 1;
    setInputField(values);
  };

  const handleInputBDown = () => {
    let values = inputField - 1;
    if (values < 0) values = 0;
    setInputField(values);
  };

  const handleInputChange = (evt) => {
    if (!evt.target.value.match(/^[0-9]+$/)) return;
    setInputField(Math.abs(evt.target.value));
  };

  const addItenCart = (prod, qtd) => {
    const { id, name } = prod;

    if (qtd > prod.myStock.store) {
      toast.error(`Sem stock disponível. Máximo: ${prod.myStock.store}`);
      return;
    }

    if (qtd > 0) {
      dispatch(actions.addIten({ prodID: id, name, qtd }));
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
            {product.price}€/{product.priceunit}
          </strike>{' '}
          <br />
          <span style={{ color: 'red' }}>
            {finalPrice}€/{product.priceunit}
          </span>
        </span>
      );
    }

    return (
      <span>
        Preço: {product.price}€/{product.priceunit}
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

  if (!detailStatus) return <></>;
  return (
    <Container>
      <ProdBackColor />
      <ProdImage url={currentProd.Photo.url} />
      <ProdContainer>
        <Close onClick={() => close(inputField)}>
          <strong>X</strong>
        </Close>
        <h1>{currentProd.name}</h1>
        <h2>{currentProd.long_desc}</h2>
        <p>
          Stock: <Stock />
        </p>
        {currentProd.discount > 0 ? (
          <p>
            Promoção:{' '}
            <strong style={{ color: 'red' }}>{currentProd.discount}%</strong>
          </p>
        ) : (
          <></>
        )}
        <MyPrice product={currentProd} />

        <ProdAddBasket>
          <QuantityDiv>
            <NumberBox>
              <input
                type="text"
                value={inputField}
                onChange={handleInputChange}
              />
            </NumberBox>
            <AddRemove>
              <Button onClick={handleInputBUp}>+</Button>
              <br />
              <Button onClick={handleInputBDown}>-</Button>
            </AddRemove>
          </QuantityDiv>
          <IconBasket onClick={() => addItenCart(currentProd, inputField)}>
            <FaCartPlus size={26} color="red" />
          </IconBasket>
        </ProdAddBasket>
      </ProdContainer>
    </Container>
  );
}

ProductDetail.defaultProps = {
  detailStatus: false,
  currentProd: {},
  prodQty: 0,
  close: () => {},
};

ProductDetail.propTypes = {
  detailStatus: Proptype.bool,
  currentProd: Proptype.shape({
    id: Proptype.number,
    priceunit: Proptype.string,
    price: Proptype.number,
    discount: Proptype.number,
    name: Proptype.string,
    long_desc: Proptype.string,
    Photo: Proptype.shape({
      url: Proptype.string,
    }),
    myStock: Proptype.shape({
      store: Proptype.number,
    }),
  }),
  prodQty: Proptype.number,
  close: Proptype.func,
};
