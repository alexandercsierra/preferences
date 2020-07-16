import styled from 'styled-components'

export const ImgDiv = styled.img`
width: 125px;
height: 125px;
z-index: 101;
background-size: cover;
background-position: 50% 50%;
box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
overflow: hidden;
border-radius: 100%;

    @media(max-width: 970px){
        width: 50px;
        height: 50px;
    }
`;