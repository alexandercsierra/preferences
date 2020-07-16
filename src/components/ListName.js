import React from 'react'
import styled from 'styled-components'
import { HashLink as Link } from 'react-router-hash-link';

const ListName = ({list, isEditing, setIsEditing, deleteList, onEdit, editedList, handleChangeEdit, del}) => {


    return(
        <FriendDiv>
            <TheLink smooth to={`#${list.id}`} style={{margin: '0'}}>
            <ListNames key={list.id} onContextMenu={(e)=> e.preventDefault()}>{list.name}</ListNames></TheLink>
            {del && <i className="fas fa-times-circle" onClick={()=>deleteList(list.id)}></i>}
            {isEditing && <form onSubmit={onEdit}> 
                <Input placeholder="name" name="name" value={editedList} onChange={handleChangeEdit}/>    
                <Button>Edit</Button> 
            </form>}
        </FriendDiv>
    )
}

export default ListName

const TheLink = styled(Link)`
    // border: 1px solid green;
    width: 80%;
    text-decoration: none;
    color: black;

`;

const ListNames = styled.p`
    // border: 1px solid red;
    font-size: 1.2rem;
    width: 100%;
    padding: 4%;
    margin: 0;
`;

const FriendDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    // border: 1px solid red;
    padding: 0;
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