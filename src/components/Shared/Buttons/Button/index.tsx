import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CircularProgress, ButtonBaseProps } from '@material-ui/core';
import { getColors } from '@styles/colorsTheme';
interface IButtonProps extends ButtonBaseProps {
  loading?: boolean;
  color: 'primary' | 'secondary' | 'inherit' | 'default' | undefined | 'tertiary';
  disabledColor?: string;
  fullWidth?: boolean;
}

const ButtonComponent: React.FC<IButtonProps> = ({
  loading,
  color,
  children,
  disabledColor,
  fullWidth,
  ...rest
}) => {
  const CssButton = withStyles({
    root: {
      maxWidth: '100%',
      height: 37,
      fontSize: 15,
      minWidth: 100,
      textTransform: 'none',
      backgroundColor:
        color === 'primary'
          ? getColors().azulClaro
          : color === 'secondary'
          ? getColors().azulEscuro
          : color === 'tertiary'
          ? getColors().vermelho
          : color === 'default'
          ? getColors().cinzaEscuro
          : getColors().cinzaClaro,
      color: getColors()?.branco,
      borderRadius: 10,
      borderColor: '#000',
      '&:disabled': {
        backgroundColor: disabledColor ? disabledColor : '#84c5f080',
      },
    },
  })(Button);

  return (
    <CssButton
      variant="contained"
      disableElevation
      fullWidth={fullWidth}
      size="small"
      style={{ color: getColors()?.branco }}
      disabled={loading}
      {...rest}
    >
      {!loading ? children : <CircularProgress color="secondary" size={15} />}
    </CssButton>
  );
};

export default ButtonComponent;
