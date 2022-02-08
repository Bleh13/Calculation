import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import AccordionSummary from '@mui/material/AccordionSummary';
import MenuItem from '@mui/material/MenuItem'
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios';
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useAuthState } from './authcontext'
import IconButton from '@mui/material/IconButton';
import Input  from '@mui/material/Input';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { getTableSortLabelUtilityClass } from '@mui/material';

export default function ViewInventory() {
const Searchvalue=[{id:1,value:'Producttype'},{id:2,value:'ProductDescription'},{id:3,value:'Discount'},{id:4,value:'Price'}]
 const [data, setdata] = useState(true);
 const [selectedsearch,setSelectedsearch]=useState()
 const [x, setx] = useState([]);
 const { User } = useAuthState();
 var y=User.email


useEffect(() => {
  axios.get('http://localhost:5001/items/',{params:{email:y}})
  .then(res=>{
    if(!res.data.length){
    setdata(false)}
    else{
      setdata(true)
      setx(res.data)
    }
   
    }).catch(error=>console.log(error)) 
  
  }
, []);  
return(
  <div>
    {console.log(x)}
    <TextField onChange={e=>{setSelectedsearch(e.target.value)}} select  label="Filter based on "  variant='filled' focused fullWidth multiline>
{Searchvalue.map(option=>(
  <MenuItem key={option.id} value={option.value}>
    {option.value}
  </MenuItem>
))}
  </TextField>
  <Input sx={{ ml:50 }} placeholder="search" type="string"  multiline >
   </Input>
   <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
  <SearchIcon />
</IconButton>
 
    {data? 
    x.map(({Date,ProductDescription,ProductType,Price,Value,Discount})=>{
      return(
      <div>
         <Box sx={{display:'flow',mx:20,mt:1,bgcolor:'darkgray',p:1}}> 
<Accordion >
  <AccordionSummary  expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">Date:{Date}</AccordionSummary>
          <AccordionDetails>
          Product Description:{ProductDescription}<br></br><Divider/>
           Product Type:{ProductType}<br></br><Divider/>
          Product Price:{Price}<br></br><Divider/>
          Discount:{Discount}<br></br><Divider/>
         Value:{Value}<br></br><Divider/>
          </AccordionDetails>
    </Accordion> 
     </Box>
      </div>
      )
      // console.log(option.ProductDescription)
      // console.log(option.ProductType)
      // console.log(option.Value)
      // console.log(option.Price)
        }
    
    )

    :<h1>no inventory</h1>}
    
  </div>
)
}

