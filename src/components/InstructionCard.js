import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const InstructionCard = ({title}) => {
    return(
        <OuterSquare>
                {title === "Signup" && <Link to="/signup"><Title>{title}</Title></Link>}
                {title !== "Signup" && <Title>{title}</Title>}
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
    @media(max-width: 970px){
        width: 50%;
        margin: 4% auto;
    }
    @media(max-width: 550px){
        width: 80%;
    }
`;

const Title = styled.h1`
    color: #043d12;
`;