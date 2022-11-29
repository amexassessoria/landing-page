import api from '@http/api';
import moment from 'moment';
export interface IPerfil {
  id: string;
  descricao: string;
  status_ativo: boolean;
}

export interface IRequestCreatePessoa {
  nome: string;
  nome_fantasia: string;
  data_nascimento: string;
  documento: string;
  sexo: string;
  documento_indicador?: string;
  status_ativo?: number;
}

export interface IResponseCreatePessoa {
  id: number;
}

class PageEditCadastroPessoaServices {
  public async GetTiposPerfil() {
    return await api
      .get<IPerfil[]>('api/TipoPerfil/GetTiposPerfil')
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

  public async CreatePessoa(pessoa: IRequestCreatePessoa) {
    return await api
      .post<IResponseCreatePessoa>('/api/Pessoa/CreatePessoa', pessoa)
      .then(response => {
        const id = response.data.id;

        return {
          error: false,
          response: { id },
        };
      })
      .catch(error => {
        return {
          error: true,
          response: null,
        };
      });
  }

  public async getCidadesByUF(estado: string) {
    return await api
      .post<IResponseGetCidadesByUf[]>('/api/ContatoOffline/FindCidades', {
        uf: estado,
      })
      .then(response => {
        let reescrito: ICidade[] = [];

        response.data.map(cidade => {
          const obj: ICidade = {
            id: cidade.cidade_id,
            label: cidade.cidade_nome,
          };

          return reescrito.push(obj);
        });

        return {
          error: false,
          response: reescrito,
        };
      })
      .catch(() => {
        return {
          error: true,
          response: [],
        };
      });
  }
}


export interface IResponseGetCidadesByUf {
  cidade_id: string;
  cidade_nome: string;
}

export interface ICidade {
  id: string | number;
  label: string;
}

export default PageEditCadastroPessoaServices;
