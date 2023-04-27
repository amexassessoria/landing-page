import React, { useState } from 'react';
import MaskedInput from 'antd-mask-input';

import Footer from '@components/Shared/Footer/Footer';
import Footer2 from '@components/Shared/Fotter2/Footer2';

import { NavigateNextOutlined } from '@mui/icons-material/';

import { Grid } from '@material-ui/core';
import { Form, Input, Spin, Radio, Select as SelectAntd, Switch, Checkbox } from 'antd';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import ButtonComponent from '@components/Shared/Buttons/Button';

import { TitlePage } from '@styles/styles.global';
import InvisibleContent from '@components/Shared/InvisibleContent';

import '@styles/AntStyles.css';
import { addDays } from 'date-fns';

import Chip from '@assets/Login/chip.png'
import Logo from '@assets/Login/logo_esdras_andrade-1.png'


import Service, {
  IRequestCreatePessoa, IRequestCreatePessoaCredito
} from './services';
import { MaskCPFeCNPJ } from '@utils/Masks';
import { validaCPFandCNPJ } from '@utils/Validators';
import SearchCEPCorreios from '@utils/SearchCEPCorreios';
import { isReal, ClearString } from '@utils/Masks';


import useDebounce from '@hooks/useDebounce';

const DATA = addDays(new Date(), 0).toISOString().split('T')[0];

