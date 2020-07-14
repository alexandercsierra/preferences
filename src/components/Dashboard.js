import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import List from './List'
import ListName from './ListName'
import Modal from './Modal'
import {axiosWithAuth} from './utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'


const Dashboard = ({user, setUser, setCurrentFriend}) => {

    const history = useHistory();

    const [lists, setLists] = useState([])
    const [listName, setListName] = useState('');
    const [friends, setFriends] = useState([])
    const [friend, setFriend] = useState('')
    const [isOpenList, setIsOpenList] = useState(false)
    const [isOpenFriend, setIsOpenFriend] = useState(false)
    const [whichForm, setWhichForm] = useState('')
    const [del, setDel] = useState(false)
    const [editedList, setEditedList] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState(lists)


    const handleChangeSearch = e => {
        setSearch(e.target.value)
    }

    const onSubmitSearch = e => {
        e.preventDefault()
        setFiltered(lists.filter(list=>list.name.toLowerCase().includes(search.toLowerCase())))
        setSearch("")
    }


    const handleTouch = e => {
        e.stopPropagation()
        setTimeout(()=>{setDel(!del)
        console.log('del', del)        
        },1000)
      }

    useEffect(()=>{
        if(Object.keys(user).length === 0){
            axiosWithAuth().get('/api/auth')
                .then(res=>setUser(res.data[0]))
                .catch(err=>console.log(err))
        }

        axiosWithAuth().get('/api/lists')
            .then(res=>{
                setLists(res.data)
                setFiltered(res.data)
            })
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

    const handleChangeEdit = e => {
        setEditedList(e.target.value)
    }

    const onSubmit = () => {
        // e.preventDefault()
        axiosWithAuth().post('/api/lists', {name: listName})
            .then(res=>{
                axiosWithAuth().get('/api/lists')
                .then(res=>{
                    setLists(res.data)
                    setListName('')
                })
                .catch(err=>console.log(err.message))

                })
            .catch(err=>console.log(err))
    }

    const onSubmitFriend = () =>{
        // e.preventDefault();
        console.log(friend)
        axiosWithAuth().post('/api/friends', {user: friend})
            .then(res=>setFriends([...friends, {friend_name: friend}]))
            .catch(err=>console.log(err))
    }

    const onEdit = (e) => {
        e.preventDefault();
        console.log(editedList)
    }

    const deleteFriend = (id, name) => {
        console.log('id', id)
        axiosWithAuth().delete(`/api/friends/${id}`)
            .then(res=>setFriends(friends.filter(friend=>friend.friend_name !== name)))
            .catch(err=>console.log(err))
    }

    const deleteList = (id) => {
        axiosWithAuth().delete(`/api/lists/${id}`)
            .then(res=>setLists(lists.filter(list=>list.id !== id)))
            .catch(err=>console.log(err))
    }


    return(
        <Container>
            <UserPanel>
                <TopTitleDiv>
                    <Title>Welcome {user.username}</Title>
                    <i className="fas fa-pen" onClick={()=>history.push('/profile')}></i>
                </TopTitleDiv>
                <ImgDiv>
                    <Img src={user.img_url}/>
                </ImgDiv>
                <Menus>
                    <TitleDiv>
                        <Subtitle>My Lists</Subtitle>
                        <i className="fas fa-plus-circle" onClick={()=>{
                            setWhichForm('list')
                            setIsOpenList(true)
                        }}></i>
                        <Modal isOpen={isOpenList} setIsOpen={setIsOpenList} whichForm={whichForm} handleChange={handleChange} onSubmit={onSubmit} listName={listName}/>
                    </TitleDiv>
                    <Lists>
                        {lists.map(list=>{
                            return(
                                <ListName  list={list} del={del} isEditing={isEditing} setIsEditing={setIsEditing} deleteList={deleteList} onEdit={onEdit} editedList={editedList} handleChangeEdit={handleChangeEdit} handleTouch={handleTouch}setDel={setDel}/>
                                // <FriendDiv>
                                //     <ListNames key={list.id} onTouchStart={handleTouch} onContextMenu={(e)=> e.preventDefault()}>{list.name}</ListNames>
                                //     {del && <i className="fas fa-pen" onClick={()=>setIsEditing(!isEditing)}></i>}
                                //     {del && <i className="fas fa-times-circle" onClick={()=>deleteList(list.id)}></i>}
                                //     {isEditing && <form onSubmit={onEdit}> 
                                //         <Input placeholder="name" name="name" value={editedList} onChange={handleChangeEdit}/>    
                                //         <Button>Edit</Button> 
                                //     </form>}
                                // </FriendDiv>

                            )
                        })}
                    </Lists>
                </Menus>
                <Menus>
                <TitleDiv>
                        <Subtitle>My Friends</Subtitle>
                        <i className="fas fa-plus-circle" onClick={()=>{
                            setWhichForm('friend')
                            setIsOpenFriend(true)
                        }}></i>
                        <Modal isOpen={isOpenFriend} setIsOpen={setIsOpenFriend} whichForm={whichForm} handleChangeFriend={handleChangeFriend} friend={friend} onSubmitFriend={onSubmitFriend}/>
                    </TitleDiv>
                    <Lists>
                        {friends.map(friend=>{
                            return (
                                <FriendDiv>
                                    <ListNames onClick={()=>{
                                        setCurrentFriend(friend.friend_id)
                                        history.push(`/friend/${friend.friend_name}`)
                                    }} key={friend.friend_id}>{friend.friend_name}</ListNames>

                                    <i className="fas fa-times-circle" onClick={()=>deleteFriend(friend.friend_id, friend.friend_name)}></i>

                                </FriendDiv>
                            )
                        })}
                    </Lists>
                </Menus>
            </UserPanel>
            <ListContainer>
                <SearchFormDiv>
                    <Title>Search</Title>
                    <SearchDiv>
                        <Form onSubmit={onSubmitSearch}>
                            <SearchBar onChange={handleChangeSearch} placeholder='search' value={search}/>
                            <SubmitButton>Submit</SubmitButton>
                        </Form>
                    </SearchDiv>
                    <Button onClick={()=>setFiltered(lists)}>See All</Button>
                </SearchFormDiv>
                {filtered.map(list=><List key={list.id} list={list} isFriend={false}/>)}
            </ListContainer>
        </Container>
    )
}

export default Dashboard

const Container = styled.div`
    display: flex;
    margin-bottom: 5%;
    @media(max-width: 970px){
        flex-direction: column;
    }
`;

const SearchFormDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const TopTitleDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media(max-width: 970px){
        margin-top: 10vh;
    }
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
    @media(max-width: 970px){
        width: 100%;
        height: auto;
        margin-bottom: 20%;
    }
`;

const UserPanel = styled.div`
    background: #f1f1f1;
    color: #111725;
    height: 100vh;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(max-width: 970px){
        width: 100%;
        height: auto;
    }
`;

const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    margin: 6% 0;
    // border: 1px solid red;
    @media(max-width: 1000px){
        font-size: 1rem;
    }
    @media(max-width: 630px){
        font-size: 1.5rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.5rem;
    align-self: flex-start;
    margin: 2%;
    font-weight: 700;
`;

const ImgDiv = styled.div`
    margin-bottom: 15%;
    width: 175px;
    height: 175px;
    // border: 1px solid red;
    box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
    overflow: hidden;
    border-radius: 100%;
`;

const Img = styled.img`
    // width: 175px;
    // border-radius: 50%;
    background-size: cover;
    background-position: 50% 50%;
    // height: 175px;
    // margin: 8% 0;
`;

const Menus = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 75%;
`;

const Lists = styled.div`
    margin: 5% 15%;
    width: 100%;
`;

const ListNames = styled.p`
    // border: 1px solid red;
    font-size: 1.2rem;
    width: 80%;
    padding: 4%;
    margin: 0;
`;

const FriendDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid red;
    padding: 0;
`;

const SearchBar = styled.input`
    width: 70%;
    margin-bottom: 6%;
    padding: 4%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: none;
`;

const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: 1px solid #111725;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;
    border: none;

`;

const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const SubmitButton = styled.button`
    width: 20%;
    padding: 2%;
    margin-bottom: 6%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    `;
