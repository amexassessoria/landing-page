const theme: 'light' = 'light';
 
interface IColors {
  azulClaro: string;
  azulEscuro: string;
  cinzaEscuro: string;
  cinzaClaro: string;
  branco: string;
  vermelho: string;
}
 
export const getColors = (): IColors => {
  return {
    azulClaro: '#84C5F0',
    azulEscuro: '#40455A',
    cinzaEscuro: '#616161',
    cinzaClaro: '#f1f1f166',
    branco: '#ffffff',
    vermelho: '#B85151',
  };
};
