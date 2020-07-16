import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react';
import ep from '../img/extrapickles.png';
import ProfileImage from './ProfileImage'
import {MobileContainer, Navbar, MobileNav, TheLinks, Signout, Button} from '../styles/NavStyles'
import Loader from './Loader'


const Nav = ({user}) => {
    const history = useHistory()
    const location = useLocation().pathname

    const [checked, setChecked] = useState(false)

    const unCheck = () => {
        setChecked(false)
    }

    useEffect(()=>{
        unCheck()
    },[location])

    const { authState, authService } = useOktaAuth();


      const login = async () => {
        authService.login('/dashboard');
      };

      const logout = async () => {
        authService.logout('/');
      };

      if (authState.isPending) {
        return (
          <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Loader/>
          </div>
        );
      }

    return(
        
        <div>
            <MobileContainer style={{border: '1px solid white'}}>
                
                <input type="checkbox" className="blue" id="menu" onChange={()=>setChecked(!checked)} checked={checked} onClick={()=>setChecked(!checked)}/>
                <label htmlFor="menu" className="icon">
                    <div className="menu"></div>
                </label>
                <MobileNav>
                    {location !== "/" && <img alt="a pickle with the text 'Extra Pickles'" style={{width: '30vh', position: 'fixed', top: '0', right: '0', marginRight: '60px', marginTop: '1vh'}} onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' })}} src={ep} />}
                    {location !== "/" && <ProfileImage image={user.img_url}/>}
                    <TheLinks to="/" exact={true} onClick={unCheck}>HOME</TheLinks>
                    <TheLinks to="/dashboard" onClick={unCheck}>DASHBOARD</TheLinks>
                    {location !== "/profile" && <TheLinks to="/profile" onClick={unCheck}>EDIT PROFILE</TheLinks>}
                    {location !=="/dashboard" && location !=="/profile" && <Signout onClick={login}>LOGIN/SIGNUP</Signout>}
                    <Signout onClick={()=>{
                        localStorage.clear();
                        logout();
                    }}>SIGNOUT</Signout>
                </MobileNav>
            </MobileContainer>
            <Navbar>

                <TheLinks to="/" exact={true}>HOME</TheLinks>
                {location !== "/" && <TheLinks to="/dashboard">DASHBOARD</TheLinks>}
                <Signout onClick={login}>LOGIN</Signout>
                <Button>GET STARTED</Button>
                {location !=="/" && <Signout onClick={()=>{
                    localStorage.clear();
                    setChecked(false)
                    logout();                
                }}>SIGNOUT</Signout>}
            </Navbar>
        </div>
    )
}

export default Nav