import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const InstructionCard = ({title}) => {
    return(
        <OuterSquare>
            {/* <InnerSquare> */}
                {title === "Signup" && <Link to="/signup"><Title>{title}</Title></Link>}
                {title !== "Signup" && <Title>{title}</Title>}
            {/* </InnerSquare> */}
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

const InnerSquare = styled.div`
    background: #111725;
    height: 27vh;
    width: 27vh;
    // width: 10%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    // align-items: center;
    @media(max-width: 970px){
        width: 90%;
        margin: 4% auto;
    }
`;

const Title = styled.h1`
    color: #043d12;
`;