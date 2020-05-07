import styled from 'styled-components';
import { primaryDarkColor, primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryDarkColor};
  padding: 20px;
  display: flex;
  align-content: flex-end;
  justify-content: space-between;

  a {
    color: white;
    margin: 0 10px 0 0;
    font-weight: bold;
  }

  img {
    background: ${primaryColor};
  }
`;
