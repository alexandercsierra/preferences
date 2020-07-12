import React, {useState} from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })


    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.post('https://preferencesbackend.herokuapp.com/api/auth/register', user)
            .then(res=>{
                console.log(res)
                history.push('/login')
            })
            .catch(err=>console.log(err))
    }

    return(
        <Container>
            <Title>Get Started Today!</Title>
            <Form onSubmit={onSubmit}>
                <Label>Name</Label>
                <Input name="name" placeholder="name" onChange={handleChange} value={user.name}/>
                <Label>Email</Label>
                <Input name="email" placeholder="email" onChange={handleChange} value={user.email}/>
                <Label>Username</Label>
                <Input name="username" placeholder="username" onChange={handleChange} value={user.username}/>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="password" onChange={handleChange} value={user.password}/>
                <Button>SUBMIT</Button>
            </Form>
        </Container>
    )
}

export default Signup

const Container = styled.div`
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 6% 0;
    height: 100vh;
`;

const Title = styled.h1``;

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
`;

const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: none;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;

`;