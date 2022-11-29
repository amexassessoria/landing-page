import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LogoCLickDoBem from '@assets/Login/logo-topo.png';

import { Grid } from '@material-ui/core';
import { Form, Input, Spin, Radio } from 'antd';

import ButtonComponent from '@components/Shared/Buttons/Button';

import { TitlePage } from '@styles/styles.global';
import InvisibleContent from '@components/Shared/InvisibleContent';

import { Empty } from 'antd';
import '@styles/AntStyles.css';

import Services from './services';
import { MaskCPFeCNPJ } from '@utils/Masks';
import { validaCPFandCNPJ } from '@utils/Validators';
import { AddOutlined, Visibility } from '@material-ui/icons';
import { format, addDays, subDays } from 'date-fns';
import SearchCEPCorreios from '@utils/SearchCEPCorreios';
import InputEstadoCidade from '@components/Shared/EstadoCidadeInputs';

import useDebounce from '@hooks/useDebounce';


const DATA = addDays(new Date(), 0).toISOString().split('T')[0];

const Principal: React.FC = () => {
  const history = useHistory();

  const [formref] = Form.useForm();
  const [formPessoaRef] = Form.useForm();

  const [idExists, setIdExists] = useState(0);
  const [showButtonViewPessoa, setShowButtonViewPessoa] = useState(false);
  const [loadingCreatePessoa, setLoadingCreatePessoa] = useState(false);
  const [pessoaId, setPessoaId] = useState<number>();

  const [tipoDocumento, setTipoDocumento] = useState<'pf' | 'pj'>('pf');

  function handleInput(e: any) {
    var ss = e.target.selectionStart;
    var se = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.selectionStart = ss;
    e.target.selectionEnd = se;
  };




  const onFinish = async (values: any) => {


    setLoadingCreatePessoa(true);
    const services = new Services();

    values.tipoDocumento = tipoDocumento;
    values.status_ativo = 1;

    const { error, response } = await services.CreatePessoa(values);

    if (!error && response !== null) {
      setPessoaId(response.id);
      formref.setFieldsValue({
        id: response.id,
      });


    } else {

    }

    setLoadingCreatePessoa(false);
  };

  const onChangeDocumento = (e: any) => {
    const value = e.target.value;

    const { typeDocument, valueModify } = MaskCPFeCNPJ(value);

    setTipoDocumento(typeDocument);

    formPessoaRef.setFieldsValue({
      documento: valueModify,
    });

    if (typeDocument === 'pj') {
      formPessoaRef.setFieldsValue({
        sexo: 1,
      });
    }
  };

  const validaDocumento = (_: any, val: any) => {
    const documentoExiste = validaCPFandCNPJ(val);

    if (documentoExiste) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Digite um documento válido'));
  };

  window.document.title = 'CRM - Novo Cadastro';

  return (
    <>
     <Grid container alignItems="center" justify="flex-start">
        <Grid container item sm={8}>
        <Grid item lg={3} sm={3} xs={12}>
        <img src={LogoCLickDoBem} style={{ width: 250 }} />
          </Grid>
          <Grid item lg={8} sm={8} xs={12}>
            <TitlePage>Através da sua doação, levaremos alegria, amor e esperança para todos animaizinhos.</TitlePage>
          </Grid>

        </Grid>
      </Grid>

      <Grid
        container
        item
        sm={12}
        justify="space-around"
        xs={12}
        style={{ marginTop: 20 }}
      >
        {/* FORMULARIO  */}
        <Grid item sm={5} xs={12}>
          <Spin
            size="large"
            spinning={loadingCreatePessoa}
            tip="Enviando dados..."
          >
            <Form
              form={formPessoaRef}
              size="middle"
              layout="vertical"
              scrollToFirstError={true}
              onFinish={onFinish}
              labelAlign="left"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              requiredMark={false}
            >
              <Grid container>
                <Grid
                  item
                  lg={12}
                  xs={12}
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                >
                  <Form.Item
                    label="Documento"
                    hasFeedback
                    name="documento"
                    rules={[
                      { required: true, message: 'Campo obrigatorio' },
                      { min: 14, message: 'Minimo 14 caracteres' },
                      { validator: (e, a) => validaDocumento(e, a) },
                    ]}
                  >
                    <Input
                      maxLength={18}
                      onChange={(e: any) => {
                        onChangeDocumento(e);

                      }}
                      placeholder="Documento"
                    />
                  </Form.Item>

                </Grid>

                <InvisibleContent
                  visible={tipoDocumento === 'pf'}
                >

                  <Grid item lg={12} xs={12}>
                    <Form.Item
                      label='Nome Completo'
                      hasFeedback
                      name="nome"
                      rules={[
                        { required: true, message: 'Campo obrigatorio' },
                        { min: 3, message: 'Minimo de 3 letras' },
                        {
                          pattern:  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                          message: 'Somente letras'
                        }
                      ]}
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                    >
                      <Input
                        onInput={handleInput}
                        placeholder='Nome Completo'
                      />
                    </Form.Item>
                  </Grid>

                  <Grid container>
                    <Grid item lg={6} xs={12}>
                      <Form.Item
                        label= 'Nome Social'
                        hasFeedback
                        name="nome_fantasia"
                        rules={[
                          { required: true, message: 'Campo obrigatorio' },
                          { min: 3, message: 'Minimo de 3 letras' },
                          {
                            pattern:  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                            message: 'Somente letras'
                          }
                        ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input
                          onInput={handleInput}
                          placeholder= 'Nome Social'
                        />
                      </Form.Item>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Form.Item
                        name="data_nascimento"
                        label='Data de Nascimento'
                        hasFeedback
                        //rules={[
                          //{
                            //required: true,
                          // message: 'campo obrigatorio',
                        // },
                        //]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input
                          type="date"
                          placeholder= 'Data de Nascimento'
                          max={DATA}
                        />
                      </Form.Item>
                    </Grid>
                  </Grid>
                </InvisibleContent>

                <InvisibleContent
                  visible={tipoDocumento === 'pj'}
                >
                  <Grid item lg={12} xs={12}>

                    <Form.Item
                      label='Razão Social'
                      hasFeedback
                      name="nome"
                      rules={[
                        { required: true, message: 'Campo obrigatorio' },
                        { min: 3, message: 'Minimo de 3 letras' },

                      ]}
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                    >
                      <Input
                        onInput={handleInput}
                        placeholder='Razão Social'
                      />
                    </Form.Item>
                  </Grid>

                  <Grid container>
                    <Grid item lg={6} xs={12}>
                      <Form.Item
                        label= 'Nome Fantasia'
                        hasFeedback
                        name="nome_fantasia"
                        rules={[
                          { required: true, message: 'Campo obrigatorio' },
                          { min: 3, message: 'Minimo de 3 letras' },
                        ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input
                          onInput={handleInput}
                          placeholder= 'Nome Fantasia'
                        />
                      </Form.Item>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Form.Item
                        name="data_nascimento"
                        label='Data de Fundação'
                        hasFeedback
                        //rules={[
                          //{
                            //required: true,
                          // message: 'campo obrigatorio',
                        // },
                        //]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input
                          type="date"
                          placeholder= 'Data de Fundação'
                          max={DATA}
                        />
                      </Form.Item>
                    </Grid>
                  </Grid>
                </InvisibleContent>

                <Grid item container justify="space-around" sm={12} xs={12}>
                  <Form.Item name="sexo">
                    <Radio.Group disabled={tipoDocumento === 'pj'}>
                      <Radio value={1}>Feminino</Radio>
                      <Radio value={0}>Masculino</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Grid>

                <Grid
                  item
                  lg={12}
                  xs={12}
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                >
                  <Form.Item
                    label="CPF/CNPJ do Indicador"
                    hasFeedback
                    name="documento_indicador"
                    rules={[{ required: false, message: 'Campo obrigatorio' }]}
                  >
                    <Input
                      maxLength={18}
                      onChange={e => {
                        const { valueModify } = MaskCPFeCNPJ(e.target.value);

                        formPessoaRef.setFieldsValue({
                          documento_indicador: valueModify,
                        });
                      }}
                      placeholder="CPF/CNPJ do Indicador"
                    />
                  </Form.Item>
                </Grid>

                {/* <Grid
                  item
                  lg={12}
                  xs={12}
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                >
                  <Form.Item
                    label="Origem inicial"
                    hasFeedback
                    name="origem_inicial"
                    rules={[
                      { required: true, message: 'Campo obrigatorio' },
                      { min: 3, message: 'Minimo de 3 letras' },
                    ]}
                  >
                    <Input placeholder="Origem inicial" />
                  </Form.Item>
                </Grid>

                <Grid
                  item
                  lg={12}
                  xs={12}
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                >
                  <Form.Item
                    label="Motivo inicial"
                    hasFeedback
                    name="motivo_inicial"
                    rules={[
                      { required: true, message: 'Campo obrigatorio' },
                      { min: 3, message: 'Minimo de 3 letras' },
                    ]}
                  >
                    <Input placeholder="Motivo inicial" />
                  </Form.Item>
                </Grid> */}

                <Grid
                  item
                  sm={12}
                  xs={12}
                  style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}
                >
                  <ButtonComponent
                    color="primary"
                    disabled={!pessoaId ? loadingCreatePessoa : true}
                    loading={loadingCreatePessoa}
                    fullWidth
                    type="submit"
                  >
                    <AddOutlined style={{ marginRight: 10 }} /> Cadastrar pessoa
                  </ButtonComponent>
                </Grid>
              </Grid>
            </Form>
          </Spin>
        </Grid>
        {/* FORMULARIO  */}

        {/* Component Perfil */}

        {/* Component Perfil */}
      </Grid>
    </>
  );
};

export default Principal;
