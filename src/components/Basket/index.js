import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaCaretRight, FaTimesCircle } from 'react-icons/fa';

import { BasketContainer } from './styled';
import * as actions from '../../store/modules/shopcart/actions';

export default function Basket() {
  const dispatch = useDispatch();
  const totalItens = useSelector((state) => state.shopcart.total);
  const cartItens = useSelector((state) => state.shopcart.cartItens);

  useEffect(() => {}, []);

  const deleteItenCart = (e) => {
    const id = e.currentTarget.className.baseVal;
    if (id) {
      dispatch(actions.removeIten(id));
    }
  };

  return (
    <BasketContainer totalItens={totalItens}>
      <div className="listaprodutos">
        <ul>
          {cartItens ? (
            cartItens.map((itens) => (
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
            ))
          ) : (
            <span />
          )}
        </ul>
      </div>
      <strong>
        {totalItens} artigos no carrinho <FaShoppingCart size={15} />
      </strong>
    </BasketContainer>
  );
}
