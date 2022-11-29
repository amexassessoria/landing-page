//import runtimeEnv from '@mars/heroku-js-runtime-env';
//const env = runtimeEnv();

//const valueURL = env.REACT_APP_API || 'http://localhost:5000/';
//const valueURLFIX =
 // valueURL.slice(-1) == '/'
 //   ? valueURL.substr(0, valueURL.length - 1)
 //   : valueURL;

//export const UrlServerAPI = valueURLFIX;


const valueURL = 'http://localhost:5000/';
const valueURLFIX =
  valueURL.slice(-1) == '/'
    ? valueURL.substr(0, valueURL.length - 1)
    : valueURL;

export const UrlServerAPI = valueURLFIX;
