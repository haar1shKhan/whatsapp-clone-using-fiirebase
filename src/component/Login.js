import { Button } from '@mui/material'
import React from 'react'
import {auth, provider} from './firebase'

import '../Login.css'
import { useStateProvide } from './StateProvide'
import { actionType } from '../reducer'
const Login = () => {

    const [{user}, dispatch] = useStateProvide()

    const signIn = ()=>{
        auth.signInWithPopup(provider).then(res=>
          dispatch({
          type:actionType.SET_USER,
          user:res.user
        })).catch((err)=>console.log(err.message))
    }

  return (
    <div className='login'>
      <div className='login__container'>

        <div className='login__text'>
            <h1>login to WChat</h1>
        </div>
        
        <Button onClick={signIn}>
            Sign in  with Google
        </Button>

      </div>
    </div>
  )
}

export default Login
