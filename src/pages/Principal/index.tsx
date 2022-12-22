import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LogoCLickDoBem from '@assets/Login/logo-topo.png';
import Button from '@components/Shared/Buttons/Button';
import MaskedInput from 'antd-mask-input';

import Footer from '@components/Shared/Footer/Footer';


import { Grid } from '@material-ui/core';
import { Form, Input, Spin, Radio, Select as SelectAntd, Switch, Checkbox } from 'antd';

import ButtonComponent from '@components/Shared/Buttons/Button';

import { TitlePage } from '@styles/styles.global';
import InvisibleContent from '@components/Shared/InvisibleContent';

import { Empty } from 'antd';
import '@styles/AntStyles.css';

import Service, {
  IRequestCreatePessoa,
} from './services';
import { MaskCPFeCNPJ } from '@utils/Masks';
import { validaCPFandCNPJ } from '@utils/Validators';
import { AddOutlined, Visibility } from '@material-ui/icons';
import { format, addDays, subDays, isThisQuarter } from 'date-fns';
import SearchCEPCorreios from '@utils/SearchCEPCorreios';
import { isReal, ClearString } from '@utils/Masks';


import useDebounce from '@hooks/useDebounce';
import { create } from 'domain';
import { number } from 'yup';



const Principal: React.FC = () => {

  const [formPessoaRef] = Form.useForm();
  const [formRef] = Form.useForm();
  const [stringDebitoStatus, setStringDebitoStatus] = useState<string>('');


  const [loadingCreatePessoa, setLoadingCreatePessoa] = useState(false);

  const [tipoDocumento, setTipoDocumento] = useState<'pf' | 'pj'>('pf');

  const [valorModifyValorDebito, setValorModifyValorDebito] =
  useState<string>('');

  const [loadingCEP, setLoadingCEP] = useState(false);
  const [uf, setUF] = useState<any>();

  const [formValues, setFormValues] = useState({});



  function handleInput(e: any) {
    var ss = e.target.selectionStart;
    var se = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.selectionStart = ss;
    e.target.selectionEnd = se;
  };

  const handleInputChange = (e: any) => {
  const {name, type, value, checked} = e.target;
  const isCheckbox = type === 'checkbox';

  setFormValues ({...formValues, [name]: checked});
  };

   async function onSubmit(values: any) {
    setLoadingCreatePessoa(true);

    console.log(values);


    const services = new Service();
    const createPessoa: IRequestCreatePessoa = {
      pessoa: {
        nome: values.nome,
        cpfcnpj: values.cpfcnpj,
        email: values.email,
        telefone: values.telefone,
      },
      doacao: {
       valor: ClearString(valorModifyValorDebito) / 100 * 100,

        cartao: values.cartao === undefined
          ?false
          :true,
        boleto: values.boleto === undefined
        ?false
        :true,
        pix: values.pix  === undefined
        ?false
        :true,
        recorrente: values.recorrente  === undefined
          ?false
          :true,
      },
      endereco: {
        descricao: values.descricao,
        numero: values.numero,
        complemento: values.complemento,
        bairro: values.bairro,
        cidade: values.cidade,
        cep: values.cep,
        uf: values.uf,
      },
      entidade: {
        nome: 'esdras'
      },
      campanha:{
        descricao: 'teste',
      }
    };

    console.log('entrou aqui')

    const { error, response } = await services.CreatePessoa(createPessoa);

    if (!error) {

      //window.alert(response);
      window.open(response);

    } else {
      window.alert( "HOUVE UM ERRO");

    }

    setLoadingCreatePessoa(false);

   window.location.reload();

  }

  const searchCEPDebounce = async (value: string) => {
    const searchCEPCorreios = new SearchCEPCorreios();

    setLoadingCEP(true);
    const { error, response } = await searchCEPCorreios.SearchCEP(value);
    setLoadingCEP(false);
    if (!error && response) {
      setUF(response.uf);
      formPessoaRef.setFieldsValue({
        descricao: response.logradouro,
        bairro: response.bairro,
        uf: response.uf,
        cidade: response.localidade,
      });
    }
  };
  const debounceCEP = useDebounce(searchCEPDebounce, 800);

  const onChangeDocumento = (e: any) => {
    const value = e.target.value;

    const { typeDocument, valueModify } = MaskCPFeCNPJ(value);

    setTipoDocumento(typeDocument);

    formPessoaRef.setFieldsValue({
      cpfcnpj: valueModify,
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
        <Grid container item sm={8} style={{marginTop: 35}} justify="center" >
        <Grid item lg={1} sm={1} xs={12}>

          </Grid>
        <Grid item lg={3} sm={5} xs={12}>
        <img src={LogoCLickDoBem} style={{ width: 210 }} />
          </Grid>
          <Grid item lg={8} sm={8} xs={12} style={{marginTop: 40}} justify="center" >
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
              onFinish={onSubmit}
              labelAlign="left"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              requiredMark={false}
              initialValues={{
                nome: '',
                cpfcnpj: '',
                email: '',
               //valor: 0,
                descricao: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                cep: '',
                uf: '',
              }}
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

                    name="cpfcnpj"
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
                      //placeholder="Documento"
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
                          {  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                            message: 'Por favor digite um e-mail válido!' },

                        ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input


                        />
                      </Form.Item>
                      </Grid>

                      <Grid item lg={6} xs={12}>

                      <Form.Item
                        label='Celular *'

                        name="telefone"
                        rules={[
                          { required: true, message: 'Campo obrigatório' },

                        ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <MaskedInput
                        mask="(11) 11111-1111"
                        //placeholder="Celular"
                      />
                      </Form.Item>
                      </Grid>

                </Grid>


                {/* ------------------------ DOAÇÃO -------------------------------------------------- */}


                <Grid item container justify="space-around" sm={12} xs={12} style={{marginTop: 15}}>

                      <Form.Item
                        name="recorrente"
                      >
                        <label><Input type="checkbox" value="recorrente"
                        /> Doação mensal</label>

                      </Form.Item>

                </Grid>

        {/* ------------------------ PAGAMENTO -------------------------------------------------- */}
                <p style={{marginTop: 15}}>Digite o valor da doação *</p>
                <Grid container justify="center" >
                <Grid item  lg={6} sm={6} xs={12}>
                  <Form.Item
                    name="valor"
                    rules={[
                      { required: true, message: 'Campo obrigatório' },
                      {  pattern: /^[0-9]+$/,
                      message: 'Por favor digite somente números!' },


                    ]}
                  >

                      <Input

                      type={"text"}
                      placeholder='Valor da doação'
                      onChange={(e: any) => {
                        formRef.setFieldsValue({
                          valor: isReal(e.target.value),
                        });
                        setValorModifyValorDebito(e.target.value);
                      }}
                      />

                  </Form.Item>
                </Grid>
                </Grid>

                <p style={{marginTop: 15}}> Selecione a forma de pagamento *</p>
                <Grid container justify="center" >
                  <Grid container justify="center" >
                  <Grid item  lg={3} sm={3} xs={12}>
                      <Form.Item
                        name="boleto"
                      >
                        <label><Input type="checkbox" value="boleto" onChange={handleInputChange}/> Boleto</label>

                      </Form.Item>
                    </Grid>

                    <Grid item  lg={3} sm={3} xs={12}>
                      <Form.Item
                        name="pix"
                      >
                        <label><Input type="checkbox" value="pix"  onChange={handleInputChange}/> Pix</label>

                      </Form.Item>
                    </Grid>

                     <Grid item  lg={3} sm={3} xs={12}>
                      <Form.Item
                        name="cartao"
                      >
                        <label><Input type="checkbox" value="cartao"  onChange={handleInputChange}/> Cartão de crédito</label>

                      </Form.Item>
                    </Grid>

                  </Grid>

                {/* ------------------------ ENDEREÇO -------------------------------------------------- */}

                  {/*
                    <InvisibleContent
                      visible={formaContribuicao === 'Cartão de credito'}
                    >
                      <>
                      */}

                      <Grid container>
                        <p style={{marginTop: 15}}>Completar informações</p>
                      </Grid>

                        <Spin spinning={loadingCEP} tip="Buscando dados do CEP">
                          <Grid container>
                            <Grid container>
                            {/* { cep, uf, cidade } */}
                                <Grid item lg={4} xs={12}>
                                  <Form.Item
                                    label="CEP"
                                    name="cep"
                                    rules={[
                                      { required: true, message: 'Campo obrigatório' }
                                    ]}
                                  >
                                    <MaskedInput
                                      mask="11111-111"
                                      placeholder="CEP"
                                      onChange={(e: any) => debounceCEP(e.target.value)}
                                    />
                                  </Form.Item>
                                </Grid>
                              </Grid>

                              <Grid item lg={4} xs={12}>
                              <Form.Item
                                label="Estado"
                                name="uf"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                              >
                                <Input placeholder="Estado" />
                              </Form.Item>
                            </Grid>

                            <Grid item lg={4} xs={12}>
                              <Form.Item
                                label="Cidade"
                                name="cidade"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                              >
                                <Input placeholder="Cidade" />
                              </Form.Item>
                            </Grid>

                            {/* { cep, uf, cidade } */}

                            {/* { endereço, numero } */}

                            <Grid item lg={4} xs={12}>
                              <Form.Item
                                label="Endereço"
                                name="descricao"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                              >
                                <Input placeholder="Endereço" />
                              </Form.Item>
                            </Grid>
                            {/* { endereço, numero } */}

                            {/* { complemento, bairro } */}

                            <Grid item sm={4} xs={12}>
                              <Form.Item
                                label="Número"
                                name="numero"
                                rules={
                                  [
                                    {required: true,  message: "Campo obrigatório"}
                                  ]
                                }
                              >
                                <Input type={"number"} placeholder="Número" />
                              </Form.Item>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                              <Form.Item
                                label="Complemento"
                                name="complemento"
                                  rules={
                                    [
                                      { max: 45, message: 'Máximo de 45 caracteres' },
                                    ]
                                  }
                              >
                                <Input onInput={handleInput} placeholder="Complemento" />
                              </Form.Item>
                            </Grid>

                            <Grid item sm={4} xs={12}>
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
                    {/*   </>
                    </InvisibleContent>*/}

                 {/* ------------------------ DADOS OCULTOS -------------------------------------------------- */}


                    <InvisibleContent
                      visible={stringDebitoStatus === 'Cartão de credito'}
                    >
                      <>
                          <Grid container>

                            <Grid item sm={3} xs={12}>
                              <Form.Item
                                label="Campanha"
                                name="campanha"

                              >
                                <Input value={"campanha"} />
                              </Form.Item>
                            </Grid>

                            <Grid item sm={3} xs={12}>
                              <Form.Item
                                label="Entidade"
                                name="entidade"
                                rules={[{ required: false }]}
                              >
                              <Input value={"entidade"} />
                            </Form.Item>
                          </Grid>
                        </Grid>

                    </>
                    </InvisibleContent>

                </Grid>

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

      </Grid>
    </>
  );
};

export default Principal;
