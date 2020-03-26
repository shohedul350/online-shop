import React,{Fragment,useState,useContext,useEffect} from 'react'
import AuthContext from "../../context/authContext/authContext";
import {Link} from 'react-router-dom'


 const Register = (props) => {

    const {registerUser,registerSuccess,errors,setError,clearError} = useContext(AuthContext);


      useEffect(()=>{
        if(registerSuccess){
           props.history.push('/login')
        }
      },[registerSuccess,props.history])

    const [formData,setFormData]=useState({
         name:"",
         email:"",
          password:"",
          password2:""
      });
 const {name,email,password,password2}=formData

const onSubmit=e=>{
  e.preventDefault();
    if (password !== password2) {
     setError({msg:"password don't match"})
 
   } else {
     registerUser({ name,email, password });
     clearError()
   }
}

const onChange=e=>{
setFormData({...formData,[e.target.name]:e.target.value})
 clearError()
}
    return <Fragment>

<div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center display-6">Register Here</h1>
          <form onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="name"> Name: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={e=> onChange(e)}
  
              />
        
            </div>
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

            <div className="form-group">
              <label htmlFor="password2"> Confrim Password: </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                name="password2"
                value={password2}
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
            
            <Link to="/login" className="text-primary">Already Have Account? Login Here</Link>

            <button className="btn btn-primary my-3 d-block">Register</button>
          </form>
        </div>
      </div>

    </Fragment>
}

export default Register