import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Proptype from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaCarrot, FaTimesCircle } from 'react-icons/fa';

import {
  Table,
  ProfilePicture,
  Description,
  Price,
  QuantityDiv,
  NumberBox,
  AddRemove,
  Button,
  Remover,
  Total,
} from './styled';
import axios from '../../services/axios';
import Loading from '../Loading';
import * as actions from '../../store/modules/shopcart/actions';

export default function Step2({ getDataStep1 }) {
  const dispatch = useDispatch();
  let cartItens = useSelector((state) => state.shopcart.cartItens);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [listProd, setListProd] = useState([]); // Lista produtos do Basket
  const [totalCompra, setTotalCompra] = useState(0);
  const [runGetData, setRunGetData] = useState(true);
  const [inputFields, setInputFields] = useState([]); // Campos quantidade

  function ShowTotal() {
    if (listProd.length === 0) return;
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
  }

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
      setIsLoading(false);
    }

    if (runGetData) getData();
    ShowTotal();
    getDataStep1(listProd);
  }, [cartItens, listProd]);

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
      cartItens = 0;
    }
    setRunGetData(true);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <p>cheguei</p>
    </>
  );
}

Step2.defaultProps = {
  product: {},
  getDataStep1: () => {},
};

Step2.propTypes = {
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
  getDataStep1: Proptype.func,
};
