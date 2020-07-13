import React, {useState} from 'react';
import styled from 'styled-components'

const Item = ({isFriend, item, deleteItem}) => {

    const [del, setDel] = useState(false)

    const handleTouch = e => {
        e.stopPropagation()
        setTimeout(()=>{setDel(!del)
        //   if(!del){
        //     setEventClass('deleting')
        //     setDelClass('show')
        //   } else {
        //     setEventClass('')
        //     setDelClass('hide')
        //   }
    
        console.log('del', del)        
        },1000)
      }






    return(
        <ItemsDiv key={item.item_name} onTouchStart={handleTouch}>
            <Amount>{`${item.quantity} x`}</Amount>
            <ItemName >{item.item_name}</ItemName>
            {!isFriend && <i className="fas fa-times-circle" onClick={()=>deleteItem(item.item_id)}></i>}
        </ItemsDiv>
    )
}

export default Item;



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