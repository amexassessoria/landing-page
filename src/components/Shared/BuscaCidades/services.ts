import api from '@http/api';

export interface IResponse {
  id: string;
  label: string;
}

export interface IResponseGetCidadesByUf {
  cidade_id: string;
  cidade_nome: string;
}

class ComponentBuscaCidades {
  public async getCidadesByUF(estado: string) {
    return await api
      .post<IResponseGetCidadesByUf[]>('/api/ContatoOffline/FindCidades', {
        uf: estado,
      })
      .then(response => {
        let reescrito: IResponse[] = [];

        response.data.map(cidade => {
          const obj: IResponse = {
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

export default ComponentBuscaCidades;
