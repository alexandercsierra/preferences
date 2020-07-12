import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {axiosWithAuth} from './utils/axiosWithAuth'
import List from './List'

const FriendsList = ({currentFriend}) => {

    const {name} = useParams()

    const [lists, setLists] = useState([])

    useEffect(()=>{
        axiosWithAuth().get(`/api/lists/${currentFriend}`)
            .then(res=>setLists(res.data))
            .catch(err=>console.log(err))
    },[])


    return (
        <div>
            <h1>{name}'s Lists</h1>
            <div>
                {lists.map(list=><List key={list.id} list={list} isFriend={true}/>)}
            </div>
        </div>
    )
}

export default FriendsList;