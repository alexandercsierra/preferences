import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {axiosWithAuth} from './utils/axiosWithAuth'
import List from './List'
import styled from 'styled-components'

const FriendsList = ({currentFriend}) => {

    const {name} = useParams()

    const [lists, setLists] = useState([])
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState(lists)
    const [friendPic, setFriendPic] = useState('')

    useEffect(()=>{
        window.scrollTo(0, 0)
        let currFriend = 0;
        if(currentFriend){
            localStorage.setItem('currentFriend', currentFriend)
            currFriend = currentFriend
        } else{
            currFriend = localStorage.getItem('currentFriend')
        }
        axiosWithAuth().get(`/api/lists/${currFriend}`)
            .then(res=>{
                setLists(res.data)
                setFiltered(res.data)
                axiosWithAuth().get(`/api/auth/img/${currFriend}`)
                    .then(res=>setFriendPic(res.data.img_url))
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))

    },[currentFriend])

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        setFiltered(lists.filter(list=>list.name.toLowerCase().includes(search.toLowerCase())))
        setSearch("")
    }


    return (
        <Container>
            <UserDiv>
                <ImgDiv>
                    <Img src={friendPic}/>
                </ImgDiv>
                <Title>{name}'s Lists</Title>
            </UserDiv>
            <SearchDiv>
                <Form onSubmit={onSubmit}>
                    <Input onChange={handleChange} placeholder='search' value={search}/>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </SearchDiv>
                    <Button onClick={()=>setFiltered(lists)}>See All</Button>
            <ListContainer>
                {filtered.map(list=><List key={list.id} list={list} isFriend={true}/>)}
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

const UserDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10vh;

`;

const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Input = styled.input`
    width: 70%;
    margin-bottom: 6%;
    padding: 4%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: none;
`;

const SubmitButton = styled.button`
    width: 20%;
    padding: 2%;
    margin-bottom: 6%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
`;

const Button = styled.button`
    margin: 0 auto;
    width: 25%;
    border-radius: 10px;
    font-size: 1rem;
    border: none;
`;

const ListContainer = styled.div`
    min-height: 90vh;
`;

const Title = styled.h1`
    margin: 0 auto;
    margin-bottom: 4%;
    width: 70%;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
`;

const ImgDiv = styled.div`
    margin-left: 4%;
    margin-bottom: 15%;
    width: 75px;
    height: 75px;
    box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
    overflow: hidden;
    border-radius: 100%;
`;

const Img = styled.img`
    background-size: cover;
    background-position: 50% 50%;
`;