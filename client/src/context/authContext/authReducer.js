import {
    SUCCES_REGISTER,
    SUCCES_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
    SET_ERROR,
    CLEAR_ERROR,
    LOG_OUT,
    SET_USER,
    AUTH_ERROR
} from '../type'



export default (state,action)=>{
    switch(action.type){

        case SET_USER:
            return{
                ...state,
                user:action.payload,
                userAuth:true,
                errors:null
            }
        case SUCCES_REGISTER:
            return{
                ...state,
                registerSuccess:true,
                errors:null
            }
        case SUCCES_LOGIN:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                userAuth:true,
                errors:null
            }

        case FAIL_LOGIN:
        case FAIL_REGISTER:
        case AUTH_ERROR:
        case LOG_OUT:
            localStorage.removeItem('token')
              return{
                  ...state,
                  user:null,
                  userAuth:null,
                  registerSuccess:false,
                  errors:action.payload
              }
            case SET_ERROR:
                return{
                    ...state,
                    errors:action.payload
                }
             case CLEAR_ERROR:
                 return{
                     ...state,
                     errors:null
                 }

             
        

        default:
            return state
    }
}