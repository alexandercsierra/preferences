import React, {useState} from 'react'
import styled from 'styled-components'

const List = () => {

    const [items, setItems] = useState([
        {
            amount: 2,
            name: 'Chalupa Supreme'
        },
        {
            amount: 1,
            name: 'Soft Taco'
        },
        {
            amount: 1,
            name: 'Cheesy Potato Griller'
        }
    ])


    return(
        <Container>
            <Title>🔔 Taco Bell</Title>
            {items.map(item=>{
                return <ItemsDiv>
                    <Amount>{`${item.amount} x`}</Amount>
                    <ItemName>{item.name}</ItemName>
                </ItemsDiv>
            })}
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