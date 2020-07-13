import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {NavLink, useHistory, useLocation} from 'react-router-dom'


const Nav = () => {
    const history = useHistory()
    const location = useLocation().pathname

    const [checked, setChecked] = useState(false)

    const unCheck = () => {
        setChecked(false)
    }

    useEffect(()=>{
        unCheck()
    },[location])

    return(
        
        <div>
            <MobileContainer>
                <input type="checkbox" className="blue" id="menu" checked={checked} onClick={()=>setChecked(!checked)}/>
                <label htmlFor="menu" className="icon">
                    <div className="menu"></div>
                </label>
                <MobileNav>
                    <TheLinks to="/" exact={true} onClick={unCheck}>HOME</TheLinks>
                    <TheLinks to="/dashboard" onClick={unCheck}>DASHBOARD</TheLinks>
                    <TheLinks to="/login" onClick={unCheck}>LOGIN</TheLinks>
                    <TheLinks to="/signup" onClick={unCheck}>SIGNUP</TheLinks>
                    <Signout onClick={()=>{
                        localStorage.clear();
                        history.push('/login')
                    }}>SIGNOUT</Signout>
                </MobileNav>
            </MobileContainer>
            <Navbar>
                <TheLinks to="/" exact={true}>HOME</TheLinks>
                {location !== "/" && <TheLinks to="/dashboard">DASHBOARD</TheLinks>}
                <TheLinks to="/login">LOGIN</TheLinks>
                {location === "/" && <TheLinks to="/signup">SIGNUP</TheLinks>}
                <Signout onClick={()=>{
                    localStorage.clear();
                    setChecked(false)
                    history.push('/login')
                }}>SIGNOUT</Signout>
            </Navbar>
        </div>
    )
}

export default Nav

const MobileContainer = styled.div`
    display: none;
    @media(max-width: 970px){
        display: block;
    }
`;

const Navbar = styled.div`
    display: flex;
    justify-content: flex-end;
    @media(max-width: 970px){
        display: none;
    }
`;

const MobileNav = styled.nav`
    display: flex;
    // justify-content: flex-end;
    flex-direction: column;
`;

const TheLinks = styled(NavLink)`
    color: white;
    margin: 2% 4%; 
    text-decoration: none;
    font-weight: 700;
    @media(max-width: 970px){
        color: #111725;
    }
    `;
    
    const Signout = styled.p`
    color: white;
    margin: 2% 4%; 
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
    @media(max-width: 970px){
        color: #111725;
    }
`;

