import * as types from '../types';

const initalState = {
  cartItens: [{}],
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
          return newState;
        }
      }

      const newState = {
        cartItens: [
          ...state.cartItens,
          { id: action.payload.prodID, qtd: action.payload.qtd },
        ],
      };
      return newState;
    }

    default: {
      return state;
    }
  }
}
