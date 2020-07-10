import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return(
        <Navbar>
            <TheLinks to="/" exact={true}>HOME</TheLinks>
            <TheLinks to="/login">LOGIN</TheLinks>
            <TheLinks to="/signup">SIGNUP</TheLinks>
        </Navbar>
    )
}

export default Nav

const Navbar = styled.nav`
    display: flex;
    justify-content: flex-end;
`;

const TheLinks = styled(NavLink)`
    color: white;
    margin: 2% 4%; 
    text-decoration: none;
`;