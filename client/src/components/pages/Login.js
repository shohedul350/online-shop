import React, { useState, useContext, useEffect,Fragment } from "react";
import {Link} from 'react-router-dom'
import AuthContext from "../../context/authContext/authContext";

const Login = (props) => {
  const {loginUser,userAuth,errors,setError,clearError} = useContext(AuthContext);
  useEffect(()=>{
    if(userAuth){
props.history.push('/')
    }
  },[userAuth,props.history])
  const [formData,setFormData]=useState({
          email:"",
          password:"",
       
      });
 const {email,password}=formData

const onSubmit=e=>{
    e.preventDefault();
    loginUser({email, password});
    clearError()
    }


const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value}); clearError()}
    return <Fragment>

<div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center display-6">Login Here</h1>
          <form onSubmit={e=>onSubmit(e)}>
           
            <div className="form-group">
              <label htmlFor="email"> Email: </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                name="email"
                value={email}
                onChange={e=> onChange(e)}
              />
             
            </div>
            <div className="form-group">
              <label htmlFor="password"> Password: </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={e=> onChange(e)}
              />
            </div>

            <div className="question">
              {errors !== null && <button className="danger">
              {errors.msg ? errors.msg : errors.errors[0].msg}
                 <span onClick={()=>clearError()}>X</span>
              </button>
                }
            </div>
            <Link to="/register" className="text-primary">Don no have Account? Register Here</Link>
            <button className="btn btn-primary my-3 d-block">login</button>
          </form>
        </div>
      </div>
    

    </Fragment>
  
}

export default Login