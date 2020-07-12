import React from 'react'
import styled from 'styled-components'
import InstructionCard from './InstructionCard'

const Home = () => {
    return(
        <>
        <Header>
            <TextDiv>
                <Title>
                Your friends preferences all in one place
                </Title>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum quis urna bibendum dignissim. Maecenas vestibulum, massa non pharetra tincidunt, metus arcu consequat ligula, at placerat sem sapien cursus lorem. Aliquam nec metus sodales, pellentesque dui vitae, posuere leo. Vestibulum velit libero, ornare at efficitur condimentum, aliquam vitae nisi. Praesent facilisis quis ligula ut tempus. Sed nunc leo, eleifend a maximus eget, tristique interdum massa. Pellentesque id imperdiet massa, at rutrum nisl. Pellentesque massa massa, malesuada vitae metus eu, venenatis aliquam nulla. Nam efficitur volutpat odio eget tempor.
                </Text>
            </TextDiv>
            <ImageDiv>
                <CircleDiv><InnerCircle></InnerCircle></CircleDiv>
            </ImageDiv>
        </Header>
        <Section>
            <InstructionCard title={'1. Signup'}/>
            <InstructionCard title={'2. Create a List'}/>
            <InstructionCard title={'3. Add Friends'}/>
        </Section>
        <Section>
            <div style={{height: '500px', width: '500px'}}>

            </div>
        </Section>
        </>
    )
}

export default Home

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
        width: 80%;
    }
`;

const CircleDiv = styled.div`
    background: #f1f1f1;
    height: 45vh;
    width: 45vh;
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