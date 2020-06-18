import React from 'react';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import {
  TitleHeader,
  Container,
  MainContainer,
  OptionLink,
  Option,
  Table,
  Title,
} from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.client.id);

  const handleClick = (evt) => {
    evt.preventDefault();

    dispatch(actions.removeAccount(id));
  };

  return (
    <MainContainer>
      <Container>
        <TitleHeader>Eliminar conta</TitleHeader>
        <Title>Tem a certeza que pretende eliminar a sua conta?</Title>
        <Title>Os seus dados serão eliminados completamente,</Title>
        <Table>
          <tbody>
            <tr>
              <td>
                <Option type="submit" onClick={(evt) => handleClick(evt)}>
                  <span className="icon">
                    <FaCheckCircle size={23} />
                  </span>
                  <span className="letras">Sim</span>
                </Option>
              </td>
              <td>
                <OptionLink to="/profile/">
                  <span className="icon">
                    <FaTimesCircle size={23} />
                  </span>
                  <span className="letras">Não</span>
                </OptionLink>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </MainContainer>
  );
}
