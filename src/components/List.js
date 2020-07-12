import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {axiosWithAuth} from './utils/axiosWithAuth'

const List = ({list, isFriend}) => {

    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 1
    })
    const [isAdding, setIsAdding] = useState(false)

    useEffect(()=>{
        axiosWithAuth().get(`/api/items/${list.id}`)
            .then(res=>setItems(res.data))
            .catch(err=>console.log(err))

        console.log('called')
    },[list])

    const handleChange = e => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit = e => {
        e.preventDefault()
        console.log(newItem)
        axiosWithAuth().post(`/api/items/${list.id}`, newItem)
            .then(res=>{
                console.log('post', res.data)
                let modifiedItem = {...newItem}
                modifiedItem.item_name = newItem.name
                setItems([...items, modifiedItem])
                setNewItem({
                    name:'',
                    quantity: 1
                })
            })
            .catch(err=>console.log(err))
    }

    return(
        <Container>
            <Title>{list.name}</Title>
            <ItemsDiv style={{flexDirection: 'column'}}>

            {items.map(item=>{
                return <ItemsDiv key={item.item_name}>
                    <Amount>{`${item.quantity} x`}</Amount>
                    <ItemName>{item.item_name}</ItemName>
                </ItemsDiv>
            })}
                {!isFriend && <button onClick={()=>setIsAdding(!isAdding)}>Add an Item</button>}
                {isAdding && <form onSubmit={onSubmit}> 
                <input placeholder="name" name="name" value={newItem.name} onChange={handleChange}/>    
                <input placeholder="quantity" name="quantity" value={newItem.quantity} onChange={handleChange}/>   
                <button>Add</button> 
            </form>}
            </ItemsDiv>
        </Container>
    )
}

export default List

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;
    flex-direction: column;
    width: 60%;
    margin: 0 auto;
`;

const Title = styled.h1`
    color: #f1f1f1;
    text-align: center;
    margin: 4% 0;
`;

const ItemsDiv = styled.div`
    background : #f1f1f1;
    color: #111725;
    width: 90%;
    margin: 0 auto;
    // border-radius: 10px;
    display: flex;
    justify-content: space-around;
    padding: 4%;
`;

const Amount = styled.p`
    width: 50%;
`;

const ItemName = styled.p`
    width: 50%;
`;