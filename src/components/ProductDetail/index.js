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

export default function ProductDetail({ detailStatus, currentProd, close }) {
  useEffect(() => {});

  if (!detailStatus) return <></>;
  return (
    <Container>
      <ProdBackColor />
      <ProdImage url={currentProd.Photo.url} />
      <ProdContainer>
        <Close onClick={() => close()}>
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
                name={currentProd.id}
                value={0}
                onChange={(evt) => {}}
              />
            </NumberBox>
            <AddRemove>
              <Button onClick={() => {}}>+</Button>
              <br />
              <Button onClick={() => {}}>-</Button>
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
  close: () => {},
};

ProductDetail.propTypes = {
  detailStatus: Proptype.bool,
  currentProd: Proptype.shape({}),
  close: Proptype.func,
};
