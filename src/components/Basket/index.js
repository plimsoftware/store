import React, { useEffect } from 'react';
import Proptype from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaCaretRight, FaTimesCircle } from 'react-icons/fa';

import { BasketContainer } from './styled';
import * as actions from '../../store/modules/shopcart/actions';

export default function ProductDetail({ totalBasket, cartItens }) {
  const dispatch = useDispatch();
  const totalItens = useSelector((state) => state.shopcart.total);

  useEffect(() => {}, []);

  const deleteItenCart = (e) => {
    const id = e.currentTarget.className.baseVal;
    if (id) {
      dispatch(actions.removeIten(id));
      // handleTotalBasket();
    }
  };

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
                <FaTimesCircle
                  size={12}
                  className={itens.id}
                  onClick={(evt) => deleteItenCart(evt)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <strong>
        {totalItens} artigos no carrinho <FaShoppingCart size={15} />
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
