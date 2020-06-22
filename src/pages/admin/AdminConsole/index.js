import React, { useState } from 'react';
import {
  FaAddressCard,
  FaWarehouse,
  FaReceipt,
  FaPallet,
  FaListAlt,
} from 'react-icons/fa';

import {
  TitleHeader,
  Title,
  Container,
  MainContainer,
  Option,
  Table,
  Button,
  ButtonRes,
} from './styled';

export default function AdminConsole() {
  const [menuStage, setMenuStage] = useState('index');

  const handleProduct = (evt) => {
    evt.preventDefault();
    setMenuStage('product');
  };

  const handleBackConsole = (evt) => {
    evt.preventDefault();
    setMenuStage('index');
  };

  function IndexMenu() {
    return (
      <Table>
        <tbody>
          <tr>
            <td>
              <Button onClick={handleProduct}>
                <span className="icon">
                  <FaPallet size={25} />
                </span>
                <span className="letras">Gestão de Produtos</span>
              </Button>
            </td>
            <td>
              <Option to="/changepassword/">
                <span className="icon">
                  <FaWarehouse size={23} />
                </span>
                <span className="letras">Gestão de Stock</span>
              </Option>
            </td>
          </tr>
          <tr>
            <td>
              <Option to="/orders/">
                <span className="icon">
                  <FaReceipt size={23} />
                </span>
                <span className="letras">Gestão de Ordens</span>
              </Option>
            </td>
            <td>
              <Option to="/deleteaccount/">
                <span className="icon">
                  <FaAddressCard size={23} />
                </span>
                <span className="letras">Gestão de Clientes</span>
              </Option>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  function ProductMenu() {
    return (
      <div>
        <Table>
          <tbody>
            <tr>
              <td>
                <Option to="/categoryAdmin/">
                  <span className="icon">
                    <FaListAlt size={25} />
                  </span>
                  <span className="letras">Gestão de Categorias</span>
                </Option>
              </td>
              <td>
                <Option to="/productAdmin/">
                  <span className="icon">
                    <FaWarehouse size={23} />
                  </span>
                  <span className="letras">Gestão de Produtos</span>
                </Option>
              </td>
            </tr>
          </tbody>
        </Table>
        <ButtonRes onClick={handleBackConsole}>Voltar</ButtonRes>
      </div>
    );
  }

  return (
    <MainContainer>
      <Container>
        <TitleHeader>Consola Administração</TitleHeader>
        {menuStage === 'product' ? <Title>Gestão de Produtos</Title> : <></>}
        {menuStage === 'index' ? <IndexMenu /> : <></>}
        {menuStage === 'product' ? <ProductMenu /> : <></>}
      </Container>
    </MainContainer>
  );
}
