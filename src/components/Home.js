import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import InstructionCard from './InstructionCard'
import {useHistory} from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react';
import ep from '../img/extrapickles.png'


const Home = () => {

    const circle_image = 'https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';

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
        <BannerDiv>
            <Banner src={ep}/>
        </BannerDiv>
        <Header>
        <ImageDiv>
                <CircleDiv>
                    <ImgDiv>
                        {/* <Img src={circle_image}/> */}
                    </ImgDiv>
                </CircleDiv>
            </ImageDiv>
            <TextDiv>
                <Title>
                The food you love, just the way you like it.
                </Title>
                <Text>
                    You're on your way home at the end of a long day, and want to pick up something to eat. But it's not just you that you need to worry about. What does the spouse want from this place? What is it that the kids usually get? Never forget again. With Extra Pickles, all your friends' and family's favorite foods live in one place. Sign up, add a list then add a friend. Now your friends know what to get you from your favorite restaurants.
                </Text>
                <BtnDiv>
                    <Button onClick={login}>Get Started</Button>

                </BtnDiv>
            </TextDiv>
            {/* <ImageDiv>
                <CircleDiv>
                    <ImgDiv>
                        <Img src='https://images.unsplash.com/photo-1531947398206-60f8e97f34a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'/>
                    </ImgDiv>
                </CircleDiv>
            </ImageDiv> */}
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

const BannerDiv = styled.div`
    margin: 0 auto;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width: 970px){
        display: none;
    }
`;

const Banner = styled.img`

`;

const BtnDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid red;
`;

const Button = styled.button`
    width: 30%;
    padding: 2%;
    font-family: 'Modak', cursive;

    border-radius: 10px;
    border: 5px solid white;
    // background white;
    background: #0B3D20;
    color: white;
    @media(max-width: 510px){
        width: 65%;
    }
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
    font-size: 1.8rem;
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
        margin-top: 15vh;
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
    background-image: url('https://images.unsplash.com/photo-1545823140-2b6f44dd8ddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80');
    background-size: cover;
    background-position: 50% 50%;
    
`;


const CircleDiv = styled.div`
    background: #f1f1f1;
    // background: #0B3D20;
    height: 350px;
    width: 350px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


`;

const InnerCircle = styled.div`
    // background: #111725;
    background: #0B3D20;
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
    background-size: 00%;
    background-position: 50% 50%;
`;

const CircleImg = styled.div`
    height: 45vh;
    width: 45vh;
    border: 1px solid red;
`;

