import styled from 'styled-components';



export const Container = styled.div`
    width: 100%;
    background:#40455A;
    display: flex;
    flex-direction: row;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: start;
    font-size: 14px;
    p, a {
        color: #a2a2a2;
        padding-left: 2.5rem;
        margin-bottom: 1rem;
        text-decoration: none;
    }
    h1, h2 {
        margin-bottom: 2rem;
    }
    h1 {
        padding-top: 2rem;
        padding-left: 1rem;
        font-weight: 400;
    }
    h2 {
        font-weight: 200;

        padding-left: 2.5rem;
    }
`

export const CompartmentContainer = styled.div`
    justify-content: space-between;

    display: flex;
    flex-direction: column;
    flex: 1;
`

export const Compartment = styled.div`

    width: 100%;
    h4 {
        font-weight: 100;
    }
    span {
        color: #383838;
        font-size: 0.9rem;
    }
    span, h4 {
        padding-left: 2.5rem;
    }
`

export const IconsRow = styled.div`
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    a {
        color: #FFF;
        text-decoration: none;
    }
`




export const TitleRow = styled.div`
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #567220 ;



`

