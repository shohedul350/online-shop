import React,{useContext,Fragment} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/authContext/authContext'

const Navbar = () => {

  const {logout,clearError,userAuth,user}=useContext(AuthContext)
  const onLogout=()=>{
    logout();
    clearError()
  
  }


  const userLinks=(
    <Fragment>
    

      <li className="nav-item active">
      <span className="sm-hide nav-link"> {user && user.name}   |</span>
      </li>

       <li className="nav-item active">
          <Link to='/' onClick={onLogout} className="nav-link">
            Logout
            <i className="fas fa-sign-out-alt"></i>
          </Link>
       </li>

    </Fragment>
  )


  const authLinks=(
    <Fragment>
   <li className="nav-item active ">
     <Link to='/register' className="nav-link">Register</Link>
   </li>
  

   <li className="nav-item active">
     <Link to='/login' className="nav-link">Login</Link>
   </li>
      
    </Fragment>
  )
  return (
   
   



  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
  <Link to='/' className="navbar-brand"><i className='fas fa-glass-cheers' /> </Link>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
           

         <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ">
                <li className="nav-item active  " > <Link className="nav-link" to='/'>
                    Home<span className="sr-only">(current)</span></Link>
                </li>
           </ul>
        
          <ul className="navbar-nav">

                   {userAuth ? userLinks : authLinks}
         </ul>
        
    
  </div>
</nav>



  )
}

export default Navbar