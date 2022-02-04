import React, { Component } from 'react'
import { auth } from './firebaseconfig'
import {getAuth} from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    square:false ,
    color: theme.palette.background.paper,
   backgroundColor: theme.palette.text.disabled,
    
    '&:hover': {
      
      backgroundColor: theme.palette.text.primary,
      
    },
      
}
  ));

export default function Dashboard() {
    const [alertopen, setOpen] = React.useState(true);
    const [user, setcurrentuser] = useState({})
    onAuthStateChanged(auth,(currentUser)=>{
        setcurrentuser(currentUser);
    })
    const handleClose = () => {
        setOpen(false);
    }
    return (
    <div>
        <Snackbar
        sx={{ bgcolor: 'secondary.main' }}
        open={alertopen}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Thanks for joining" />
<Box sx={{ flexGrow: 1 , m:10, p:3,boxShadow: 10, bgcolor:"text.secondary",  borderColor: 'primary.main' }}>
<Grid container spacing={10}>
  <Grid item xs={10} >
  <Link to="/Additems"> <Item> Add inventory</Item></Link>
  </Grid>
  <Grid item xs>
  <Link to="/Viewnventory"><Item>View Graphs</Item></Link>
  </Grid>
  <Grid item xs>
  <Link to="/ViewInventory"><Item>view Existing Inventory</Item></Link>
  </Grid>
</Grid>
</Box>
</div>    





   
    )
}

