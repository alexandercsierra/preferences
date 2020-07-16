import React from 'react'
import Loader from 'react-loader-spinner'

export default class Loading extends React.Component {
 //other logic
   render() {
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h2>Loading</h2>
            <Loader type="ThreeDots" color="#f1f1f1" height={80} width={80} />
        </div>
    );
   }
}

