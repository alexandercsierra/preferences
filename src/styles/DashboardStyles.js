import styled from 'styled-components'

export const ImgDiv = styled.div`
// margin-bottom: 15%;
width: 125px;
height: 125px;
// border: 1px solid red;
background-size: cover;
background-position: 50% 50%;
box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
overflow: hidden;
border-radius: 100%;
@media(max-width: 970px){
    display: none;
}
`;

export const Container = styled.div`
    display: flex;
    margin-bottom: 5%;
    @media(max-width: 970px){
        flex-direction: column;
    }
`;

export const BannerDiv = styled.div`
    margin: 0 auto;
    width: 400px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    @media(max-width: 970px){
        display: none;
    }
`;

export const Banner = styled.img`

`;

export const SearchFormDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

export const TopTitleDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    padding: 2% 0;
    @media(max-width: 970px){
        margin-top: 10vh;

    }
`;

export const TitleDiv = styled.div`
    display: flex;
    // justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ListContainer = styled.div`
    width: 60%;
    // height: 100vh;
    @media(max-width: 970px){
        width: 100%;
        height: auto;
        margin-bottom: 20%;
    }
`;

export const UserPanel = styled.div`
    background: #f1f1f1;
    color: #111725;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(max-width: 970px){
        width: 100%;
        height: auto;
    }
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    margin: 6% 2%;

    @media(max-width: 1000px){
        font-size: 1rem;
    }
    @media(max-width: 630px){
        font-size: 1.5rem;
        // width: 25%;
    }
`;

export const Subtitle = styled.p`
    font-size: 1.5rem;
    align-self: flex-start;
    margin: 2%;
    font-weight: 700;
`;


export const Menus = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 75%;
    // border: 1px solid red;
`;

export const Lists = styled.div`
    margin: 5% 15%;
    width: 100%;
`;

export const ListNames = styled.p`
    // border: 1px solid red;
    font-size: 1.2rem;
    width: 80%;
    padding: 4%;
    margin: 0;
`;

export const FriendDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid red;
    padding: 0;
`;

export const SearchBar = styled.input`
    width: 70%;
    margin-bottom: 6%;
    padding: 4%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: none;
`;

export const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: 1px solid #111725;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;
    border: none;

`;

export const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 50%;
    @media(max-width: 970px){
        width: 100%;

    }
`;

export const Form = styled.form`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const SubmitButton = styled.button`
    width: 20%;
    padding: 2%;
    margin-bottom: 6%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    `;