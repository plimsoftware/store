import { _ } from 'lodash';
import * as types from '../types';

const initalState = {
  cartItens: [],
  deliverAddress: {},
  total: 0,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case types.ADD_ITEN: {
      const existedItem = state.cartItens.find(
        (item) => action.payload.prodID === item.id
      );
      if (existedItem) {
        const index = state.cartItens.indexOf(existedItem);
        if (index > -1) {
          const newState = { ...state };
          newState.cartItens[index].qtd += action.payload.qtd;
          if (action.payload.qtd !== 0) newState.total += action.payload.qtd;
          return newState;
        }
      }

      const newState = { ...state };
      newState.cartItens.push({
        id: action.payload.prodID,
        name: action.payload.name,
        qtd: action.payload.qtd,
      });
      newState.total += action.payload.qtd;
      return newState;
    }

    case types.REMOVE_ITEN: {
      const qtdIten = state.cartItens.find(
        (item) => item.id === Number(action.id)
      );
      const newState = { ...state };
      newState.cartItens = newState.cartItens.filter(
        (item) => item.id !== Number(action.id)
      );
      if (qtdIten) newState.total -= qtdIten.qtd;
      return newState;
    }

    case types.ADD_DELIVERADDRESS: {
      if (!_.isEmpty(state.deliverAddress)) {
        const newState = { ...state };
        newState.deliverAddress = action.payload;
        return newState;
      }

      return state;
    }

    default: {
      return state;
    }
  }
}
