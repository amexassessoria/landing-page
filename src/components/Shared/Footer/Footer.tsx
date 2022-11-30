import React, { useState } from 'react';

import {
  Container,
  Content,
  CompartmentContainer,
  Compartment,
  IconsRow,

  TitleRow,

} from './FooterStyle';

import LogoCLickDoBem from '@assets/Login/sociallis-logo-hor2.png';

import Logo from '../assets/logo.svg';

export default function Footer () {
  return (
      <Container>
              <Content style={{paddingTop: '1rem'}}>
                  <CompartmentContainer >
                      <div>
                          <TitleRow style={{marginTop:25}}>

                          </TitleRow>

                      </div>
                      <Compartment>


                      </Compartment>
                  </CompartmentContainer>
              </Content>

      </Container>
  );
}
