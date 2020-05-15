import React, { useEffect } from 'react';
import Proptype from 'prop-types';
import { FaShoppingCart, FaCaretRight, FaTimesCircle } from 'react-icons/fa';

import { BasketContainer } from './styled';

export default function ProductDetail({ totalBasket, cartItens }) {
  useEffect(() => {}, []);

  return (
    <BasketContainer>
      <div className="listaprodutos">
        <ul>
          {cartItens.map((itens) => (
            <li key={itens.id}>
              <span className="item">
                <FaCaretRight size={12} /> {itens.name} x{itens.qtd}
              </span>
              <span className="botao">
                <FaTimesCircle size={12} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <strong>
        {totalBasket} artigos no carrinho <FaShoppingCart size={15} />
      </strong>
    </BasketContainer>
  );
}

ProductDetail.defaultProps = {
  totalBasket: 0,
  cartItens: [],
};

ProductDetail.propTypes = {
  totalBasket: Proptype.number,
  cartItens: Proptype.shape({
    id: Proptype.number,
    name: Proptype.string,
    qtd: Proptype.number,
  }),
};
