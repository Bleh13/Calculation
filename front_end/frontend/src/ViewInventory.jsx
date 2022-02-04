import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios';
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useAuthState } from './authcontext'

export default function ViewInventory() {

 const [type, setitemtype] = useState("");
 const [price, setprice] = useState("");
 const [discount, setdiscount] = useState("");
 const [value, setvalue] = useState("");
 const [date, setdate] = useState("");
 const [description, setdescription] = useState("");
 const [x, setx] = useState([]);
 const { User } = useAuthState();
 var y=User.email


useEffect(() => {
  axios.get('http://localhost:5001/items/',{params:{email:y}})
  .then(res=>{
    setx(res.data)
    }).catch(error=>console.log(error)) 
  
  }
, []);  
return(
  <div>
    {console.log(x)}
    {x.map(({Date,ProductDescription,ProductType,Price,Value,Discount})=>{
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
    
    )}
  </div>
)
}

