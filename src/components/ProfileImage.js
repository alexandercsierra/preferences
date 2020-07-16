import React from 'react'
import {ImgDiv} from '../styles/ProfileImageStyles'

const ProfileImage = ({image}) => {

    return <ImgDiv style={{
        backgroundImage:`url('${image}')`, position: 'fixed', top: '0', right: '0', marginRight: '1vh', marginTop: '.5vh'
    }} 
    ></ImgDiv>
}

export default React.memo(ProfileImage)

