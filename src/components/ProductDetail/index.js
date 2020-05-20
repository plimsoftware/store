import React, { useEffect, useState } from 'react';
import Proptype from 'prop-types';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

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

  const handleInputBUp = () => {
    const values = inputField + 1;
    setInputField(values);
  };

  const handleInputBDown = () => {
    let values = inputField - 1;
    if (values < 0) values = 0;
    setInputField(values);
  };

  const addItenCart = (prodID, name, qtd) => {
    if (qtd > 0) {
      dispatch(actions.addIten({ prodID, name, qtd }));
    }
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
        <p>Stock:</p>
        <p>Promoção:</p>
        <span>
          Preço: {currentProd.price}€/{currentProd.priceunit}
        </span>

        <ProdAddBasket>
          <QuantityDiv>
            <NumberBox>
              <input
                type="number"
                value={inputField}
                onChange={(evt) => setInputField(Math.abs(evt.target.value))}
              />
            </NumberBox>
            <AddRemove>
              <Button onClick={handleInputBUp}>+</Button>
              <br />
              <Button onClick={handleInputBDown}>-</Button>
            </AddRemove>
          </QuantityDiv>
          <IconBasket
            onClick={() =>
              addItenCart(currentProd.id, currentProd.name, inputField)
            }
          >
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
    name: Proptype.string,
    long_desc: Proptype.string,
    Photo: Proptype.shape({
      url: Proptype.string,
    }),
  }),
  prodQty: Proptype.number,
  close: Proptype.func,
};
