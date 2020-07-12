import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {axiosWithAuth} from './utils/axiosWithAuth'
import List from './List'
import styled from 'styled-components'

const FriendsList = ({currentFriend}) => {

    const {name} = useParams()

    const [lists, setLists] = useState([])

    useEffect(()=>{
        let currFriend = 0;
        if(currentFriend){
            localStorage.setItem('currentFriend', currentFriend)
            currFriend = currentFriend
        } else{
            currFriend = localStorage.getItem('currentFriend')
        }
        axiosWithAuth().get(`/api/lists/${currFriend}`)
            .then(res=>setLists(res.data))
            .catch(err=>console.log(err))
    },[])


    return (
        <Container>
            <Title>{name}'s Lists</Title>
            <ListContainer>
                {lists.map(list=><List key={list.id} list={list} isFriend={true}/>)}
            </ListContainer>
        </Container>
    )
}

export default FriendsList;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`;

const ListContainer = styled.div`
    min-height: 100vh;
`;

const Title = styled.h1`
    margin: 10vh auto;
    margin-bottom: 4%;
`;