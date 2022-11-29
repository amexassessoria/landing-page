import { createGlobalStyle } from 'styled-components';

// import RobotoRegular from '../assets/fonts/Roboto/Roboto-Regular.ttf';
/* @font-face {
    font-family: 'Roboto-Regular';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegular});
  } */

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }


  body{
    background: #fff !important;
    color:#666;
    /* -webkit-font-smoothing: antialiased; */
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  body, input, button{
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }



  button{
    cursor: pointer;
  }


h1{
  font-family: 'Roboto', sans-serif;
}

  .makeStyles-margin-2 {
    margin: 0 !important;
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }

/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #c7c7c7;
  border-radius: 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c7c7c7;
}



input:-internal-autofill-selected {
    appearance: menulist-button;
    background-color: none !important;
    background-image: none !important;
    color: -internal-light-dark(black, white) !important;
}



.kkTPap {
    opacity: 0.7;
    color: #000;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    position: fixed;
    z-index: 99998;
  }
  .dOKlPN{
    z-index: 99998;
  }

  .ant-select-dropdown{
    z-index: 99999;
  }


  .reactour__helper.helper.reactour__helper--is-open{
    z-index: 99999;
  }

`;
