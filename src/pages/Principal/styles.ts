import { Grid, withStyles, Link } from '@material-ui/core';
import styled from 'styled-components';
import InputNormal from '@components/Shared/Inputs/InputNormal';
import { getColors } from '@src/@styles/colorsTheme';

export const ContainerHeader = styled.div`
  width: 80%;
  height: 40px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LinkRoute = styled(Link)`
  color: ${getColors()?.azulEscuro + '95'} !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 100%;
  text-align: center;
`;

export const TitlePage = styled.h1`
  font-weight: bold;
  color: #616161;
  margin-right: 20px;
  font-size: 18px;
`;

export const LabelHeaderInput = styled.p`
  color: #616161;
`;

export const ContainerInputLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
  flex-wrap: wrap;
`;

export const DivLoading = styled(Grid)`
  position: absolute;
  background-color: #f1f1f1;
  display: flex;
  height: 500px;
  justify-content: center;
  align-items: center;
  z-index: 500;
`;

export const CustomInput = withStyles({
  root: {
    opacity: 1,
    margin: 5,
    borderBottom: 'none',
    '& .MuiFilledInput-input': {
      padding: '15px 10px 15px ',
      textAlign: 'center',
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#f1f1f1',
      border: '1px solid #c7c7c7',
      borderBottom: 'none',
      borderRadius: 0,
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: '1px solid #c7c7c7',
    },
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      opacity: 0.5,
    },
  },
})(InputNormal);
