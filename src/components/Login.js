import React, {useState} from 'react'
import styled from 'styled-components'

const Login = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })


    const handleChange = () => {
        return 1;
    }




    return(
        <Container>
            <Title>Welcome Back!</Title>
            <Form>
                <Label>Username</Label>
                <Input name="username" placeholder="username" onChange={handleChange} value={user.username}/>
                <Label>Password</Label>
                <Input name="password" placeholder="password" onChange={handleChange} value={user.password}/>
                <Button>LOGIN</Button>
            </Form>
        </Container>
    )
}

export default Login

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 6% 0;
`;

const Title = styled.h1``;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    margin: 6% auto;
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
`;

const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: none;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;

`;