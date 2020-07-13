import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from './utils/axiosWithAuth'
import styled from 'styled-components'

const Profile = ({user, setUser}) => {

    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: user.name,
        email: user.email,
        img_url: user.img_url
    })

    const [img, setImg] = useState({
        img_url: user.img_url
    })

    useEffect(()=>{
        if(Object.keys(user).length === 0){
            axiosWithAuth().get('/api/auth')
                .then(res=>setUser(res.data[0]))
                .catch(err=>console.log(err))
        }
    },[])


    const handleChange = e => {
        setImg({
            img_url: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        axiosWithAuth().put('/api/auth/img_url', img)
            .then(res=>{
                setUser({
                    ...user,
                    img_url:res.data[0]
                })
                setIsEditing(false)
            })
            .catch(err=>console.log(err))
    }

    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Profile</h1>
            <div style={{textAlign: 'center', margin: '4% 0'}}>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
            </div>
            <div style={{width: '50%'}}>
                <img src={user.img_url}/>
            </div>
            <ButtonDiv>
                <Button onClick={()=>setIsEditing(!isEditing)} style={{width: '100%'}}>Edit Profile Picture</Button>
            </ButtonDiv>
            <div>
                {isEditing && <form onSubmit={onSubmit}>
                    {/* <input name="name" placeholder="name" onChange={handleChange} value={profile.name}/> */}
                    {/* <input name="email" placeholder="email" onChange={handleChange} value={profile.email}/> */}
                    <Input name="img_url" placeholder="img_url" onChange={handleChange} value={img.img_url}/>
                    <Button>Save Changes</Button>
                </form>}
            </div>
        </div>
    )
}

export default Profile

const ButtonDiv = styled.div`
    width: 30%;
    margin: 4% 0;
    @media(max-width: 700px){
        width: 50%;
    }
`;

const Button = styled.button`
    background: #f1f1f1;
    padding: 2%;
    border: 1px solid #111725;
    border-radius: 5px;
    color: #111725;
    font-weight: 800;

`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 6%;
    padding: 4%;
    border-radius: 10px;
`;