import React,{useContext} from 'react'
import  AuthContext from '../context/authContext/authContext'
import {Route,Redirect} from 'react-router-dom'

const PrivatetRoute=({component: Component, ...rest})=>{
    const {userAuth}=useContext(AuthContext)
    return(
   <Route
   {...rest}
   render={props=> !userAuth ? (<Redirect to='/login'/>) : (<Component {...props} />)}
   
   />
    )
    
}

export default PrivatetRoute