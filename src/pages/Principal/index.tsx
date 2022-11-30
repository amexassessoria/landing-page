import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LogoCLickDoBem from '@assets/Login/logo-topo.png';
import Button from '@components/Shared/Buttons/Button';
import MaskedInput from 'antd-mask-input';

import Footer from '@components/Shared/Footer/Footer';


import { Grid } from '@material-ui/core';
import { Form, Input, Spin, Radio, Select as SelectAntd } from 'antd';

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

const tiposFiltros = ['Boleto', 'Pix', 'Cartão de credito'];

const DATA = addDays(new Date(), 0).toISOString().split('T')[0];

const Principal: React.FC = () => {
  const history = useHistory();

  const [formref] = Form.useForm();
  const [formPessoaRef] = Form.useForm();

  const [formRef2] = Form.useForm();

  const [idExists, setIdExists] = useState(0);
  const [showButtonViewPessoa, setShowButtonViewPessoa] = useState(false);
  const [loadingCreatePessoa, setLoadingCreatePessoa] = useState(false);
  const [pessoaId, setPessoaId] = useState<number>();

  const [tipoDocumento, setTipoDocumento] = useState<'pf' | 'pj'>('pf');

  const [valorModifyValorDebito, setValorModifyValorDebito] =
  useState<string>('');

  const [uf, setUF] = useState<any>();
  const [cidadeId, setCidadeID] = useState(0);
  const [cidadeLabel, setCidadeLabel] = useState('');
  const [loadingCEP, setLoadingCEP] = useState(false);



  const [formaContribuicao, setFormaContribuicao] = useState< 'Boleto' | 'Pix' | 'Cartão de credito'>();

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

  const searchCEPDebounce = async (value: string) => {
    const searchCEPCorreios = new SearchCEPCorreios();

    setLoadingCEP(true);
    const { error, response } = await searchCEPCorreios.SearchCEP(value);
    setLoadingCEP(false);
    if (!error && response) {
      setUF(response.uf);
      formPessoaRef.setFieldsValue({
        endereco: response.logradouro,
        bairro: response.bairro,
        estado_descricao: response.uf,
        cidade_id: response.localidade,
      });
    }
  };
  const debounceCEP = useDebounce(searchCEPDebounce, 800);

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


  return (
    <>
     <Grid container alignItems="center" justify="center">
        <Grid container item sm={8} style={{marginTop: 35}}>
        <Grid item lg={1} sm={1} xs={12}>

          </Grid>
        <Grid item lg={3} sm={3} xs={12}>
        <img src={LogoCLickDoBem} style={{ width: 210 }} />
          </Grid>
          <Grid item lg={8} sm={8} xs={12} style={{marginTop: 40}}>
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
        style={{ marginTop: 30 }}
      >
        {/* FORMULARIO  */}
        <Grid item lg={ 8} sm={5} xs={12}>
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
                  lg={6}
                  xs={12}
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                >
                  <Form.Item
                    label="Documento *"

                    name="documento"
                    rules={[
                      { required: true, message: 'Campo obrigatório' },
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

                  <Grid item lg={6} xs={12}>
                    <Form.Item
                      label='Nome Completo *'

                      name="nome"
                      rules={[
                        { required: true, message: 'Campo obrigatório' },
                        { min: 3, message: 'Mínimo de 3 letras' },
                        {
                          pattern:  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                          message: 'Somente letras'
                        }
                      ]}
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                    >
                      <Input
                        onInput={handleInput}

                      />
                    </Form.Item>
                  </Grid>
                </InvisibleContent>

                <InvisibleContent
                  visible={tipoDocumento === 'pj'}
                >
                  <Grid item lg={6} xs={12}>

                    <Form.Item
                      label='Razão Social *'
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


                </InvisibleContent>
                <Grid container>

                <Grid item lg={6} xs={12}>

                      <Form.Item
                        label='E-mail *'
                        name="email"
                        rules={[
                          { required: true, message: 'Campo obrigatório' },
                          { min: 3, message: 'Mínimo de 3 letras' },

                        ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input


                        />
                      </Form.Item>
                      </Grid>

                      <Grid item lg={6} xs={12}>

                      <Form.Item
                        label='Telefone *'

                        name="telefone"
                        rules={[
                          { required: true, message: 'Campo obrigatório' },
                          { min: 3, message: 'Mínimo de 3 letras' },

                        ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input

                        />
                      </Form.Item>
                      </Grid>

                </Grid>
        {/* ------------------------ PAGAMENTO -------------------------------------------------- */}
                <p style={{marginTop: 15}}>Digite o valor da doação *</p>
                <Grid container justify="center" >
                <Grid item  lg={6} sm={6} xs={12}>
                  <Form.Item
                    name="valor"
                    rules={[
                      { required: true, message: 'Campo obrigatório' },
                    ]}
                  >
                  <Input

                        placeholder='Valor doação'
                      />
                  </Form.Item>
                </Grid>
                </Grid>

                <p style={{marginTop: 15}}> Selecione a forma de pagamento *</p>
                <Grid container justify="center" >
                <Grid item  lg={6} sm={6} xs={12}>
                  <Form.Item
                    name="formaContrib"
                    rules={[
                      { required: true, message: 'Campo obrigatório' },
                    ]}
                  >
                 <SelectAntd
                        placeholder="Forma de contribuição."
                        onChange={(e: any) => {
                          if (e === 'Boleto' || e === 'Pix' || e === 'Cartão de credito') {
                            setFormaContribuicao(e);
                          }
                        }}
                      >
                        {tiposFiltros.map(option => (
                          <SelectAntd.Option key={option} value={option}>
                          {option}
                          </SelectAntd.Option>
                        ))}
                      </SelectAntd>
                  </Form.Item>
                </Grid>

                {/* ------------------------ ENDEREÇO -------------------------------------------------- */}

                <InvisibleContent
                    visible={formaContribuicao === 'Cartão de credito'}
                  >
                    <>

                    <Grid container>
                      <p style={{marginTop: 15}}>Completar informações</p>
                    </Grid>

                      <Spin spinning={loadingCEP} tip="Buscando dados do CEP">
                        <Grid container>
                          <Grid container>
                          {/* { cep, uf, cidade } */}
                              <Grid item lg={4} xs={12}>
                                <Form.Item label="CEP"  name="cep">
                                  <MaskedInput
                                    mask="11111-111"
                                    placeholder="CEP"
                                    onChange={(e: any) => debounceCEP(e.target.value)}
                                  />
                                </Form.Item>
                              </Grid>
                            </Grid>

                          <InputEstadoCidade
                            ufProps={uf}
                           // cidadeID={cidadeId}
                            cidadeLabel={cidadeLabel}
                            formRef={formRef2}
                          />
                          {/* { cep, uf, cidade } */}

                          {/* { endereço, numero } */}

                          <Grid item lg={4} xs={12}>
                            <Form.Item
                              label="Endereço"
                              name="endereco"
                              rules={[{ required: false }]}
                            >
                              <Input placeholder="Endereço" />
                            </Form.Item>
                          </Grid>
                          {/* { endereço, numero } */}

                           {/* { complemento, bairro } */}

                          <Grid item sm={3} xs={12}>
                            <Form.Item
                              label="Complemento"
                              name="numero"
                                rules={
                                  [

                                    { max: 45, message: 'Máximo de 45 caracteres' },
                                  ]
                                }
                            >
                              <Input onInput={handleInput} placeholder="Complemento" />
                            </Form.Item>
                          </Grid>

                          <Grid item sm={3} xs={12}>
                            <Form.Item
                              label="Bairro"
                              name="bairro"
                              rules={[{ required: false }]}
                            >
                            <Input placeholder="Bairro" />
                          </Form.Item>
                        </Grid>
                      </Grid>
                     </Spin>
                    </>
                  </InvisibleContent>

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

                <Grid container justify="center" >
                <Grid
                  item
                  lg={6}
                  sm={6}
                  xs={6}
                  style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 25}}
                >
                  <ButtonComponent
                    color="primary"
                    disabled={!pessoaId ? loadingCreatePessoa : true}
                    loading={loadingCreatePessoa}
                    fullWidth
                    type="submit"
                  >
                     Realizar doação
                  </ButtonComponent>
                </Grid>
              </Grid>
              </Grid>
            </Form>

        </Grid>
        {/* FORMULARIO  */}
        <Footer />
        {/* Component Perfil */}

        {/* Component Perfil */}
      </Grid>
    </>
  );
};

export default Principal;
