import * as types from '../types';

const initalState = {
  cartItens: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case types.ADD_ITEN: {
      const newState = {
        cartItens: [...state.cartItens, action.payload.prodID],
      };
      return newState;
    }

    default: {
      return state;
    }
  }
}
