import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react';


const Login = ({setCurrentUser}) => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const history = useHistory()

    const { authState, authService } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    
    

    useEffect(() => {
        if (!authState.isAuthenticated) {
          // When user isn't authenticated, forget any user info
          setUserInfo(null);
        } else {
          authService.getUser().then((info) => {
            setUserInfo(info);
          });
        }
      }, [authState, authService]);


      const login = async () => {
        authService.login('/dashboard');
      };

      if (authState.isPending) {
        return (
          <div>Loading...</div>
        );
      }


    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        // axios.post('https://preferencesbackend.herokuapp.com/api/auth/login', user)
        // // axios.post('http://localhost:7000/api/auth/login', user)
        //     .then(res=>{
        //         console.log(res)
        //         setCurrentUser(res.data.user)
        //         localStorage.setItem('token', res.data.token)
        //         history.push('/dashboard')
        //     })
        //     .catch(err=>console.log(err))
    }




    return(
        <Container>
            <Title>Welcome Back!</Title>
            <Form onSubmit={onSubmit}>
                <Label>Username</Label>
                <Input name="username" placeholder="username" onChange={handleChange} value={user.username}/>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="password" onChange={handleChange} value={user.password}/>
                <Button onClick={login}>LOGIN</Button>
            </Form>
        </Container>
    )
}

export default Login

const Container = styled.div`
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    // margin: 6% 0;
    height: 100vh;
`;

const Title = styled.h1`
    margin-top: 10vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    margin: 6% auto;

    @media(max-width: 970px){
        width: 50%;
    }
    @media(max-width: 500px){
        width: 90%;
    }

`;

const Label = styled.label`
    align-self: flex-start;
    margin-bottom: 2%;
`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 6%;
    padding: 4%;
    border-radius: 10px;
    border: none;
`;

const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: none;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;

`;