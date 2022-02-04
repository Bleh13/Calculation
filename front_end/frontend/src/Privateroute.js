import React from "react"
import {  Navigate } from "react-router-dom"
import { useAuthState } from "./authcontext"

export default function PrivateRoute({ children }) {
  const { User } = useAuthState()
  console.log(User)

  return (

    User ? children : <Navigate to="/login" />
      
    
  )
}
