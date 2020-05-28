import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Bem-vindo à nossa loja!');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Email ou password inválida.');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const {
    id,
    name,
    surname,
    email,
    address1,
    address2,
    location,
    locationcp,
    phone,
    password,
  } = payload;

  try {
    if (id) {
      yield call(axios.put, '/clients', {
        name,
        surname,
        email,
        address1,
        address2,
        location,
        locationcp,
        phone,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso.');
      yield put(actions.registerUpdatedSuccess({ name, email }));
    } else {
      yield call(axios.post, '/clients', {
        name,
        surname,
        email,
        address1,
        address2,
        location,
        locationcp,
        phone,
        password,
      });
      toast.success('Conta criada com sucesso.');
      yield put(actions.registerCreatedSuccess({ name, email }));
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.info('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
