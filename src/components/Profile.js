import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from './utils/axiosWithAuth'

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
        <div>
            <h1>Profile</h1>
            <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
            </div>
            <div>
                <img src={user.img_url}/>
            </div>
            <div>
                <button onClick={()=>setIsEditing(!isEditing)}>Edit Profile</button>
            </div>
            <div>
                {isEditing && <form onSubmit={onSubmit}>
                    {/* <input name="name" placeholder="name" onChange={handleChange} value={profile.name}/> */}
                    {/* <input name="email" placeholder="email" onChange={handleChange} value={profile.email}/> */}
                    <input name="img_url" placeholder="img_url" onChange={handleChange} value={img.img_url}/>
                    <button>Save Changes</button>
                </form>}
            </div>
        </div>
    )
}

export default Profile