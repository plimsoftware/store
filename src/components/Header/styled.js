import styled from 'styled-components';

import { primaryDarkColor } from '../../config/colors';

export const Nav = styled.div`
  background: ${primaryDarkColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  position: fixed;
  z-index: 2;
  width: 100%;
`;

export const NavHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const NavLeft = styled.div`
  width: 33%;
  text-align: left;

  img {
    width: 280px;
    height: 56px;
    margin-top: 10px;
  }
`;

export const NavRight = styled.div`
  width: 66%;
  text-align: right;
  justify-items: flex-end;
  font-size: 15px;
  color: white;
  align-content: center;

  a {
    padding: 10px;
    color: white;
    font-weight: normal;
    justify-content: center;
  }
`;