const Principal: React.FC = () => {

  const [formPessoaRef] = Form.useForm();
  const [formRef] = Form.useForm();

  const [loadingCreatePessoaCredito, setLoadingCreatePessoaCredito] = useState(false);
  const [loadingCreatePessoaPix, setLoadingCreatePessoaPix] = useState(false);
  const [loadingCreatePessoaBoleto, setLoadingCreatePessoaBoleto] = useState(false);
  const [loadingCreatePessoaTeste, setLoadingCreatePessoaTeste] = useState(false);


  const [loading, setLoading] = useState(false);
  const [valorDoacao, setValorDoacao] = useState(false);

  const [formaContribPix, setFormaContribPix] = useState(false);
  const [formaContribCredito, setFormaContribCredito] = useState(false);
  const [formaContribBoleto, setFormaContribBoleto] = useState(false);
  const [formaContribDebito, setFormaContribDebito] = useState(false);
  const [formaContribEnergia, setFormaContribEnergia] = useState(false);

  const [fraseDoacao0, setFraseDoacao0] = useState(false);
  const [fraseDoacao1, setFraseDoacao1] = useState(false);
  const [fraseDoacao2, setFraseDoacao2] = useState(false);
  const [fraseDoacao3, setFraseDoacao3] = useState(false);
  const [fraseDoacao4, setFraseDoacao4] = useState(false);


  const [fraseDoacao5, setFraseDoacao5] = useState(false);
  const [fraseDoacao6, setFraseDoacao6] = useState(false);
  const [fraseDoacao7, setFraseDoacao7] = useState(false);
  const [fraseDoacao8, setFraseDoacao8] = useState(false);
  const [fraseDoacao9, setFraseDoacao9] = useState(false);

  const [confirmacao, setConfirmacao] = useState(false);


  const [tipoDocumento, setTipoDocumento] = useState<'pf' | 'pj'>('pf');

  const [valorModifyValorDebito, setValorModifyValorDebito] =
  useState<number>(0);


  const [stateConfirme, setStateConfirme] = useState({
    number: '',

  });
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [uf, setUF] = useState<any>();
  const [checked, setChecked] = useState(false);



  function handleInput(e: any) {
    var ss = e.target.selectionStart;
    var se = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.selectionStart = ss;
    e.target.selectionEnd = se;
  };

  const createArrayRange = (
    start: number,
    increment: number,
    length: number,
  ) => {
    let array = [];

    for (let i = start; i <= length; i += increment) {
      array.push(i);
    }

    return array;
  };

  async function onSubmitTeste(values: any) {

    setLoadingCreatePessoaTeste(true);
    setLoading(true);
    console.log(values);

    const services = new Service();
    const createPessoaCredito: IRequestCreatePessoaCredito = {
      pessoa: {
        nome: values.nome,
        cpfcnpj: values.cpfcnpj,
        email: values.email,
        telefone: values.telefone,
        data_nascimento: values.data_nascimento,
      },
      doacao: {
        valor: (valorModifyValorDebito) / 100 * 100,

        cartao: values.cartao === undefined
        ?false
        :true,
        boleto: values.boleto === false,
        pix: values.pix  === false,
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
      },
      cartao: {
        number: values.number,
        verification_value: values.verification_value,
        first_name: values.first_name,
        last_name: values.last_name,
        month: values.month,
        year: values.year,
      }
    };

    console.log('entrou aqui')


    setLoadingCreatePessoaTeste(false);

    //window.location.reload();

    console.log('efjdlkf0', loadingCreatePessoaTeste);
  }

  async function onSubmitCredito(values: any) {

    setLoadingCreatePessoaCredito(true);
    setLoading(true);
    console.log(values);

    const services = new Service();
    const createPessoaCredito: IRequestCreatePessoaCredito = {
      pessoa: {
        nome: values.nome,
        cpfcnpj: values.cpfcnpj,
        email: values.email,
        telefone: values.telefone,
        data_nascimento: values.data_nascimento,
      },
      doacao: {
        valor: (valorModifyValorDebito) / 100 * 100,

        cartao: values.cartao === undefined
        ?false
        :true,
        boleto: values.boleto === false,
        pix: values.pix  === false,
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
      },
      cartao: {
        number: values.number,
        verification_value: values.verification_value,
        first_name: values.first_name,
        last_name: values.last_name,
        month: values.month,
        year: values.year,
      }
    };

    console.log('entrou aqui')

    const { error, response } = await services.CreatePessoaCredito(createPessoaCredito);

    if (!error) {
      window.alert("Cadastrado com sucesso! O Instituto Esdras Andrade agradece sua doação!!");

    } else {
      window.alert( "Erro - Sem contato com a base de dados. Por favor tente novamente ou entre em contato com a central de relacionamento!");

    }

    setLoadingCreatePessoaCredito(false);

    //window.location.reload();
  }

  const onChange = (e: CheckboxChangeEvent) => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked);

  };

  async function onSubmitPix(values: any) {

    setLoadingCreatePessoaPix(true);
    setLoading(true);
    console.log(values);

    const services = new Service();
    const createPessoaPix: IRequestCreatePessoa = {
      pessoa: {
        nome: values.nome,
        cpfcnpj: values.cpfcnpj,
        email: values.email,
        telefone: values.telefone,
        data_nascimento: values.data_nascimento,
      },
      doacao: {
        valor: (valorModifyValorDebito) / 100 * 100,

        cartao: values.cartao === false,
        boleto: values.boleto === false,
        pix: values.pix === undefined
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

    const { error, response } = await services.CreatePessoa(createPessoaPix);

    if (!error) {
      window.open(response);

    } else {
      window.alert( "Erro - Sem contato com a base de dados. Por favor tente novamente ou entre em contato com a central de relacionamento!");

    }

    setLoadingCreatePessoaPix(false);

    //window.location.reload();
  }


  async function onSubmitBoleto(values: any){

    setLoadingCreatePessoaBoleto(true);
    setLoading(true);
    console.log(values);

    const services = new Service();
    const createPessoaBoleto: IRequestCreatePessoa = {
      pessoa: {
        nome: values.nome,
        cpfcnpj: values.cpfcnpj,
        email: values.email,
        telefone: values.telefone,
        data_nascimento: values.data_nascimento,
      },
      doacao: {
        valor: (valorModifyValorDebito) / 100 * 100,

        cartao: values.cartao === false,
        boleto: values.boleto === undefined
        ?false
        :true,
        pix: values.pix === false,
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

    const { error, response } = await services.CreatePessoa(createPessoaBoleto);

    if (!error) {
      window.open(response);

    } else {
      window.alert( "Erro - Sem contato com a base de dados. Por favor tente novamente ou entre em contato com a central de relacionamento!");

    }

    setLoadingCreatePessoaBoleto(false);

    //window.location.reload();
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
         <Grid container item lg={12} sm={8} xs={12} style={{marginTop: 35, marginRight: 35}} justify="center" >

          <Grid item lg={2} sm={1} xs={12}> </Grid>

          <Grid item lg={2} sm={6} xs={12} justify="center">
            <img src={Logo} style={{width: 130, height: 123 }} />
          </Grid>

          <Grid item lg={6} sm={12} xs={12} style={{paddingLeft: 5, paddingTop: 5}} justify="center" >
            <TitlePage style={{fontSize: 27}}> Através da sua doação, levaremos alegria, amor e esperança para todos animaizinhos.
            </TitlePage>
          </Grid>

        </Grid>
      </Grid>

      <Grid
        container
        item
        lg={12}
        sm={12}
        justify="space-around"
        xs={12}
        style={{ marginTop: 25 }}
      >
        {/* FORMULARIO  */}
        <Grid item lg={8} sm={9} xs={12}>
            <Form
              form={formPessoaRef}
              size="middle"
              layout="vertical"
              scrollToFirstError={true}
              //onFinish={onSubmitCredito}
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
                descricao: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                cep: '',
                uf: '',
              }}
            >
                <Grid container justify="center" >
                    <InvisibleContent
                      visible={tipoDocumento === 'pf'}
                    >
                      <Grid item lg={12} sm={12} xs={12}>
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
                            onChange={() => setFraseDoacao0(true)} onInput={handleInput}

                          />
                        </Form.Item>
                      </Grid>
                    </InvisibleContent>

                    <InvisibleContent
                      visible={tipoDocumento === 'pj'}
                    >
                      <Grid item lg={12} sm={12} xs={12}>
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
                            onChange={() => setFraseDoacao0(true)} onInput={handleInput}
                          />
                        </Form.Item>
                      </Grid>
                    </InvisibleContent>
                  </Grid>

                  <Grid container>
                    <Grid item lg={6} sm={6}  xs={12} style={{ paddingRight: 10, paddingLeft: 10 }}>
                      <Form.Item
                        label="CPF/CNPJ *"
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
                            setFraseDoacao1(true);
                          }}
                          //placeholder="Documento"

                        />
                      </Form.Item>
                    </Grid>

                    <InvisibleContent
                      visible={tipoDocumento === 'pf'}
                    >
                      <Grid item lg={6} sm={6} xs={12}>
                        <Form.Item
                          label='Data de nascimento *'

                          name="data_nascimento"
                          rules={[
                            { required: true, message: 'Campo obrigatório' },
                          ]}
                          style={{ paddingLeft: 10, paddingRight: 10 }}
                        >
                          <Input
                            type="date"
                            max={DATA}
                            onChange={() => setFraseDoacao2(true)}

                          />
                        </Form.Item>
                      </Grid>
                    </InvisibleContent>

                    <InvisibleContent
                      visible={tipoDocumento === 'pj'}
                    >
                      <Grid item lg={6} sm={6} xs={12}>
                        <Form.Item
                          label='Data de fundação*'
                          name="data_nascimento"
                          rules={[
                            { required: true, message: 'Campo obrigatorio' },

                          ]}
                          style={{ paddingLeft: 10, paddingRight: 10 }}
                        >
                          <Input
                            type="date"
                            max={DATA}
                            onChange={() => setFraseDoacao2(true)}
                          />
                        </Form.Item>
                      </Grid>
                    </InvisibleContent>
                  </Grid>
                  <Grid container>
                    <Grid item lg={6} sm={6} xs={12}>
                      <Form.Item
                        label='E-mail *'
                        name="email"
                        rules={[
                          { required: true, message: 'Campo obrigatório' },
                          { pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                            message: 'Por favor digite um e-mail válido!' },
                          ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Input  onChange={() => setFraseDoacao3(true)}/>
                        </Form.Item>
                    </Grid>

                    <Grid item lg={6} sm={6} xs={12}>
                      <Form.Item
                        label='Celular *'
                        name="telefone"
                        rules={[
                          { required: true, message: 'Campo obrigatório' },

                        ]}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <MaskedInput
                        onChange={() => setFraseDoacao4(true)}
                          mask="(11) 11111-1111"
                          //placeholder="Celular"
                        />
                      </Form.Item>
                    </Grid>
                  </Grid>


                  {/* ------------------------ DOAÇÃO -------------------------------------------------- */}
                  <strong><p style={{paddingTop: 25, fontSize: 17}}> Selecione o valor da doação *</p></strong>
                  <Form.Item name="valorDoacao" rules={[
                               { required: true, message: 'Campo obrigatório' },
                              ]} >
                  <Grid item lg={12} sm={12} xs={12} container justify="center" style={{paddingTop: 5, paddingLeft: 15}}>
                    <Form.Item name="valor" >

                      <Radio.Group>
                        <Grid container justify="center" style={{paddingLeft: 30}} >
                          <Grid justify="center" lg={3} sm={6} xs={12} style={{paddingRight: 150, paddingTop: 5}}>
                          <Radio value={10} onClick={(e: any) => setValorDoacao(e)} onChange={(e: any) => {setValorModifyValorDebito(e.target.value);  setFraseDoacao5(true)}} >
                            <strong> <p style={{fontSize: 25, color: '#142741'}}> R$ 10 </p></strong></Radio>
                          </Grid>

                          <Grid justify="center" lg={3} sm={6} xs={12} style={{paddingRight: 150, paddingTop: 5}}>
                          <Radio value={30} onClick={(e: any) => setValorDoacao(e)} onChange={(e: any) => {setValorModifyValorDebito(e.target.value);  setFraseDoacao6(true)}} >
                            <strong> <p style={{fontSize: 25, color: '#142741'}}> R$ 30 </p></strong></Radio>
                          </Grid>

                          <Grid justify="center" lg={3} sm={6} xs={12} style={{paddingRight: 150, paddingTop: 5}}>
                          <Radio value={60} onClick={(e: any) => setValorDoacao(e)} onChange={(e: any) => {setValorModifyValorDebito(e.target.value);  setFraseDoacao7(true)}} >
                            <strong> <p style={{fontSize: 25, color: '#142741'}}> R$ 60 </p></strong></Radio>
                          </Grid>

                          <Grid justify="center" lg={3} sm={6} xs={12} style={{paddingRight: 150, paddingTop: 5}}>
                          <Radio value={90}  onClick={(e: any) => setValorDoacao(e)} onChange={(e: any) => {setValorModifyValorDebito(e.target.value);  setFraseDoacao8(true)}} >
                            <strong> <p style={{fontSize: 25, color: '#142741'}}> R$ 90 </p></strong></Radio>
                          </Grid>

                        </Grid >

                        <InvisibleContent
                          visible={valorDoacao != true}
                        >
                          <Grid item container lg={12} sm={12} xs={12} justify="center" style={{paddingTop: 10, paddingRight: 100, paddingLeft: 30 }} >
                            <Radio value={''}  onChange={() => setValorDoacao(true)} style={{width:250}} >
                              <strong> <p style={{fontSize: 25, color: '#142741'}}> Outros valores </p></strong>
                            </Radio>
                          </Grid >
                        </InvisibleContent>
                      </Radio.Group>

                      <InvisibleContent
                        visible={valorDoacao === true}
                      >
                        <Grid container justify="center" >
                          <Grid item  justify="center" lg={6} sm={6} xs={12} style={{paddingTop: 10, paddingRight: 80, paddingLeft: 60 }}>
                            <Form.Item name="valor"
                              rules={[
                              {  pattern: /^[0-9]+$/, message: 'Por favor digite somente números!'},
                              ]}>
                              <Input
                                style={{height: 115, width: 250, fontSize: 18}}
                                type={"text"}
                                placeholder='Digite o valor da doação'
                                onChange={(e: any) => {
                                  formRef.setFieldsValue({
                                    valor: isReal(e.target.value),
                                  });
                                  setValorModifyValorDebito(e.target.value);
                                  setFraseDoacao9(true);
                                }}
                              />

                            </Form.Item>
                          </Grid>
                        </Grid>
                      </InvisibleContent>
                    </Form.Item>
                  </Grid>
                  </Form.Item>

                  {/* ------------------------ FORMA DE PAGAMENTO -------------------------------------------------- */}
                  <strong><p style={{paddingTop: 25, fontSize: 17}}> Selecione a forma de pagamento *</p></strong>


                  <Grid container justify="center" >
                    <Form.Item  name='doacao' rules={[
                               { required: true, message: 'Campo obrigatório' },
                              ]} >
                      <Radio.Group>
                        <Grid container item  lg={12} sm={12} xs={12} justify="center" style={{paddingLeft: 30}}>
                          <Grid item  lg={4} sm={4} xs={12}>
                              <Form.Item  name='boleto' valuePropName="checked">
                                <Radio name='boleto' value="boleto"
                                   style={{  width: 195, height: 50, borderRadius: 15, paddingTop: 6, paddingRight: 19, paddingBottom: 3.5, paddingLeft: 16,
                                    backgroundColor: '#142741'}}   onChange={() => setFormaContribBoleto(true)} onClick={(e: any) => {setFormaContribPix(e); setFormaContribCredito(e); setFormaContribDebito(e); setFormaContribEnergia(e) }}>
                                  <p style={{fontSize: 15, color: '#fff', paddingTop: 6}}> <strong> Boleto </strong> </p>
                                </Radio>
                              </Form.Item>
                            </Grid>

                            <Grid item  lg={4} sm={4} xs={12}>
                              <Form.Item  name='pix' valuePropName="checked">
                                <Radio name='pix' value="pix"
                                  style={{  width: 195, height: 50, borderRadius: 15, paddingTop: 6, paddingRight: 19, paddingBottom: 3.5, paddingLeft: 16,
                                    backgroundColor: '#142741'}}  onChange={() => setFormaContribPix(true)} onClick={(e: any) => {setFormaContribCredito(e); setFormaContribBoleto(e); setFormaContribDebito(e); setFormaContribEnergia(e)}}>
                                    <p style={{fontSize: 15, color: '#fff', paddingTop: 6}}> <strong> Pix </strong></p>
                                </Radio>
                              </Form.Item>
                            </Grid>

                            <Grid item  lg={4} sm={4} xs={12}>
                              <Form.Item  name='cartao' valuePropName="checked">
                                <Radio  name='cartao' value="cartao"
                                   style={{  width: 195, height: 50, borderRadius: 15, paddingTop: 6, paddingRight: 19, paddingBottom: 3.5, paddingLeft: 16,
                                    backgroundColor: '#142741'}} onChange={() => setFormaContribCredito(true)} onClick={(e: any) => {setFormaContribPix(e); setFormaContribBoleto(e); setFormaContribDebito(e); setFormaContribEnergia(e) }}>
                                  <p style={{fontSize: 15, color: '#fff', paddingTop: 6}}> <strong> Cartão de crédito </strong> </p>
                                </Radio>
                              </Form.Item>
                            </Grid>

                        </Grid >
                      </Radio.Group>
                    </Form.Item>
                  </Grid>

                  {/* ------------------------ DOAÇÃO RECORRENTE ---------------------------------------------- */}

                  <Grid container justify="center" >

                      <Grid item container justify="space-around" sm={12} xs={12} style={{paddingTop: 25}}>
                        <Form.Item
                          name="recorrente"
                          valuePropName="checked"

                        >
                          <Checkbox
                            onChange={onChange}
                            style={{backgroundColor: '#fff', color: '#a38b7f'}} value="recorrente">
                            <strong>Doação mensal </strong>
                          </Checkbox>
                        </Form.Item>
                      </Grid>

                      <InvisibleContent visible={checked === true} >
                        <Grid item container justify="space-around" sm={12} xs={12}>
                          <p style={{fontSize: 13}}>Você pode cancelar quando quiser através da Central de Relacionamento com o Doador.</p>
                        </Grid>

                      </InvisibleContent>


                    {/* ------------------------ ACEITAR NORMAS E CONT. CADASTRO  ----------------------------- */}

                      <Grid container alignItems="center" justify="center">

                        <Grid container item lg={12} sm={12} xs={12}
                          style={{marginTop: 30, marginRight: 15, marginBottom: 35, marginLeft: 30}} justify="center"
                        >
                          <InvisibleContent visible={formaContribPix === true || formaContribBoleto === true || formaContribCredito === true || formaContribDebito === true || formaContribEnergia === true}>


                            <Grid item lg={6} sm={6} xs={12} justify="center">
                              <Form.Item name= "confirmacao" valuePropName='checked' rules={[{required: true, message: 'Campo obrigatório'}]}>
                                <Checkbox style={{backgroundColor: '#fff', color: '#000', borderColor: '#fff', width: 400, marginBottom: 55, marginRight: 50}} onChange={() => setConfirmacao(true)}>
                                <p>Estou de acordo em fornecer os dados acima com a finalidade de cumprir os trâmites necessários e receber informações sobre minha doação.</p>
                                </Checkbox>
                              </Form.Item>
                            </Grid>
                          </InvisibleContent>

                          <InvisibleContent visible={confirmacao != true && formaContribPix != true}>

                            <Grid item lg={6} sm={12} xs={12} style={{}} justify="center" >
                              <Form
                                form={formPessoaRef}
                                scrollToFirstError={true}
                                onFinish={onSubmitTeste}
                              >
                                <ButtonComponent
                                  color="secondary"
                                  loading={loadingCreatePessoaTeste}
                                  type="submit"
                                  style={{height: 60, width: 150}}
                                >

                                  <NavigateNextOutlined style={{height: 50, width: 50}}/>
                                </ButtonComponent>
                              </Form>
                            </Grid>
                          </InvisibleContent>

                          <InvisibleContent visible={confirmacao === true && fraseDoacao0 === true && fraseDoacao1 === true && fraseDoacao2 === true && fraseDoacao3 === true && fraseDoacao4 === true} >
                            <InvisibleContent visible={fraseDoacao5 || true || fraseDoacao6 === true || fraseDoacao7 === true || fraseDoacao8 || true || fraseDoacao9 === true} >
                              <InvisibleContent visible={formaContribBoleto === true || formaContribCredito === true || formaContribDebito === true || formaContribEnergia === true} >

                                <Grid item lg={6} sm={12} xs={12} style={{}} justify="center" >

                                  <ButtonComponent
                                    color="secondary"
                                    style={{height: 60, width: 250}}
                                    onClick={() => setLoading(true)}
                                  >
                                    Completar informações
                                    <NavigateNextOutlined style={{height: 50, width: 50}}/>
                                  </ButtonComponent>

                                </Grid>
                              </InvisibleContent>
                            </InvisibleContent>
                          </InvisibleContent>

                          <InvisibleContent
                            visible={formaContribPix === true}
                          >
                            <Grid item lg={6} sm={12} xs={12} style={{}} justify="center" >
                              <Form
                                form={formPessoaRef}
                                scrollToFirstError={true}
                                onFinish={onSubmitPix}
                              >
                                <ButtonComponent
                                  color="secondary"
                                  loading={loadingCreatePessoaPix}
                                  type="submit"
                                    style={{height: 60, width: 250}}
                                  >
                                  Gerar pix
                                <NavigateNextOutlined />
                                </ButtonComponent>
                              </Form>
                            </Grid>
                          </InvisibleContent>

                        </Grid>

                      </Grid>

                    {/* ------------------------ ENDEREÇO -------------------------------------------------- */}
                    <InvisibleContent visible={ loading === true && formaContribPix != true}>
                      <>
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
                                    onChange={(e: any) => debounceCEP(e.target.value)}
                                  />
                                </Form.Item>
                              </Grid>
                            </Grid>

                            <Grid item lg={4} xs={12}>
                              <Form.Item
                                label="Estado"
                                name="uf"
                                rules={[{ required: true, message: "Campo obrigatório" },
                                        {max: 2, message: "Somente sigla"}]}
                              >
                                <Input onInput={handleInput}/>
                              </Form.Item>
                            </Grid>

                            <Grid item lg={4} xs={12}>
                              <Form.Item
                                label="Cidade"
                                name="cidade"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                              >
                                <Input />
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
                                <Input/>
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
                                <Input type={"number"} />
                              </Form.Item>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                              <Form.Item
                                label="Complemento"
                                name="complemento"
                                rules={[
                                    { max: 45, message: 'Máximo de 45 caracteres' },
                                  ]}
                              >
                                <Input onInput={handleInput} />
                              </Form.Item>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                              <Form.Item
                                label="Bairro"
                                name="bairro"
                                rules={[{ required: false }]}
                              >
                                <Input />
                              </Form.Item>
                            </Grid>
                          </Grid>
                        </Spin>

                      {/* ------------------------ REALIZAR DOAÇÃO BOLETO ----------------------------- */}
                      <InvisibleContent visible={formaContribBoleto === true}>
                        <Grid container justify="center" >
                          <Form
                            form={formPessoaRef}
                            scrollToFirstError={true}
                            onFinish={onSubmitBoleto}>
                            <Grid
                              item
                              lg={12}
                              sm={12}
                              xs={12}
                              style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 25}}
                            >
                            <ButtonComponent
                              color="primary"
                              loading={loadingCreatePessoaBoleto}
                              type="submit"
                            >
                              Realizar doação
                            </ButtonComponent>
                          </Grid>
                          </Form>
                        </Grid>
                        </InvisibleContent>

                      {/* ------------------ CADASTRAR CARTÃO DE CRÉDITO ------------------------- */}
                        <InvisibleContent visible={formaContribCredito === true}>

                        <Grid container>
                            <div
                              style={{
                                background: '#fff',
                                border: `1px solid #999999  `,
                                borderRadius: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 'auto',
                                maxHeight: 'auto',
                                padding: 20,
                                paddingTop: 20,
                                flex: 1,
                              }}
                            >
                              <Grid container lg={12} sm={12}  xs={12} style={{ paddingRight: 10, paddingLeft: 10, paddingTop: 40 }}>
                              <Grid container lg={5} sm={12}  xs={12} style={{ paddingTop: 10 }} >
                                <div
                                  style={{
                                    background: '#999999',
                                    border: `1px solid #999999  `,
                                    borderRadius: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 250,
                                    height: 200,
                                    //padding: 20,
                                    //paddingTop: 20,
                                    flex: 1,
                                  }}
                                >
                                  <Grid container >
                                    <Grid container style={{paddingTop: 20}}>
                                      <Grid item lg={1} sm={1}  xs={1} style={{paddingLeft: 10}}></Grid>

                                      <Grid item lg={3} sm={3}  xs={3} style={{paddingLeft: 10}}>
                                        <img src={Chip}
                                          width="50"
                                          height="50">
                                        </img>
                                      </Grid>
                                    </Grid>

                                    <Grid container >
                                      <Grid item lg={12} sm={12}  xs={12} style={{ paddingRight: 20}}>
                                        <Form.Item
                                          name="number"
                                        >
                                          <Input disabled placeholder=' **** **** **** ****'
                                            style={{backgroundColor: '#999', borderColor: '#999', color: '#FFF', fontSize: 20}}/>
                                        </Form.Item>
                                      </Grid>
                                    </Grid>

                                    <Grid container >
                                      <Grid item lg={3} sm={3}  xs={3}>
                                        <Form.Item
                                          name="first_name"
                                        >
                                          <Input disabled placeholder='TITULAR'
                                            style={{backgroundColor: '#999', borderColor: '#999', color: '#FFF', fontSize: 10}}/>
                                        </Form.Item>
                                      </Grid>

                                      <Grid item lg={4} sm={4}  xs={4} >
                                        <Form.Item
                                          name="last_name"
                                        >
                                          <Input disabled placeholder='DO CARTÃO '
                                            style={{backgroundColor: '#999', borderColor: '#999', color: '#FFF', fontSize: 10}}/>
                                        </Form.Item>
                                      </Grid>

                                      <Grid item lg={1} sm={1}  xs={1} >
                                        <Form.Item
                                          name="month"
                                        >
                                          <Input disabled placeholder='**'
                                            style={{backgroundColor: '#999', borderColor: '#999', color: '#FFF', width: 30, fontSize: 10}}/>
                                        </Form.Item>
                                      </Grid>

                                      <Grid item lg={2} sm={2}  xs={2}>
                                        <Form.Item
                                          name="year"
                                        >
                                          <Input disabled placeholder='****'
                                            style={{backgroundColor: '#999', borderColor: '#999', color: '#FFF', fontSize: 10}}/>
                                        </Form.Item>
                                      </Grid>

                                      <Grid item lg={2} sm={2}  xs={2}>
                                        <Form.Item
                                          name="verification_value"
                                        >
                                          <Input disabled placeholder='***'
                                            style={{backgroundColor: '#999', borderColor: '#999', color: '#FFF', fontSize: 10}}/>
                                        </Form.Item>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </div>

                                <Grid container>
                                  < img src="https://s3-sa-east-1.amazonaws.com/storage.pupui.com.br/9CA0F40E971643D1B7C8DE46BBC18396/assets/cc-icons.e8f4c6b4db3cc0869fa93ad535acbfe7.png" alt="Visa, Master, Diners. Amex" />
                                    <a id="iugu-btn" href="http://iugu.com"><img src="https://s3-sa-east-1.amazonaws.com/storage.pupui.com.br/9CA0F40E971643D1B7C8DE46BBC18396/assets/payments-by-iugu.1df7caaf6958f1b5774579fa807b5e7f.png" alt="Pagamentos por Iugu"  /></a>

                                </Grid>
                              </Grid>

                              <Grid container lg={7} sm={12}  xs={12}>
                                <Grid container >
                                  <Grid item lg={12} sm={12}  xs={12} style={{ paddingRight: 10, paddingLeft: 10 }}>
                                    <Form.Item
                                      label="Número do cartão *"
                                      name="number"
                                      rules={[
                                          { required: true, message: 'Campo obrigatório' },


                                      ]}
                                    >
                                      <Input
                                        maxLength={16}
                                      />
                                    </Form.Item>
                                  </Grid>
                                </Grid>

                                  <Grid container>
                                    <Grid item lg={6} sm={12} xs={12}>
                                      <Form.Item
                                        label='Nome impresso cartão *'
                                        name="first_name"
                                        rules={[
                                          { required: true, message: 'Campo obrigatório' },


                                        ]}
                                        style={{ paddingLeft: 10, paddingRight: 10 }}
                                      >
                                        <Input />
                                        </Form.Item>
                                    </Grid>

                                    <Grid item lg={6} sm={12} xs={12}>
                                      <Form.Item
                                        label='Sobrenome impresso cartão *'
                                        name="last_name"
                                        rules={[
                                          { required: true, message: 'Campo obrigatório' },

                                        ]}
                                        style={{ paddingLeft: 10, paddingRight: 10 }}
                                      >
                                      <Input />
                                      </Form.Item>
                                    </Grid>
                                  </Grid>

                                  <Grid container>
                                    <Grid item lg={4} sm={4} xs={4}>
                                      <Form.Item
                                        label='Mês *'
                                        name="month"
                                        rules={[
                                          { required: true, message: 'Campo obrigatório' },
                                          {  pattern: /^[0-9]+$/, message: 'Por favor digite somente números!'},

                                        ]}
                                        style={{ paddingLeft: 10, paddingRight: 10 }}
                                      >
                                        <Input maxLength={2} minLength={2} />
                                        </Form.Item>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xs={4}>
                                      <Form.Item
                                        label='Ano *'
                                        name="year"
                                        rules={[
                                          { required: true, message: 'Campo obrigatório' },
                                          {  pattern: /^[0-9]+$/, message: 'Por favor digite somente números!'},

                                        ]}
                                        style={{ paddingLeft: 10, paddingRight: 10 }}
                                      >
                                      <Input maxLength={4} minLength={4} />
                                      </Form.Item>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xs={4}>
                                      <Form.Item
                                        label='CVV *'
                                        name="verification_value"
                                        rules={[
                                          { required: true, message: 'Campo obrigatório' },

                                        ]}
                                        style={{ paddingLeft: 10, paddingRight: 10 }}
                                      >
                                      <Input />
                                      </Form.Item>
                                    </Grid>

                                  </Grid>

                                </Grid>
                              </Grid>
                              </div>
                              </Grid>
                     {/* ------------------------ REALIZAR DOAÇÃO CARTÃO DE CRÉDITO ----------------------------- */}
                          <Form
                            form={formPessoaRef}
                            scrollToFirstError={true}
                            onFinish={onSubmitCredito}
                          >
                            <Grid container justify="center" >
                              <Grid
                                item
                                lg={12}
                                sm={12}
                                xs={12}
                                style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 25}}
                              >
                                <ButtonComponent
                                  color="primary"
                                  loading={loadingCreatePessoaCredito}
                                  fullWidth
                                  type="submit"
                                >
                                  Realizar doação
                                </ButtonComponent>
                              </Grid>
                            </Grid>
                          </Form>
                        </InvisibleContent>


                      </>
                    </InvisibleContent>

                    { /* ------------------------ DADOS OCULTOS -------------------------------------------------- */}
                  </Grid>


            </Form>
        </Grid>

        <Footer />
        <Grid item lg={12} sm={12} xs={12} style={{paddingTop: 20}}> </Grid>
        <Footer2 />

      </Grid>
    </>
  );
};

export default Principal;
