import React, {useState} from 'react'
import styled from 'styled-components'
import List from './List'

const Dashboard = () => {


    const [lists, setLists] = useState(['Fast Food', 'Restaurants', 'Wishlist'])


    return(
        <Container>
            <UserPanel>
                <Title>Welcome Janet!</Title>
                <ImgDiv>
                    <Img src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}/>
                </ImgDiv>
                <Menus>
                    <Subtitle>My Lists</Subtitle>
                    <Lists>
                        {lists.map(list=><ListNames>{list}</ListNames>)}
                    </Lists>
                </Menus>
            </UserPanel>
            <ListContainer>
                <List/>
            </ListContainer>
        </Container>
    )
}

export default Dashboard

const Container = styled.div`
    display: flex;
`;

const ListContainer = styled.div`
    width: 60%;
    height: 100vh;
    // border: 1px solid red;
`;

const UserPanel = styled.div`
    background: #f1f1f1;
    color: #111725;
    height: 100vh;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    margin: 6% 0;
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    align-self: flex-start;
`;

const ImgDiv = styled.div``;

const Img = styled.img`
    width: 175px;
    border-radius: 100%;
    height: 175px;
    margin: 8% 0;
`;

const Menus = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 75%;
`;

const Lists = styled.div`
    margin: 5% 15%;
`;

const ListNames = styled.p``;