import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {axiosWithAuth} from './utils/axiosWithAuth'
import Item from './Item'

const List = ({list, isFriend, setLists, lists, setFiltered, filtered}) => {

    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 1
    })
    const [isAdding, setIsAdding] = useState(false)
    const [btnText, setBtnText] = useState('Add an Item')
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [title, setTitle] = useState(list.name)
    


    useEffect(()=>{
        axiosWithAuth().get(`/api/items/${list.id}`)
            .then(res=>setItems(res.data))
            .catch(err=>console.log(err))

    },[list])

    const handleChange = e => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        })
    }

    const handleTitleChange = e => {
        setTitle(e.target.value)
    }

    const submitTitle = (e) => {
        e.preventDefault()

        let newList = {...list}
        newList.name = title

        axiosWithAuth().put(`/api/lists/${list.id}`, newList)
            .then(res=>{
                setIsEditingTitle(false)
                console.log('res.data', res.data)
                let filteredLists = lists.filter(thelist=> thelist.id !== list.id)
                let newList = [...filteredLists, res.data[0]]
                setLists(newList)

                let filteredFilter = filtered.filter(thelist=> thelist.id !== list.id)
                let newFilter = [...filteredFilter, res.data[0]]

                setFiltered(newFilter)
            })
            .catch(err=>console.log(err))
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
            <div id={list.id} style={{height: '50px', width: '50px'}}></div>
            <div style={{display: 'flex'}}>
                <Title>{title}</Title>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    {!isFriend && <i className="fas fa-pen" style={{color: 'white',fontSize: '1rem'}} onClick={()=>setIsEditingTitle(!isEditingTitle)}></i>}
                </div>
            </div>
            {isEditingTitle && <Form onSubmit={submitTitle}>
                <EditInput onChange={handleTitleChange} value={title}/>
                <EditButton>Submit</EditButton>
            </Form>}
            
            <ItemsDiv style={{flexDirection: 'column'}}>

            {items.map(item=>{
                return <Item isFriend={isFriend} item={item} deleteItem={deleteItem}/>
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
    margin-top: 10vh;
    @media(max-width: 970px){
        width: 80%;
    }
`;

const Title = styled.h1`
    color: #f1f1f1;
    text-align: center;
    margin: 4% 0;
    width: 90%;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
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

const Form = styled.form`
    display: flex;
    // border: 1px solid red;
    margin: 4% auto;
`;


const Input = styled.input`
    width: 100%;
    margin-bottom: 6%;
    padding: 4%;
    border-radius: 10px;
`;

const EditInput = styled.input`
    width: 70%;
    // margin-bottom: 6%;
    padding: 4%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const EditButton = styled.button`
    width: 30%;
    background: #f1f1f1;
    // padding: 2%;
    border: 1px solid #111725;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #111725;
    font-weight: 800;

`;
const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: 1px solid #111725;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;

`;
