import * as types from '../types';

const initalState = {
  cartItens: [],
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
          newState.total += action.payload.qtd;
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
      const qtdIten = state.cartItens.find((item) => action.id === item.id);
      const newState = state.cartItens.filter((id) => id !== action.id);
      newState.total -= qtdIten;
      return newState;
    }

    default: {
      return state;
    }
  }
}
