import api from '@http/api';


export interface IRequestCreatePessoa {
  pessoa?: {
    nome: string;
    cpfcnpj: string;
    email: string;
    telefone: string;
    data_nascimento: any;
  };
  doacao?: {
    valor: number;
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

export interface IRequestCreatePessoaCredito {
  pessoa?: {
    nome: string;
    cpfcnpj: string;
    email: string;
    telefone: string;
    data_nascimento: any;
  };
  doacao?: {
    valor: number;
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
  cartao: {
    number: string,
    verification_value: string,
    first_name: string,
    last_name: string,
    month: string,
    year: string,
  };
}



export interface IRequestCreate{
  pessoa?: {
    nome: string;
    cpfcnpj: string;
    email: string;
    telefone: string;
    data_nascimento: any;
  };
  doacao?: {
    valor: number;
    cartao: boolean;
    boleto: boolean;
    pix: boolean;
    recorrente: boolean;
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

  public async CreatePessoaCredito(pessoa: IRequestCreatePessoaCredito) {
    return await api
      .post('api/site/CriarCadastroComCobrancaDireta', pessoa)
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
