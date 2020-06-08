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

export function addDeliverAddress(payload) {
  return {
    type: types.ADD_DELIVERADDRESS,
    payload,
  };
}

export function removeDeliverAddress(id) {
  return {
    type: types.REMOVE_DELIVERADDRESS,
    id,
  };
}

export function clearShopCart() {
  return {
    type: types.CLEAR_SHOPCART,
  };
}
