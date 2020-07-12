import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import List from './List'
import Modal from './Modal'
import {axiosWithAuth} from './utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'


const Dashboard = ({user, setUser, setCurrentFriend}) => {

    const history = useHistory();

    const [lists, setLists] = useState([])
    const [add, setAdd] = useState(false)
    const [isAddingFriend, setIsAddingFriend] = useState(false)
    const [listName, setListName] = useState('');
    const [friends, setFriends] = useState([])
    const [friend, setFriend] = useState('')
    const [isOpenList, setIsOpenList] = useState(false)
    const [isOpenFriend, setIsOpenFriend] = useState(false)
    const [whichForm, setWhichForm] = useState('')

    useEffect(()=>{
        if(Object.keys(user).length === 0){
            axiosWithAuth().get('/api/auth')
                .then(res=>setUser(res.data[0]))
                .catch(err=>console.log(err))
        }

        axiosWithAuth().get('/api/lists')
            .then(res=>setLists(res.data))
            .catch(err=>console.log(err))

        axiosWithAuth().get('/api/friends')
            .then(res=>setFriends(res.data))
            .catch(err=>console.log(err))
    },[])

    const handleChange = e => {
        setListName(e.target.value)
    }
    const handleChangeFriend = e => {
        setFriend(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        axiosWithAuth().post('/api/lists', {name: listName})
            .then(res=>{
                axiosWithAuth().get('/api/lists')
            .then(res=>{
                setLists(res.data)
                setListName('')
            })
            .catch(err=>console.log(err))

            })
            .catch(err=>console.log(err))
    }

    const onSubmitFriend = e =>{
        e.preventDefault();
        console.log(friend)
        axiosWithAuth().post('/api/friends', {user: friend})
            .then(res=>setFriends([...friends, {friend_name: friend}]))
            .catch(err=>console.log(err))
    }

    const deleteFriend = (id, name) => {
        console.log('id', id)
        axiosWithAuth().delete(`/api/friends/${id}`)
            .then(res=>setFriends(friends.filter(friend=>friend.friend_name !== name)))
            .catch(err=>console.log(err))
    }

    return(
        <Container>
            <UserPanel>
                <TopTitleDiv>
                    <Title>Welcome {user.username}</Title>
                    <i class="fas fa-pen" onClick={()=>history.push('/profile')}></i>
                </TopTitleDiv>
                <ImgDiv>
                    <Img src={user.img_url}/>
                    {/* <button onClick={()=>history.push('/profile')}>Edit Profile</button> */}
                    {/* <button onClick={()=>setAdd(!add)}>Add a List</button>
                    <button onClick={()=>setIsAddingFriend(!isAddingFriend)}>Add Friend</button> */}
                </ImgDiv>
                {add && <form onSubmit={onSubmit}>
                    <input name="name" placeholder="name" onChange={handleChange} value={listName}/>
                    <button>Add</button>
                </form>}
                {isAddingFriend && <form onSubmit={onSubmitFriend}>
                    <input name="username" placeholder="username" onChange={handleChangeFriend} value={friend}/>
                    <button>Add</button>
                </form>}
                <Menus>
                    <TitleDiv>
                        <Subtitle>My Lists</Subtitle>
                        <i class="fas fa-plus-circle" onClick={()=>{
                            setWhichForm('list')
                            setIsOpenList(true)
                        }}></i>
                        <Modal isOpen={isOpenList} setIsOpen={setIsOpenList} whichForm={whichForm}/>
                    </TitleDiv>
                    <Lists>
                        {lists.map(list=><ListNames key={list.id}>{list.name}</ListNames>)}
                    </Lists>
                </Menus>
                <Menus>
                <TitleDiv>
                        <Subtitle>My Friends</Subtitle>
                        <i class="fas fa-plus-circle" onClick={()=>{
                            setWhichForm('friend')
                            setIsOpenFriend(true)
                        }}></i>
                        <Modal isOpen={isOpenFriend} setIsOpen={setIsOpenFriend} whichForm={whichForm}/>
                    </TitleDiv>
                    <Lists>
                        {friends.map(friend=>{
                            return (
                                <div>
                                    <ListNames onClick={()=>{
                                        setCurrentFriend(friend.friend_id)
                                        history.push(`/friend/${friend.friend_name}`)
                                    }} key={friend.friend_id}>{friend.friend_name}</ListNames>
                                    <button onClick={()=>deleteFriend(friend.friend_id, friend.friend_name)}>X</button>
                                </div>
                            )
                        })}
                    </Lists>
                </Menus>
            </UserPanel>
            <ListContainer>
                {lists.map(list=><List key={list.id} list={list} isFriend={false}/>)}
            </ListContainer>
        </Container>
    )
}

export default Dashboard

const Container = styled.div`
    display: flex;
    margin-bottom: 5%;
`;

const TopTitleDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const TitleDiv = styled.div`
    display: flex;
    // justify-content: center;
    align-items: center;
    width: 100%;
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
    // border: 1px solid red;
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    align-self: flex-start;
    margin: 2%;
`;

const ImgDiv = styled.div`
    margin-bottom: 15%;
`;

const Img = styled.img`
    width: 175px;
    border-radius: 100%;
    background-position: 50% 50%;
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