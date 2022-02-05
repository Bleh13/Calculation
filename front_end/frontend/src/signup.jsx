import React from 'react'
import axios from 'axios'
import { auth } from './firebaseconfig';
import { useAuthState } from './authcontext'
import { createUserWithEmailAndPassword, GoogleAuthProvider  } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate,Navigate } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'



 export default function Signup  ()  {
  const {Googlesignup} = useAuthState();
  const{CreateUser} = useAuthState();
  const [registername, setname] = useState("")
  const [registeremail, setemail] = useState("")
  const [registerphone, setphonenumber] = useState("+91")
  const [registerpassword, setpassword] = useState("")

  const navigate=useNavigate()
  const provider = new GoogleAuthProvider();


   async function  signinwithgoogle() {
     
   await Googlesignup()
   navigate("/dashboard")
    
  }
  
    async function Register (e){
     e.preventDefault();
     await CreateUser(registername,registeremail,registerphone,registerpassword);
     navigate("/dashboard");
     setname("")
     setpassword("")
     setphonenumber("+91 ")
     setemail("")
  }
         return (
             <div>
              <h1>bleh</h1>
                 {/* <form class="container text-primary bg-light position-absolute top-50 start-50 translate-middle" onSubmit={Register} >
   <div class="mb-3 ">
    
     <label for="exampleInputEmail1" className="form-label">Email address</label>
     <input type="email" className="form-control" id="email" value={registeremail} aria-describedby="emailHelp" onChange={(e)=>{setemail(e.target.value)}} />
     
   </div>
   <div class="mb-3">
     <label for="exampleInputPassword1" className="form-label">Password</label>
     <input type="password" className="form-control" id="password" value={registerpassword} onChange={(e)=>{setpassword(e.target.value)}}/>
   </div>
   <div class="mb-3">
     <label for="exampleInputname" className="form-label">Name</label>
     <input type="text" className="form-control" id="name" value={registername} onChange={(e)=>{setname(e.target.value)}}/>
   </div>
   <div class="mb-3">
     <label for="exampleInputname" className="form-label">Phonenumber</label>
     <input type="integer" className="form-control" id="phonenumber" value={registerphone} onChange={(e)=>{setphonenumber(e.target.value)}}/>
   </div>
   
   
   <button type="submit" className="btn btn-primary" >Submit</button>
 
  <div className='mb-3'>
    <br></br>
  <button type="button" className='btn btn-primary' onClick={signinwithgoogle}>signupwithgoogle</button>
  </div>
  <div className='mb-3'>
  <Link to ="/signupwithphoneno" class="nav-link" > <button type="button" className='btn btn-primary' >signupwithphonenumber</button> </Link>
  </div>

</form>    */}
<Paper variant="elevation" elevation={10}  square={false} sx={{ width: 500, color: 'primary.main', my: "auto",mx:"auto"}} onSubmit={Register} >
  <br></br>
  <h1 align="center">Signup</h1>
<Grid container spacing={2} alignItems="center" justify="center" direction="column" >
  <Grid item xs>
    <FormControl variant="standard"  required="true">
  <InputLabel htmlFor="component-simple">Email</InputLabel>
  <Input id="email" value={registeremail} onChange={(e)=>{setemail(e.target.value)}} />
</FormControl>
  </Grid>
  <Grid item xs={6}>
    <FormControl variant="standard"  required="true">
  <InputLabel htmlFor="component-simple">Name</InputLabel>
  <Input id="name" value={registername} onChange={(e)=>{setname(e.target.value)}} />
</FormControl>
  </Grid>
  <Grid item xs={6}>
    <FormControl variant="standard"  required="true">
  <InputLabel htmlFor="component-simple">Password</InputLabel>
  <Input id="password" value={registerpassword} onChange={(e)=>{setpassword(e.target.value)}} />
</FormControl>
  </Grid>
  <Grid item xs={6}>
    <FormControl variant="standard"  required="true">
  <InputLabel htmlFor="component-simple">Phone</InputLabel>
  <Input id="phonenumber" value={registerphone} onChange={(e)=>{setphonenumber(e.target.value)}} />
</FormControl>
  </Grid>
  <br></br>
<FormControl variant="standard"  required="true">
<Button variant="contained" onClick={Register} >
  Submit
</Button>
</FormControl>
<br></br>
<FormControl variant="standard"  required="true">
<Button variant="contained"  onClick={signinwithgoogle} >
  Signupwithgoogle
</Button>
</FormControl>
</Grid>
<br></br>
</Paper>
</div>
         )
     }
 



