import React from 'react'
import { signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider  } from 'firebase/auth'
import { useState } from 'react'
import { useAuthState } from './authcontext'
import { useNavigate } from 'react-router-dom'
import {getAuth} from "firebase/auth";
import { auth } from './firebaseconfig'
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'



export default function Login  ()  {
  
  const [loginemail, setemail] = useState("")
  const [loginpassword, setpassword] = useState("")
  const navigate=useNavigate()
  const{LoginWithGoogle} = useAuthState()
  const provider = new GoogleAuthProvider();
  

    async function Loginuser (e){
     e.preventDefault();
      try{
      const userfirebase= await signInWithEmailAndPassword(getAuth(),loginemail,loginpassword);
      console.log(userfirebase);
      
      }
      catch(error){console.log(error)}
     finally{
     setpassword("")
     setemail("")
  navigate("/dashboard");
   }

  }

  async function  Loginwithgoogle() {
    await LoginWithGoogle() 
    navigate("/dashboard")
  }
  
         return (
          <div>

<Paper variant="elevation" elevation={10}  square={false} sx={{ width: 500, color: 'primary.main', my: "auto",mx:"auto"}} onSubmit={Loginuser} >
  <br></br>
  <h1 align="center">Login</h1>
<Grid container spacing={2} alignItems="center" justify="center" direction="column" >
  <Grid item xs>
    <FormControl variant="standard"  required="true">
  <InputLabel htmlFor="component-simple">Email</InputLabel>
  <Input id="email" value={loginemail} onChange={(e)=>{setemail(e.target.value)}} />
</FormControl>
  </Grid>
  <Grid item xs={6}>
    <FormControl variant="standard"  required="true">
  <InputLabel htmlFor="component-simple">Password</InputLabel>
  <Input id="password" value={loginpassword} onChange={(e)=>{setpassword(e.target.value)}} />
</FormControl>
  </Grid>
  <br></br>
<FormControl variant="standard"  required="true">
<Button variant="contained" >
  LOGIN
</Button>
</FormControl>
<br></br>
<FormControl variant="standard"  required="true">
<Button variant="contained"  onClick={Loginwithgoogle} >
  Loginpwithgoogle
</Button>
</FormControl>
</Grid>
<br></br>
</Paper>
 </div>
         )
     }
 