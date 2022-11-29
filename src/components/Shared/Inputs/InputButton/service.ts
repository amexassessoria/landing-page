import api from '@http/api';

interface IRequestData {
  id_perfil: number;
  historico_descricao: string;
  descricao?: string;
}

export interface IHistorico {
  descricao: string;
  data_cadastro: string;
}

interface IResponse {
  error: boolean;
  response?: IHistorico[];
}

class Service {
  public async addHistoricoGeral({
    descricao,
    id_perfil,
    historico_descricao,
  }: IRequestData): Promise<IResponse> {
    return await api
      .post('api/Historico/CreateHistorico', {
        id_perfil: id_perfil,
        tipo_historico_descricao: historico_descricao,
        descricao: descricao,
        status_ativo: 1,
      })
      .then(response => {
        return {
          error: false,
        };
      })
      .catch(error => {
        return {
          error: true,
        };
      });
  }

  public async loadHistorico({
    id_perfil,
    historico_descricao,
  }: IRequestData): Promise<IResponse> {
    return await api
      .post<IHistorico[]>('api/Historico/FindHistoricoByPerfilId', {
        id_perfil: id_perfil,
        TipoHistorico_Descricao: historico_descricao,
      })
      .then(response => {
        return {
          error: false,
          response: response.data.reverse(),
        };
      })
      .catch(error => {
        return {
          error: true,
        };
      });
  }
}

export default Service;
