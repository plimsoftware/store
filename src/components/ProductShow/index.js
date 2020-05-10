import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaCarrot } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import Proptype from 'prop-types';

import {
  ProfilePicture,
  QuantityDiv,
  NumberBox,
  AddRemove,
  ProdAddBasket,
  IconBasket,
  Button,
} from './styled';

export default function ProductShow(props) {
  const [inputFields, setInputFields] = useState([{}]);
  const { product, index } = props;

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

  return (
    <>
      {/* <ProfilePicture>
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
        */}
    </>
  );
}

ProductShow.defaultProps = {
  product: {},
  index: 0,
};

ProductShow.propTypes = {
  product: Proptype.shape({}),
  index: Proptype.number,
};
