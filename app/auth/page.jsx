"use client"
import React, { useState } from 'react'
import Login from './login/Login';
import Signup from './signup/Signup';
import { useAuth } from '../context/AuthContext';

function Auth() {
    const {isLoginPageInWidow} = useAuth()
  return (
    <div>
      {
        isLoginPageInWidow ?
        (
            <Login/>
        )
        :
        (
            <Signup/>
        )
      }
    </div>
  )
}

export default Auth
