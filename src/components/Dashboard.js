import React, {useState, useEffect} from 'react'
import List from './List'
import ListName from './ListName'
import Modal from './Modal'
import {axiosWithAuth} from './utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'
import ep from '../img/extrapickles.png'
import {ImgDiv, Container, BannerDiv, Banner, SearchFormDiv, TopTitleDiv, TitleDiv, ListContainer, UserPanel, Title, Subtitle, Menus, Lists, ListNames, FriendDiv, SearchBar, Button, SearchDiv, Form, SubmitButton} from '../styles/DashboardStyles'



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

        let isMounted = true;


        if(Object.keys(user).length === 0){
            axiosWithAuth().get('/api/auth')
                .then(res=>{
                    if(isMounted){
                        setUser(res.data[0])
                    }
                    
                })
                .catch(err=>console.log(err))
        }

        axiosWithAuth().get('/api/lists')
            .then(res=>{
                if(isMounted){
                    setLists(res.data)
                    setFiltered(res.data)
                }
                
            })
            .catch(err=>console.log(err))

        axiosWithAuth().get('/api/friends')
            .then(res=>{
                if(isMounted){
                    setFriends(res.data)
                }
            })
            .catch(err=>console.log(err))

        return () => {isMounted = false}

    },[user, setUser])

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
                    console.log('list data', res.data)
                    setLists(res.data)
                    setFiltered(res.data)
                    setListName('')
                })
                .catch(err=>console.log(err.message))
                // setListName('')
                })
            .catch(err=>console.log(err))
    }

    const onSubmitFriend = () =>{
        // e.preventDefault();
        console.log(friend)
        axiosWithAuth().post('/api/friends', {user: friend})
            .then(res=>{
                setFriends([...friends, {friend_name: friend, friend_id: res.data.id}])
                console.log('friend res', res)
                setCurrentFriend(res.data.id)
            })
            .catch(err=>console.log(err))
    }

    const onEdit = (e) => {
        e.preventDefault();
        axiosWithAuth().get('/api/lists')
            .then(res=>{
                console.log('new lists', res.data)
                setLists(res.data)
                setFiltered(res.data)
            })
            .catch(err=>console.log(err))
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
                <BannerDiv>
                    <Banner src={ep}/>
                </BannerDiv>
            <UserPanel>
                <TopTitleDiv>
                    <i className="fas fa-pen" onClick={()=>history.push('/profile')}></i>
                    <Title>Welcome {user.username}</Title>
                    <ImgDiv style={{backgroundImage: `url('${user.img_url}')`}}></ImgDiv>
                </TopTitleDiv>
                <Menus>
                    <TitleDiv style={{marginTop: '10%'}}>
                        <Subtitle onClick={()=>{setDel(!del)}}>My Lists</Subtitle>
                        <i className="fas fa-plus-circle" onClick={()=>{
                            setWhichForm('list')
                            setIsOpenList(true)
                        }}></i>
                        <Modal isOpen={isOpenList} setIsOpen={setIsOpenList} whichForm={whichForm} handleChange={handleChange} onSubmit={onSubmit} listName={listName}/>
                    </TitleDiv>
                    <Lists>
                        {lists.map(list=>{
                            return(
                                <ListName  key={list.id} list={list} del={del} isEditing={isEditing} setIsEditing={setIsEditing} deleteList={deleteList} onEdit={onEdit} editedList={editedList} handleChangeEdit={handleChangeEdit} handleTouch={handleTouch}setDel={setDel}/>
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
                                <FriendDiv key={friend.friend_id}>
                                    <ListNames onClick={()=>{
                                        setCurrentFriend(friend.friend_id)
                                        history.push(`/friend/${friend.friend_name}`)
                                    }}>{friend.friend_name}</ListNames>

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
                {filtered.map(list=><List key={list.id} list={list} isFriend={false} setLists={setLists} lists={lists} setFiltered={setFiltered} filtered={filtered}/>)}
            </ListContainer>
        </Container>
    )
}

export default Dashboard