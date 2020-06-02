import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaCarrot,
  FaTimesCircle,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from 'react-icons/fa';

import {
  Table,
  TableB,
  ProfilePicture,
  Description,
  Price,
  QuantityDiv,
  NumberBox,
  AddRemove,
  Button,
  Remover,
  Total,
  Avancar,
  Voltar,
} from './styled';
import axios from '../../services/axios';
import Loading from '../Loading';
import * as actions from '../../store/modules/shopcart/actions';
import history from '../../services/history';

export default function Step1({ nextStep }) {
  const dispatch = useDispatch();
  const cartItens = useSelector((state) => state.shopcart.cartItens);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket
  const [totalCompra, setTotalCompra] = useState(0);
  const [runGetData, setRunGetData] = useState(true);
  const [inputFields, setInputFields] = useState([]); // Campos quantidade

  const ShowTotal = useCallback(() => {
    if (listProd.length === 0) {
      setTotalCompra(0);
      return;
    }

    let getTotal = 0;
    const values = [...inputFields];

    listProd.forEach((prod, index) => {
      let quantity = cartItens.find((item) => prod.id === item.id);

      if (quantity) {
        quantity = quantity.qtd;
      } else {
        quantity = 0;
      }

      const prodQtd = prod.price * quantity;
      getTotal += prodQtd;
      getTotal.toFixed(2);
      values[index] = quantity;
    });
    setInputFields(values);
    setTotalCompra(getTotal.toFixed(2));
  }, [listProd, inputFields, cartItens]);

  useEffect(() => {
    function setInputsInitial(length) {
      const newInputFields = [];
      for (let i = 0; i < length; i += 1) {
        newInputFields.push('0');
      }
      setInputFields(newInputFields);
    }

    async function getData() {
      setRunGetData(false);

      const newList = [];
      cartItens.map((itens) => {
        newList.push(itens.id);

        return newList;
      });
      const listURL = newList
        .map((el, idx) => {
          return `list[${idx}]=${el}`;
        })
        .join('&');

      if (cartItens.length === 0) {
        setListProd([]);
        return;
      }
      setIsLoading(true);
      const response = await axios.get(`/product/?${listURL}`);

      setListProd(response.data);
      setInputsInitial(response.data.length);
      setInputFields([]);
      setIsLoading(false);
    }

    if (runGetData) getData();
    if (inputFields.length === 0 || listProd.length === 0) ShowTotal();
  }, [cartItens, runGetData, inputFields, ShowTotal, listProd]);

  function GetQtdos(props) {
    const { product } = props;
    let quantity = cartItens.find((itemFind) => itemFind.id === product.id);

    if (quantity) {
      quantity = quantity.qtd;
    } else {
      quantity = 0;
    }

    const priceQtd = product.price * quantity;
    const finalPrice = priceQtd.toFixed(2);

    return (
      <>
        <p>
          <strong>Quantidade: </strong>
          {quantity}
        </p>
        <p>
          <strong>Preço total: </strong>
          {finalPrice}€
        </p>
      </>
    );
  }

  GetQtdos.defaultProps = {
    product: {},
  };

  GetQtdos.propTypes = {
    product: Proptype.shape([]),
  };

  const handleInputChange = (index, evt) => {
    const values = [...inputFields];
    values[index] = Math.abs(evt.target.value);
    setInputFields(values);
  };

  const handleInputBUp = (index, prodID, name) => {
    const values = [...inputFields];
    let newValue = Number(values[index]);
    const qtd = 1;
    newValue += 1;
    values[index] = newValue;
    setInputFields(values);

    dispatch(actions.addIten({ prodID, name, qtd }));
    ShowTotal();
  };

  const handleInputBDown = (index, prodID, name) => {
    const values = [...inputFields];
    let newValue = Number(values[index]);
    let qtd = -1;
    newValue -= 1;
    if (newValue < 0) {
      newValue = 0;
      qtd = 0;
    }
    values[index] = newValue;
    setInputFields(values);

    dispatch(actions.addIten({ prodID, name, qtd }));
    ShowTotal();
  };

  const deleteItenCart = (e) => {
    const id = e.currentTarget.name;
    if (id) {
      dispatch(actions.removeIten(id));
    }
    setRunGetData(true);
  };

  const handleStepBack = () => {
    history.push('/');
  };

  const handleStepForward = () => {
    if (listProd.length === 0 || listProd == null) {
      toast.warn('Sem produtos no carrinho!');
      history.push('/');
      return;
    }
    nextStep(2);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Table>
        <tbody>
          {listProd.length === 0 || listProd == null ? (
            <tr>
              <td>
                <strong>Carrinho sem produtos.</strong>
              </td>
            </tr>
          ) : (
            listProd.map((product, index) => (
              <tr key={product.id}>
                <ProfilePicture>
                  {get(product, 'Photo.url', false) ? (
                    <img src={product.Photo.url} alt="" />
                  ) : (
                    <FaCarrot size={50} />
                  )}
                </ProfilePicture>
                <Description>
                  <h4>{product.name}</h4>
                  <br />
                  <p>{product.short_desc}</p>
                </Description>
                <Price>
                  <p>
                    <strong>Preço unitário: </strong>
                    {product.price}€/{product.priceunit}
                  </p>
                  <GetQtdos product={product} />
                </Price>
                <td>
                  <QuantityDiv>
                    <NumberBox>
                      <input
                        disabled
                        type="number"
                        name={product.id}
                        value={inputFields[index] || 0}
                        onChange={(evt) => handleInputChange(index, evt)}
                      />
                    </NumberBox>
                    <AddRemove>
                      <Button
                        onClick={() =>
                          handleInputBUp(index, product.id, product.name)
                        }
                      >
                        +
                      </Button>
                      <br />
                      <Button
                        onClick={() =>
                          handleInputBDown(index, product.id, product.name)
                        }
                      >
                        -
                      </Button>
                    </AddRemove>
                  </QuantityDiv>
                </td>
                <td>
                  <Remover
                    name={product.id}
                    onClick={(evt) => deleteItenCart(evt)}
                  >
                    <FaTimesCircle size={15} />
                    <span>Remover</span>
                  </Remover>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Total>
        <p>Preço final: {totalCompra}€ </p>
      </Total>
      <TableB>
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
      </TableB>
    </>
  );
}

Step1.defaultProps = {
  product: {},
  nextStep: () => {},
};

Step1.propTypes = {
  product: Proptype.shape({
    id: Proptype.number,
    priceunit: Proptype.string,
    price: Proptype.number,
    name: Proptype.string,
    short_desc: Proptype.string,
    Photo: Proptype.shape({
      url: Proptype.string,
    }),
  }),
  nextStep: Proptype.func,
};
