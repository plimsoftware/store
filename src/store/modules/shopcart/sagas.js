import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

function addIten({ payload }) {
  try {
    //
  } catch {
    toast.error('Deu erro');
    // yield put(actions.ClicaBotaoFailure());
  }
}

function* removeIten({ id }) {
  try {
    yield put(actions.removeIten(id));
  } catch {
    toast.error('Deu erro');
    // yield put(actions.ClicaBotaoFailure());
  }
}

export default all([
  takeLatest(types.ADD_ITEN, addIten),
  takeLatest(types.REMOVE_ITEN, removeIten),
]);
