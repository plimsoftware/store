import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  FaShoppingCart,
  FaCaretRight,
  FaTimesCircle,
  FaCartArrowDown,
} from 'react-icons/fa';

import { BasketContainer, Avancar } from './styled';
import * as actions from '../../store/modules/shopcart/actions';
import history from '../../services/history';

export default function Basket() {
  const dispatch = useDispatch();
  const totalItens = useSelector((state) => state.shopcart.total);
  const cartItens = useSelector((state) => state.shopcart.cartItens);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {}, []);

  const deleteItenCart = (e) => {
    const id = e.currentTarget.className.baseVal;
    if (id) {
      dispatch(actions.removeIten(id));
    }
  };

  const checkOut = () => {
    if (totalItens === 0) {
      toast.error('Sem produtos no carrinho.');
      return;
    }

    if (!isLoggedIn) {
      toast.error('Para avançar necessita iniciar sessão.');
    }

    history.push(`/checkout`);
  };

  return (
    <BasketContainer totalItens={totalItens}>
      <div className="listaprodutos">
        <Avancar onClick={checkOut}>
          <span>
            <FaCartArrowDown size={20} />
          </span>
          <span>Avançar</span>
        </Avancar>
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
