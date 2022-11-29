import React from 'react';
import { Grid } from '@material-ui/core';
import { TitlePage } from '@styles/styles.global';
import LogoCLickDoBem from '@assets/Login/logo-topo.png';



import {
  Container,

} from './styles';

const HeaderUser = () => {
  return (
    <Container>
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

    </Container>
  )
}

export default HeaderUser;
