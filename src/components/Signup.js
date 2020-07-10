import React, {useState} from 'react'
import styled from 'styled-components'


const Signup = () => {


    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })


    const handleChange = () => {
        return 1;
    }

    return(
        <Container>
            <Title>Get Started Today!</Title>
            <Form>
                <Label>Name</Label>
                <Input name="name" placeholder="name" onChange={handleChange} value={user.name}/>
                <Label>Email</Label>
                <Input name="email" placeholder="email" onChange={handleChange} value={user.email}/>
                <Label>Username</Label>
                <Input name="username" placeholder="username" onChange={handleChange} value={user.username}/>
                <Label>Password</Label>
                <Input name="password" placeholder="password" onChange={handleChange} value={user.password}/>
                <Button>SUBMIT</Button>
            </Form>
        </Container>
    )
}

export default Signup

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