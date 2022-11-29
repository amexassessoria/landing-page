import { createTheme } from '@material-ui/core/styles';
import { getColors } from './colorsTheme';

const roboto = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',

  fontWeight: 400,
  // src: `
  //   local('Roboto'),
  //   local('Roboto-Regular'),
  //   url(${Roboto}) format('ttf')
  // `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: getColors()?.azulClaro,
    },
    secondary: {
      main: getColors()?.azulEscuro,
    },
  },

  zIndex: {
    modal: 999,
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        margin: 0,
        padding: 0,
      },
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': [roboto],
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: getColors()?.azulClaro,
          '& .MuiSvgIcon-root': {
            color: getColors()?.branco,
          },
          '& .MuiTypography-root': {
            color: getColors()?.branco,
          },
        },
        '&&:hover': {
          backgroundColor: getColors()?.azulClaro,
          '& .MuiSvgIcon-root': {
            color: getColors()?.branco,
          },
          '& .MuiTypography-root': {
            color: getColors()?.branco,
          },
        },
      },
    },
  },
});
