import axios from 'axios';
import { UrlServerAPI } from '@src/Configs/app';

const api = axios.create({
   baseURL: 'http://186.237.14.252:5000/api/site/CriarCadastroComCobranca/',
   method: 'POST',
   headers: {"Content-Type":"application/json"},
});

export default api;
