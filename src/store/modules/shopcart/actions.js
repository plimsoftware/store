import * as types from '../types';

export function addIten(payload) {
  return {
    type: types.ADD_ITEN,
    payload,
  };
}

export function removeIten(id) {
  return {
    type: types.REMOVE_ITEN,
    id,
  };
}
