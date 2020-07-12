import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {axiosWithAuth} from './utils/axiosWithAuth'
import Item from './Item'

const List = ({list, isFriend}) => {

    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 1
    })
    const [isAdding, setIsAdding] = useState(false)
    const [btnText, setBtnText] = useState('Add an Item')

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

    const deleteItem = (id) => {
        axiosWithAuth().delete(`/api/items/${id}`)
            .then(res=>{
                setItems(items.filter(item=>item.item_id !== id))
            })
            .catch(err=>console.log(err))
    }

    return(
        <Container>
            <Title>{list.name}</Title>
            <ItemsDiv style={{flexDirection: 'column'}}>

            {items.map(item=>{
                return <Item isFriend={isFriend} item={item} deleteItem={deleteItem}/>
                // return <ItemsDiv key={item.item_name}>
                //     <Amount>{`${item.quantity} x`}</Amount>
                //     <ItemName>{item.item_name}</ItemName>
                //     <i className="fas fa-times-circle" onClick={()=>deleteItem(item.item_id)}></i>
                // </ItemsDiv>
            })}
                {!isFriend && <Button style={{margin: '4% auto', width: '50%'}} onClick={()=>{
                    setIsAdding(!isAdding)

                    if(isAdding){
                        setBtnText('Add an Item')
                    } else{
                        setBtnText('Done adding')
                    }
                }}>{btnText}</Button>}
                {isAdding && <form onSubmit={onSubmit}> 
                <Input placeholder="name" name="name" value={newItem.name} onChange={handleChange}/>    
                <Input type="number" placeholder="quantity" name="quantity" value={newItem.quantity} onChange={handleChange}/>   
                <Button>Add</Button> 
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
    @media(max-width: 970px){
        width: 80%;
    }
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

const Input = styled.input`
    width: 100%;
    margin-bottom: 6%;
    padding: 4%;
    border-radius: 10px;
`;

const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: 1px solid #111725;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;

`;