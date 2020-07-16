import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

export const MobileContainer = styled.div`
    display: none;
    @media(max-width: 970px){
        display: block;
    }
`;

export const Navbar = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-right: 20px;
    @media(max-width: 970px){
        display: none;
    }
`;

export const MobileNav = styled.nav`
    display: flex;
    // justify-content: flex-end;
    flex-direction: column;
`;

export const TheLinks = styled(NavLink)`
    color: white;
    margin: 1% 2%; 
    text-decoration: none;
    font-weight: 700;
    @media(max-width: 970px){
        margin: 2% 4%; 
        color: #0B3D20;
    }
    `;
    
    export const Signout = styled.p`
    color: white;
    margin: 1% 2%; 
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
    @media(max-width: 970px){
        margin: 2% 4%; 
        color: #111725;
    }
`;

export const Button = styled.button`
    width: 10%;
    // padding: 2%;
    font-family: 'Modak', cursive;
    font-size: 20px;
    // text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
    -webkit-text-stroke: 1.5px #0B3D20; 
    border-radius: 10px;
    border: 5px solid white;
    // background white;
    background: #0B3D20;
    color: white;
    @media(max-width: 510px){
        width: 65%;
    }
`;
