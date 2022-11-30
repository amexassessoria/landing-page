import React from 'react';
import { Grid } from '@material-ui/core';
import { Form, Select } from 'antd';

import UFs from '@components/Shared/BuscaEstados/UF2.json';
import CidadesService from '../BuscaCidades/services';
import { ICidade } from '@src/pages/Principal/services';

interface IProps {
  ufProps?: string;
  cidadeID?: number;
  cidadeLabel?: string;
  formRef?: any;
  setStep?: Function;
}

const EstadoCidadeInputs: React.FC<IProps> = ({
  ufProps,
  cidadeID,
  cidadeLabel,
  setStep,
  formRef,
}) => {
  const [cidades, setCidades] = React.useState<ICidade[]>([]);

  const [suggestionsCidade, setSuggestionsCidade] = React.useState<ICidade[]>(
    [],
  );
  const [suggestionsEstado, setSuggestionsEstado] = React.useState<ICidade[]>(
    UFs.UF,
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
        await setCidades(getCidadesByUFResponse.response);
        await setSuggestionsCidade(getCidadesByUFResponse.response);
      }
      if (suggestionsCidade.length === 0) {
        await setCidadeReaproveitamento();
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

  const handleSearchUF = (value: any) => {
    if (value) {
      setSuggestionsEstado(
        UFs.UF.filter(suggestion =>
          JSON.stringify(suggestion)
            .toLowerCase()
            .includes(value.toLowerCase()),
        ),
      );
    } else {
      setSuggestionsEstado(UFs.UF);
    }
  };

  const handleUF = (value: any) => {
    setSuggestionsEstado(UFs.UF);
    if (value) {
      if (setStep) {
        setStep();
      }

      setUF(value);
    } else {
      setUF('');
    }
  };

  const setCidadeReaproveitamento = () => {
    console.log(cidadeID);

    if (suggestionsCidade.length === 0) {
      if (cidadeID && cidadeID > 0) {
        let cidade: ICidade[] = [
          { id: cidadeID || 0, label: cidadeLabel || '' },
        ];

        console.log(cidade);

        setSuggestionsCidade(cidade);

        console.log(cidadeLabel);
      } else {
        console.log(cidadeID);
      }
    }
  };

  const validatorCidade = (_: any, val: any) => {
    console.log(suggestionsCidade);

    if (suggestionsCidade.length === 0) {
      // let cidade: ICidade[] = [
      //   { id: formRef.getFieldValue('cidade_id'), label: cidadeLabel || '' },
      // ];

      // console.log(cidade);

      // setSuggestionsCidade(cidade);

      // console.log(cidadeLabel);
      setCidadeReaproveitamento();

      return Promise.resolve();
    }

    if (val === '') {
      return Promise.resolve();
    }

    const exists = suggestionsCidade.filter(suggestion =>
      JSON.stringify(suggestion).includes(val),
    );

    if (exists.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Não encontrado'));
  };

  return (
    <>
      <Grid item sm={4} xs={12} className="first-page-example-step">
        <Form.Item
          name="estado_descricao"
          label="Estado"
          rules={[
            {
              required: false,
              message: 'Selecione um Estado',
            },
          ]}
        >
          <Select
            showSearch
            placeholder={'Estado'}
            filterOption={false}
            onSearch={handleSearchUF}
            onChange={handleUF}
            style={{
              maxWidth: '50ch',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {suggestionsEstado.map(Uf => (
              <Select.Option
                key={Uf.label}
                value={Uf.label}
                style={{
                  maxWidth: '50ch',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {Uf.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Grid>

      <Grid item sm={8} xs={12} className="first-page-example-step2">
        <Form.Item
          name="cidade_id"
          label="Cidade"
          rules={[
            {
              required: false,
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
            onChange={() => {
              if (setStep) setStep();
            }}
            disabled={uf === '' ? true : false}
            style={{
              maxWidth: '50ch',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {suggestionsCidade.length > 0
              ? suggestionsCidade.map(cidade => (
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
                ))
              : setCidadeReaproveitamento()}
            <Select.Option
              key={''}
              value={''}
              style={{
                maxWidth: '50ch',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Nenhum
            </Select.Option>
          </Select>
        </Form.Item>
      </Grid>
    </>
  );
};

export default EstadoCidadeInputs;
