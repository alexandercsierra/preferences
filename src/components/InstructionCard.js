import React from 'react'
import styled from 'styled-components'

const InstructionCard = ({title}) => {
    return(
        <OuterSquare>
            <InnerSquare>
                <Title>{title}</Title>
            </InnerSquare>
        </OuterSquare>
    )
}

export default InstructionCard

const OuterSquare = styled.div`
    background: #f1f1f1;
    height: 30vh;
    width: 30%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InnerSquare = styled.div`
    background: #111725;
    height: 27vh;
    width: 27vh;
    // width: 10%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    // align-items: center;
`;

const Title = styled.h1``;