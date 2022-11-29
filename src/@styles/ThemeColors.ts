const getLocal = localStorage.getItem('theme');
var THEME: 'light' | 'dark' = 'light';
if (getLocal === 'light' || getLocal === 'dark') {
  THEME = getLocal;
}
import { getColors } from '@styles/colorsTheme';

export default function ThemeColors() {
  if (THEME === 'light') {
    return {
      primary: getColors()?.azulClaro,
      secondary: getColors()?.azulEscuro,
      body: {
        background: getColors()?.branco,
        color: getColors()?.cinzaEscuro,
      },
      menu: {
        background: getColors()?.azulEscuro,
        fontColor: getColors()?.branco,
      },
      grafico: {
        background: '#ccc',
        card: '#f1f1f166',
      },
      menuHeader: {
        background: '#F1F1F1',
        fontColor: '#616161',
        fontColorActivity: '#4D4F5C',
        border: getColors()?.branco,
      },
    };
  } else {
    return {
      primary: getColors()?.azulClaro,
      secondary: '#333748',
      body: {
        background: '#181a1b',
        color: '#a8a095',
      },
      menu: {
        background: '#333748',
        fontColor: getColors()?.branco,
      },
      grafico: {
        background: '#35393b',
        card: '#20232466',
      },
      menuHeader: {
        background: '#202324',
        fontColor: '#aba398',
        fontColorActivity: '#aba398',
        border: '#303436',
      },
    };
  }
}
