import React,{useReducer} from 'react'
import axios from 'axios'
import AuthContext from '../authContext/authContext'
import AuthReducer from '../authContext/authReducer'
import setToken from '../../utils/setToken'
import {
    SUCCES_REGISTER,
    SUCCES_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
     SET_ERROR,
    CLEAR_ERROR,
    LOG_OUT,
    SET_USER,
    
} from '../type'

 const AuthState=(props)=> {

    const initialState={
        user:null,
        userAuth:null,
        errors:null,
        registerSuccess:false,
    }

    const [state,dispatch]=useReducer(AuthReducer,initialState)

// get user

 const getUser= async ()=>{
    if(localStorage.token){
        setToken(localStorage.token)
      }

      try{
          const res=await axios.get('/user')

          dispatch({
              type:SET_USER,
              payload:res.data
          })

      }catch (err){

        console.log(err)
         dispatch({
             type:SET_ERROR,
             payload:err
         })
      }
 }

    //register
const registerUser = async userData=>{
const config={
    header:{
        'Content-Type':'application/json'
    }
}
try{
    const res=await axios.post('/user/register',userData,config)
    dispatch({
type:SUCCES_REGISTER,
payload:res.data
    })

}catch (err){  
    
   dispatch({
       type:FAIL_REGISTER,
       payload:err.response.data
   })
}
}


  
    //Login
    const loginUser=async userData=>{
        const config={
            header:{
                'Content-Type':'application/json'
            }
        }
        try{
            const res=await axios.post('/user/login',userData,config)
            dispatch({
        type:SUCCES_LOGIN,
        payload:res.data
            })
        
        }catch (err){
            
           dispatch({
               type:FAIL_LOGIN,
               payload:err.response.data
           })
        }

        }

        // log out

        const logout=()=>{
            dispatch({
                type:LOG_OUT
            })
        }
        //set error
        const setError= err=>{
            dispatch(
                {
                    type:SET_ERROR,
                    payload:err
                }
            )
        }
         //clear error
        const clearError=()=>{
            dispatch(
                {
                    type:CLEAR_ERROR,
                    
                }
            )
        }
    
    return (
        <AuthContext.Provider value={{
         user:state.user,
        userAuth:state.userAuth,
        getUser,
        errors:state.errors,
        registerUser,
        loginUser,
        logout,
        setError,
        clearError,
        registerSuccess:state.registerSuccess
       


    }}>
       {props.children}
    </AuthContext.Provider>
    )
}

export default AuthState;