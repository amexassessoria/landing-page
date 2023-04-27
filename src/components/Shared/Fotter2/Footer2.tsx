import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { TitlePage } from '@styles/styles.global';
import LogoRodape from '@assets/Login/sociallis-logo-hor2.png';
import LogoRodape2 from '@assets/Login/sociallis-favicon.png';


import {
  Container,
  Content,
  CompartmentContainer,
  Compartment,
  IconsRow,

  TitleRow,

} from './FooterStyle2';

import LogoCLickDoBem from '@assets/Login/sociallis-logo-hor2.png';

import Logo from '../assets/logo.svg';
import { Height } from '@material-ui/icons';

export default function Footer2 () {
  return (
      <Container>
        <Content style={{paddingTop: '1rem'}}>
          <CompartmentContainer >

            <Grid container alignItems="center" justify="center">
              <Grid container item lg={8} sm={8} xs={12} alignItems="center" justify="center" >
                <TitlePage style={{fontSize: 17, color:'#fff'}}>Desenvolvido por  </TitlePage>
                <img src={LogoRodape2} style={{paddingLeft:10, width: 40 }} />
                <img src={LogoRodape} style={{width: 100 }} />
              </Grid>
            </Grid>

            <Compartment>


            </Compartment>
          </CompartmentContainer>
        </Content>
      </Container>
  );
}
