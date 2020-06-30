import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import {
  Form,
  Container,
  Separador1,
  Separador2,
  Checkbox,
  Table,
  Avancar,
  Voltar,
} from './styled';
import axios from '../../services/axios';
import Loading from '../Loading';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Step2({ nextStep }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [runGetData, setRunGetData] = useState(true);
  const [name, setName] = useState('');
  const [surname, setSurNome] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [location, setLocation] = useState('');
  const [locationcp, setLocationcp] = useState('');
  const [phone, setPhone] = useState(0);
  const client = useSelector((state) => state.auth.client);
  const [address1Deliver, setAddress1Deliver] = useState('');
  const [address2Deliver, setAddress2Deliver] = useState('');
  const [locationDeliver, setLocationDeliver] = useState('');
  const [locationcpDeliver, setLocationcpDeliver] = useState('');
  const [emailVerification, SetEmailVerification] = useState(false);
  const [checkOk, setCheckOk] = useState(false);

  useEffect(() => {
    async function getData() {
      // setRunGetData(false);

      try {
        setIsLoading(true);
        const { data } = await axios.get(`/clients/${client.id}`);

        setName(data.name);
        setSurNome(data.surname);
        setEmail(data.email);
        setAddress1(data.address1);
        setAddress2(data.address2);
        setLocationcp(data.locationcp);
        setLocation(data.location);
        setPhone(data.phone);
        SetEmailVerification(data.email_verification);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
        if (status === 401)
          errors.map(() =>
            toast.error('A sua sessão expirou faça login novamente')
          );
        dispatch(actions.loginFailure());
        history.push('/');
      }
      setRunGetData(false);
      setIsLoading(false);
    }

    if (runGetData) getData();
  }, [runGetData, client.id, dispatch]);

  function checkAddress() {
    const regex = /^\d{4}(-\d{3})?$/;

    let formErrors = false;

    if (address1Deliver.length < 5 || address1Deliver.length > 100) {
      formErrors = true;

      toast.error('Morada deve ter entre 5 e 100 caracteres');
    }

    if (address2Deliver.length > 100) {
      formErrors = true;

      toast.error('Morada (cont.) deve ter entre 0 e 100 caracteres');
    }

    if (emailVerification === false) {
      formErrors = true;

      toast.error(
        'Precisa de verificar primeiro o seu endereço de e-mail. Verifique os dados do seu perfil.'
      );
    }

    if (locationDeliver.length < 3 || locationDeliver.length > 35) {
      formErrors = true;

      toast.error('Localidade deve ter entre 3 e 35 caracteres');
    }

    if (!regex.test(locationcpDeliver)) {
      formErrors = true;

      toast.error('Código Postal não está no formato correto ( 0000-000 )');
    }

    if (formErrors) return;

    setCheckOk(true);
    const { id } = client;

    dispatch(
      actions.updateAddress({
        id,
        address1Deliver,
        address2Deliver,
        locationDeliver,
        locationcpDeliver,
      })
    );

    nextStep(3);
  }

  const handleAddress = (evt) => {
    evt.persist();

    if (evt.currentTarget.checked) {
      setAddress1Deliver(address1);
      setAddress2Deliver(address2);
      setLocationcpDeliver(locationcp);
      setLocationDeliver(location);
    } else {
      setAddress1Deliver('');
      setAddress2Deliver('');
      setLocationcpDeliver('');
      setLocationDeliver('');
    }
  };

  const handleStepBack = () => {
    nextStep(1);
  };

  const handleStepForward = () => {
    if (!checkOk) {
      checkAddress();
      return;
    }

    nextStep(3);
  };

  return (
    <>
      <Container>
        <Loading isLoading={isLoading} />
        <Form>
          <label htmlFor="nome">
            Nome:
            <input
              disabled
              readOnly
              type="text"
              className="nome"
              value={name}
            />
          </label>
          <label htmlFor="apelido">
            Apelido:
            <input
              disabled
              readOnly
              type="text"
              className="apelido"
              value={surname}
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input disabled readOnly type="email" value={email} />
          </label>
          <label htmlFor="morada1">
            Morada:
            <input
              disabled
              readOnly
              type="text"
              className="morada1"
              value={address1}
            />
          </label>
          <label htmlFor="morada2">
            Morada (cont.):
            <input
              disabled
              readOnly
              type="text"
              className="morada2"
              value={address2}
            />
          </label>
          <div>
            <span className="local">
              <label htmlFor="localidade">
                Localidade:
                <input
                  disabled
                  readOnly
                  type="text"
                  className="localidade"
                  value={location}
                />
              </label>
            </span>
            <span className="cp">
              <label htmlFor="localidadecp">
                Código Postal:
                <input
                  disabled
                  readOnly
                  type="text"
                  className="localidadecp"
                  value={locationcp}
                />
              </label>
            </span>
          </div>
          <label htmlFor="telefone">
            Telefone:
            <input
              disabled
              readOnly
              type="text"
              className="telefone"
              value={phone}
            />
          </label>
          <Separador1 />
          <Separador2 />
          <Checkbox>
            <input
              type="checkbox"
              className="moradaEntrega"
              onChange={handleAddress}
            />
            <span>Usar morada associada ao cliente</span>
          </Checkbox>
          <label htmlFor="morada1">
            Morada de entrega:
            <input
              type="text"
              className="morada1"
              value={address1Deliver}
              placeholder="Digite a sua morada"
              onChange={(e) => setAddress1Deliver(e.target.value)}
            />
          </label>
          <label htmlFor="morada2">
            Morada de entrega (cont.):
            <input
              type="text"
              className="morada2"
              value={address2Deliver}
              placeholder="Digite a sua morada"
              onChange={(e) => setAddress2Deliver(e.target.value)}
            />
          </label>
          <div>
            <span className="local">
              <label htmlFor="localidade">
                Localidade:
                <input
                  type="text"
                  className="localidade"
                  value={locationDeliver}
                  placeholder="Digite a sua localidade"
                  onChange={(e) => setLocationDeliver(e.target.value)}
                />
              </label>
            </span>
            <span className="cp">
              <label htmlFor="localidadecp">
                Código Postal:
                <input
                  type="text"
                  className="localidadecp"
                  value={locationcpDeliver}
                  placeholder="0000-000"
                  onChange={(e) => setLocationcpDeliver(e.target.value)}
                />
              </label>
            </span>
          </div>
        </Form>
      </Container>
      <Table>
        <tbody>
          <tr>
            <td>
              <div className="col1">
                <Voltar type="submit" onClick={handleStepBack}>
                  <span className="letras">Voltar</span>
                  <span className="back">O</span>
                  <FaChevronCircleLeft className="BotAvanc" size={24} />
                </Voltar>
              </div>
            </td>
            <td>
              <div className="col2">
                <Avancar type="submit" onClick={handleStepForward}>
                  <span className="letras">Avançar</span>
                  <span className="back">O</span>
                  <FaChevronCircleRight className="BotAvanc" size={24} />
                </Avancar>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

Step2.defaultProps = {
  nextStep: () => {},
};

Step2.propTypes = {
  nextStep: Proptype.func,
};
