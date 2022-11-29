import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CircularProgress, ButtonBaseProps, Grid } from '@material-ui/core';
import { getColors } from '@styles/colorsTheme';
interface IButtonProps extends ButtonBaseProps {
  loading?: boolean;
  color: 'primary' | 'secondary' | 'inherit' | 'default' | undefined | 'tertiary';
  disabledColor?: string;
  fullWidth?: boolean;
  Icon?: React.ComponentType<{}>;
  titleButton: string;
 
}
 
const ButtonWithIcon: React.FC<IButtonProps> = ({
  loading,
  color,
  children,
  disabledColor,
  fullWidth,
  Icon,
  titleButton,
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
      borderRadius: 0,
      '&:disabled': {
        backgroundColor: disabledColor ? disabledColor : '',
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
      <Grid container justify={'center'} alignItems="center">
          {Icon && (
            <Grid
              container
              item
              sm={2}
              xs={4}
              justify="center"
              alignItems="center"
            >
              {Icon && <Icon />}
            </Grid>
          )}
          <Grid>
            <p style={{ textAlign: Icon ? 'left' : 'center' }}>{titleButton}</p>
          </Grid>
        </Grid>
 
    </CssButton>
  );
};
 
export default ButtonWithIcon;
