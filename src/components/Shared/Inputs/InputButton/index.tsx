import React, { useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import { CheckOutlined } from '@material-ui/icons';

import { FormatDate } from '@utils/formats';
import { getColors } from '@styles/colorsTheme';

import { Empty } from 'antd';
import '@styles/AntStyles.css';

import Service, { IHistorico } from './service';
import { useSnackbar } from 'notistack';

interface IProps {
  idPerfil: number;
  historico_descricao: string;
  input?: boolean;
}

const InputButton: React.FC<IProps> = ({
  historico_descricao,
  idPerfil,
  input,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [texto, setTexto] = useState('');
  const [historico, setHistorico] = useState<IHistorico[]>([]);

  function handleInput(e: any) {
    var ss = e.target.selectionStart;
    var se = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.selectionStart = ss;
    e.target.selectionEnd = se;
  };

  const reload = async () => {
    const service = new Service();

    const { error, response } = await service.loadHistorico({
      id_perfil: idPerfil,
      historico_descricao: historico_descricao,
    });

    if (!error && response) {
      setHistorico(response);
    } else {
      enqueueSnackbar(`Ocorreu um erro`, {
        title: 'Ocorreu um erro ',
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    }
  };

  useEffect(() => {
    const loadHistorico = async () => {
      const service = new Service();

      const { error, response } = await service.loadHistorico({
        id_perfil: idPerfil,
        historico_descricao: historico_descricao,
      });

      if (!error && response) {
        setHistorico(response);
      } else {
        enqueueSnackbar(`Ocorreu um erro`, {
          title: 'Ocorreu um erro ',
          variant: 'error',
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        });
      }
    };

    loadHistorico();
  }, [historico_descricao, idPerfil]);

  const handleAddHitoricoGeral = async () => {
    if (texto === '') {
      return;
    }
    const service = new Service();

    const { error } = await service.addHistoricoGeral({
      id_perfil: idPerfil,
      historico_descricao: historico_descricao,
      descricao: texto,
    });

    if (!error) {
      await reload();
      setTexto('');

      enqueueSnackbar(`Histórico salvo com sucesso!`, {
        variant: 'success',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });

      return;
    }
    enqueueSnackbar(`Ocorreu um erro`, {
      title: 'Ocorreu um erro ',
      variant: 'error',
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    });
  };

  return (
    <>
      {input && (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ padding: 10 }}
        >
          <Grid
            item
            md={10}
            xs={10}
            container
            justify="center"
            alignItems="center"
          >
            <textarea
              placeholder="Inserir histórico manualmente"
              style={{
                width: '100%',
                height: 80,
                resize: 'none',
                border: 'none',
                background: '#F1F1F1',
                margin: 0,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                textAlign: texto ? 'justify' : 'center',
                textAnchor: 'middle',
              }}
              value={texto}
              onChange={e => {
                setTexto(e.target.value);
              }}
              maxLength={1600}
              onInput={handleInput}
            ></textarea>
          </Grid>
          <Grid
            item
            md={2}
            xs={2}
            container
            justify="center"
            alignItems="center"
          >
            <button
              style={{
                width: '100%',
                height: 80,
                border: 'none',
                background: getColors()?.azulEscuro,
              }}
              onClick={handleAddHitoricoGeral}
              disabled={texto === ''}
            >
              <CheckOutlined fontSize="large" htmlColor="#fff" />
            </button>
          </Grid>
        </Grid>
      )}

      <div
        style={{
          maxHeight: 300,
          minHeight: 300,
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {historico.length <= 0 && (
          <Grid
            container
            item
            xs={12}
            md={12}
            style={{
              margin: 10,
              overflowX: 'hidden',
              maxHeight: 200,
              minHeight: 200,
            }}
            justify="center"
            alignItems="center"
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Nenhum dado encontrado"
            />
          </Grid>
        )}

        {historico.map((item, index) => (
          <div key={index}>
            <Grid
              container
              item
              justify="space-between"
              xs={12}
              md={12}
              style={{ overflowX: 'scroll', marginTop: 10 }}
            >
              <div>
              <small
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                {FormatDate(item.data_cadastro)}
                {/* Usuário - 00/00/0000 - 00h00 */}
              </small>
              </div>
              <div>
              <pre style={{ paddingRight: 70 }}>{item.descricao}</pre>
              </div>
              
            </Grid>
          </div>
        ))}
      </div>
    </>
  );
};

export default InputButton;
