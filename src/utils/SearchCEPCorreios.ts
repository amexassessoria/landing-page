import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

interface IResponseVIACEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

interface IResponse {
  response?: IResponseVIACEP;
  error: boolean;
}

class ApiCEPCorreios {
  public async SearchCEP(cep: string): Promise<IResponse> {
    return await axiosInstance
      .get<IResponseVIACEP>(`${cep}/json`)
      .then(response => {
        if (response.data.erro) {
          return {
            error: true,
          };
        }

        return {
          error: false,
          response: response.data,
        };
      })
      .catch(error => {
        return {
          error: true,
        };
      });
  }
}

export default ApiCEPCorreios;
