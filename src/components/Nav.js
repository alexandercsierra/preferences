import React from 'react'
import styled from 'styled-components'
import {NavLink, useHistory} from 'react-router-dom'


const Nav = () => {
    const history = useHistory()
    return(
        <Navbar>
            <TheLinks to="/" exact={true}>HOME</TheLinks>
            <TheLinks to="/dashboard">DASHBOARD</TheLinks>
            <TheLinks to="/login">LOGIN</TheLinks>
            <TheLinks to="/signup">SIGNUP</TheLinks>
            <Signout onClick={()=>{
                localStorage.clear();
                history.push('/login')
            }}>SIGNOUT</Signout>
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

const Signout = styled.p`
    color: white;
    margin: 2% 4%; 
    text-decoration: none;
    cursor: pointer;
`;