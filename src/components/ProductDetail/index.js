import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { FaShoppingCart, FaCarrot } from 'react-icons/fa';

import {
  ProdContainer,
  Container,
  Close,
  ProfilePicture,
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
  currentIndex,
  prodQty,
  close,
}) {
  const [inputField, setInputField] = useState(0);

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
            onClick={(evt) => {}}
            to={`/aluno/${currentProd.id}/delete`}
          >
            <FaShoppingCart size={26} color="red" />
          </IconBasket>
        </ProdAddBasket>
      </ProdContainer>
    </Container>
  );
}

ProductDetail.defaultProps = {
  detailStatus: false,
  currentProd: {},
  currentIndex: 0,
  prodQty: 0,
  close: () => {},
};

ProductDetail.propTypes = {
  detailStatus: Proptype.bool,
  currentProd: Proptype.shape({}),
  currentIndex: Proptype.number,
  prodQty: Proptype.number,
  close: Proptype.func,
};
