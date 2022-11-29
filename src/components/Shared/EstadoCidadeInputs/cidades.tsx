import React from 'react';
import { Grid } from '@material-ui/core';
import { Form, Select } from 'antd';

import CidadesService from '../BuscaCidades/services';
import { ICidade } from '@src/pages/Principal/services';

interface IProps {
  ufProps?: string;
  notUseLabel?: boolean;
  notUseFeedback?: boolean;
}

const CidadesInput: React.FC<IProps> = ({
  ufProps,
  notUseLabel,
  notUseFeedback,
}) => {
  const [cidades, setCidades] = React.useState<ICidade[]>([]);
  const [suggestionsCidade, setSuggestionsCidade] = React.useState<ICidade[]>(
    [],
  );

  const [uf, setUF] = React.useState(ufProps || '');

  React.useEffect(() => {
    setUF(ufProps || '');
  }, [ufProps]);

  React.useEffect(() => {
    const getCidades = async () => {
      const cidadesService = new CidadesService();
      const getCidadesByUFResponse = await cidadesService.getCidadesByUF(uf);
      if (!getCidadesByUFResponse.error) {
        setCidades(getCidadesByUFResponse.response);
        setSuggestionsCidade(getCidadesByUFResponse.response);
      }
    };

    if (uf !== '') {
      getCidades();
    }
  }, [uf]);

  const handleSearchCidade = (value: any) => {
    if (value) {
      setSuggestionsCidade(
        cidades.filter(suggestion =>
          JSON.stringify(suggestion)
            .toLowerCase()
            .includes(value.toLowerCase()),
        ),
      );
    } else {
      setSuggestionsCidade(cidades);
    }
  };

  const validatorCidade = (_: any, val: any) => {
    const exists = suggestionsCidade.filter(suggestion =>
      JSON.stringify(suggestion).includes(val),
    );

    if (exists.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Não encontrado'));
  };

  return (
    <Grid item sm={12} xs={12}>
      <Form.Item
        name="cidade_id"
        label={notUseLabel ? '' : 'Cidade'}
        style={{ padding: 0 }}
        hasFeedback={notUseFeedback ? false : true}
        rules={[
          {
            required: true,
            message: 'Selecione uma Cidade',
          },
          {
            validator: (e, a) => validatorCidade(e, a),
            message: 'Cidade não existe',
          },
        ]}
      >
        <Select
          showSearch
          placeholder={'Cidade'}
          filterOption={false}
          onSearch={handleSearchCidade}
          disabled={uf === '' ? true : false}
          style={{
            maxWidth: '50ch',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {suggestionsCidade.map(cidade => (
            <Select.Option
              key={cidade.id}
              value={cidade.id}
              style={{
                maxWidth: '50ch',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {cidade.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Grid>
  );
};

export default CidadesInput;
