import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react';
import ep from '../img/extrapickles.png';
import ProfileImage from './ProfileImage'
import {MobileContainer, Navbar, MobileNav, TheLinks, Signout, Button} from '../styles/NavStyles'

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
    // const [userInfo, setUserInfo] = useState(null);
    
    

    // useEffect(() => {
    //     if (!authState.isAuthenticated) {
    //       // When user isn't authenticated, forget any user info
    //       setUserInfo(null);
    //     } else {
    //       authService.getUser().then((info) => {
    //         setUserInfo(info);
    //       });
    //     }
    //     console.log('userinfo', userInfo)
    //   }, [authState, authService]);


      const login = async () => {
        authService.login('/dashboard');
      };

      const logout = async () => {
        authService.logout('/');
      };

      if (authState.isPending) {
        return (
          <div>Loading...</div>
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
                    <img alt="a pickle with the text 'Extra Pickles'" style={{width: '30vh', position: 'fixed', top: '0', right: '0', marginRight: '60px', marginTop: '1vh'}} onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' })}} src={ep} />
                    {location !== "/" && <ProfileImage image={user.img_url}/>}
                    <TheLinks to="/" exact={true} onClick={unCheck}>HOME</TheLinks>
                    <TheLinks to="/dashboard" onClick={unCheck}>DASHBOARD</TheLinks>
                    <Signout onClick={login}>LOGIN/SIGNUP</Signout>
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
                    history.push('/login')
                }}>SIGNOUT</Signout>}
            </Navbar>
        </div>
    )
}

export default Nav

// const MobileContainer = styled.div`
//     display: none;
//     @media(max-width: 970px){
//         display: block;
//     }
// `;

// const Navbar = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     padding-top: 20px;
//     padding-right: 20px;
//     @media(max-width: 970px){
//         display: none;
//     }
// `;

// const MobileNav = styled.nav`
//     display: flex;
//     // justify-content: flex-end;
//     flex-direction: column;
// `;

// const TheLinks = styled(NavLink)`
//     color: white;
//     margin: 1% 2%; 
//     text-decoration: none;
//     font-weight: 700;
//     @media(max-width: 970px){
//         margin: 2% 4%; 
//         color: #111725;
//     }
//     `;
    
//     const Signout = styled.p`
//     color: white;
//     margin: 1% 2%; 
//     text-decoration: none;
//     cursor: pointer;
//     font-weight: 700;
//     @media(max-width: 970px){
//         margin: 2% 4%; 
//         color: #111725;
//     }
// `;

// const Button = styled.button`
//     width: 10%;
//     // padding: 2%;
//     font-family: 'Modak', cursive;
//     font-size: 20px;
//     // text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
//     -webkit-text-stroke: 1.5px #0B3D20; 
//     border-radius: 10px;
//     border: 5px solid white;
//     // background white;
//     background: #0B3D20;
//     color: white;
//     @media(max-width: 510px){
//         width: 65%;
//     }
// `;

