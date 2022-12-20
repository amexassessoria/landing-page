import api from '@http/api';


export interface IRequestCreatePessoa {
  pessoa?: {
    nome: string;
    cpfcnpj: string;
    email: string;
    telefone: string;
  };
  doacao?: {
    valor: any;
    cartao: boolean;
    boleto: boolean;
    pix: boolean;
    recorrente: boolean;
  };
  endereco?: {
    descricao: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    cep: string;
    uf: string;
  };
  entidade: {
    nome: string;
  };
  campanha:{
    descricao: string;
  };
}

class PageCadastroPessoaServices {



  public async CreatePessoa(pessoa: IRequestCreatePessoa) {
    return await api
      .post('api/site/CriarCadastroComCobranca', pessoa)
      .then(response => {

        return {
          error: false,
          response: response.data,
        };
      })
      .catch(error => {
        return {
          error: true,
          response: [],
        };
      });
  }



}


export default PageCadastroPessoaServices;
