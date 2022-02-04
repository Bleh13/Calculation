import React from 'react'
import { useAuthState } from './authcontext';
import { useNavigate } from 'react-router-dom'

export default function Signout() {
    const navigate=useNavigate()

    const {Logout}=useAuthState();
    const logoutuser= async ()=>{
    await Logout();

    navigate('/login')
    }
    return (
        <div>
           <button type="button" class="btn btn-primary" onClick={logoutuser}>Signout </button> 
        </div>
    )
}
