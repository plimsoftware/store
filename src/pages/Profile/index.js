import React from 'react';
import { FaAddressCard, FaBox, FaKey, FaTimesCircle } from 'react-icons/fa';

import { TitleHeader, Container, MainContainer, Option, Table } from './styled';

export default function Profile() {
  return (
    <MainContainer>
      <Container>
        <TitleHeader>Dados da conta</TitleHeader>
        <Table>
          <tbody>
            <tr>
              <td>
                <Option to="/register/">
                  <span className="icon">
                    <FaAddressCard size={25} />
                  </span>
                  <span className="letras">Alterar dados</span>
                </Option>
              </td>
              <td>
                <Option to="/changepassword/">
                  <span className="icon">
                    <FaKey size={23} />
                  </span>
                  <span className="letras">Alterar password</span>
                </Option>
              </td>
            </tr>
            <tr>
              <td>
                <Option to="/orders/">
                  <span className="icon">
                    <FaBox size={23} />
                  </span>
                  <span className="letras">Visualizar ordens</span>
                </Option>
              </td>
              <td>
                <Option to="/deleteaccount/">
                  <span className="icon">
                    <FaTimesCircle size={23} />
                  </span>
                  <span className="letras">Eliminar conta</span>
                </Option>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </MainContainer>
  );
}
