import React, { useEffect, useState} from 'react'
import {BrowserRouter,Routes,Link, Route} from "react-router-dom"
import Login from './login'
import Signin from './signup'
import Dashboad from './dashboard'
import Firebasephonesignup from './firebasephonesignup'
import { useAuthState } from './authcontext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebaseconfig'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Signout from './signout'

export default function Nav(){
const [Check, setCheck] = useState(false)

useEffect(()=>{
  onAuthStateChanged(auth,(currentuser)=>{
    if (currentuser){
      setCheck(true)
    }
    else{ setCheck(false)}
    })

},[])
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
const handleClose = () => {
  setAnchorEl(null);
};

{/* <Link class="nav-link" to="/update">update profile</Link>
 <Link class="nav-link" to="/signup">Signup</Link>
<Link class="nav-link" to="/login">Login</Link> */}

  function ConditionalNav(Check){
    if(Check){
   return (
     <div>
<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',flexGrow: 1, bgcolor: 'text.secondary', color: 'secondary.contrastText'  }}>
<Typography sx={{ minWidth: 100 }}>Help</Typography>
<Typography sx={{ minWidth: 100 }}>contact us</Typography>
<Tooltip title="Profile">
  <IconButton
    onClick={handleClick}
    size="small"
    sx={{ ml: 2 }}
    aria-controls={open ? 'account-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
  >
    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
  </IconButton>
</Tooltip>
</Box>
<Menu  
anchorEl={anchorEl}
id="account-menu"
open={open}
onClose={handleClose}
onClick={handleClose}
PaperProps={{
  elevation: 0,
  sx: {
    bgcolor: 'text.primary', color: 'primary.contrastText',
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}}
transformOrigin={{ horizontal: 'right', vertical: 'top' }}
anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
>
<MenuItem>
  <Avatar /> <Link class="nav-link" to="/update">update profile</Link>
</MenuItem>
<Divider />
<MenuItem>
  Settings
</MenuItem>
<MenuItem>
<Signout/> 
</MenuItem>
</Menu>
</div>
 )}
   else {return (
     <div>
  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',flexGrow: 1,  p: 2, border: '3px',bgcolor: 'text.secondary', color: 'secondary.contrastText'  }}>
<Typography sx={{ minWidth: 100 }}><Link to="/signup">Signup</Link></Typography>
<Typography sx={{ minWidth: 100 }}><Link  to="/login">Login</Link></Typography>
 </Box>
     </div>
 )
 
 
 } }
  const {User} = useAuthState;
  return ConditionalNav (Check);
}