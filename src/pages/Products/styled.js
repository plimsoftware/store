import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductContainer = styled.div`
  margin-top: 20px;
`;

export const ProfilePicture = styled.div`
  svg {
    margin-bottom: 45px;
    align-items: center;
  }

  img {
    width: 200px;
    height: 150px;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;

export const ProductShow = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-right: 15px;
`;
