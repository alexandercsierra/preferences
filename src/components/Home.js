import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import InstructionCard from './InstructionCard'
import {useHistory} from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react';



const Home = () => {

    const history = useHistory();
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
    
      

    return(
        <>
        <Header>
            <TextDiv>
                <Title>
                The food you love, just the way you like it.
                </Title>
                <Text>
                    You're on your way home at the end of a long day, and want to pick up something to eat. But it's not just you that you need to worry about. What does the spouse want from this place? What is it that the kids usually get? Never forget again. With Extra Pickles, all your friends' and family's favorite foods live in one place. Sign up, add a list then add a friend. Now your friends know what to get you from your favorite restaurants.
                </Text>
                <Button onClick={login}>Get Started Today</Button>
            </TextDiv>
            <ImageDiv>
                <CircleDiv>
                    <ImgDiv>
                        <Img src='https://images.unsplash.com/photo-1531947398206-60f8e97f34a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'/>
                        {/* <Img style={{width: '25%'}} src='https://freesvg.org/img/food-pickle.png'/> */}
                    </ImgDiv>
                </CircleDiv>
                
            </ImageDiv>
        </Header>
        <Section>
        {/* <button id="login-button" primary onClick={login}>Login</button> */}
            <InstructionCard title={'Signup'}/>
            <InstructionCard title={'Create a List'}/>
            <InstructionCard title={'Add Friends'}/>
        </Section>
        <Section>
            <div style={{height: '500px', width: '500px'}}>

            </div>
        </Section>
        </>
    )
}

export default Home

const Button = styled.button`
    padding: 2%;
    border-radius: 10px;
    border: none;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    @media(max-width: 970px){
        flex-direction: column;
    }
`;

const TextDiv = styled.div`
    width: 50%;
    padding: 4%;
    @media(max-width: 970px){
        width: 80%;
    }
    
`;

const Title = styled.h1`
    margin-bottom: 10%;
    @media(max-width: 970px){
        margin-top: 10vh;
    }
`;

const Text = styled.p``;

const ImageDiv = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media(max-width: 970px){
        width: 100%;
    }
`;

const ImgDiv = styled.div`
    // margin-bottom: 15%;
    width: 300px;
    height: 300px;
    // border: 15px solid #f1f1f1;
    box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    
`;


const CircleDiv = styled.div`
    background: #f1f1f1;
    height: 350px;
    width: 350px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


`;

const InnerCircle = styled.div`
    background: #111725;
    height: 35vh;
    width: 35vh;
    border-radius: 100%;
`;

const Section = styled.section`
    display: flex;
    justify-content: space-around;
    margin-top: 10%;

    @media(max-width: 970px){
        flex-direction: column;
    }
`;

const Img = styled.img`
    // border-radius: 100%;
    // height: 45vh;
    // width: 45vh;
    background-size: cover;
    background-position: 50% 50%;
`;

const CircleImg = styled.div`
    height: 45vh;
    width: 45vh;
    border: 1px solid red;
`;

