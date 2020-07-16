import styled from 'styled-components';


export const ButtonDiv = styled.div`
    width: 30%;
    margin: 4% 0;
    @media(max-width: 700px){
        width: 50%;
    }
`;

export const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: 1px solid #111725;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;

`;

export const Input = styled.input`
    width: 100%;
    margin-bottom: 6%;
    padding: 4%;
    border-radius: 10px;
`;