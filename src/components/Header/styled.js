import styled from 'styled-components';
import { primaryDarkColor } from '../../config/colors';

export const Nav = styled.div`
  background: ${primaryDarkColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  position: fixed;
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
    width: 307px;
    height: 75px;
    margin-top: 10px;
  }
`;

export const NavRight = styled.div`
  width: 66%;
  text-align: right;
  justify-items: flex-end;

  a {
    padding: 10px;
    color: white;
    margin: 0 10px 0 0;
    font-weight: bold;
  }
`;
