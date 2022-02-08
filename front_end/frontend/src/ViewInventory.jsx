import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import AccordionSummary from '@mui/material/AccordionSummary';
import MenuItem from '@mui/material/MenuItem'
import { InputLabel } from '@mui/material';
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
 const [data, setdata] = useState(true);
 const [filtervalue,setfiltervalue] =useState({
  ProductDescription:" " ,
Producttype:"",
quantity :"",
Discount:0,
Priceperunit:0
 })
 const Producttype= [{id:1,value:'vegie'},{id:2,value:'fruit'},{id:2,value:'addanother type'} ]
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
function handleFilter(e){
const{name,value}=e.target;
setfiltervalue(previousstate=>({
  ...previousstate,
[name]:value
}))
}
function HandleFilterSubmit(e){
e.preventDefault();
x.filter()
}
return(
  <div>
    {console.log(x)}
    <Accordion square={false} >
  <AccordionSummary   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">Filter</AccordionSummary>
          <AccordionDetails sx={{display:'table'}}>
          <InputLabel sx={{textAlign:'center' }}>Product Description</InputLabel> 
     <Input name="ProductDescription" value={filtervalue.ProductDescription} type="string"
      onChange={handleFilter()}
      multiline  />    
      <br></br>
  <TextField 
  // onChange={e=>{settype(e.target.value)}} 
  select  label="type of product"    color='' variant='filled' focused fullWidth  multiline>
{Producttype.map(option=>(
  <MenuItem key={option.id} value={option.value}>
    {option.value}
  </MenuItem>
))}
  </TextField>
 <InputLabel >quantity</InputLabel>   
 <Input type="number" name="ProductDescription" value={filtervalue.quantity} 
      onChange={handleFilter()}  
//  onChange={e=>setQuantity(e.target.value)}
  />     
 <br></br>
 <InputLabel >Discount</InputLabel>   
 <Input type="number"  name="ProductDescription" value={filtervalue.Discount} 
      onChange={handleFilter()}
//  onChange={e=>{
//    setDiscount(e.target.value)}} 
   />    
    <br></br>
 <InputLabel >Price per unit</InputLabel>   
 <Input type="number" name="ProductDescription" value={filtervalue.Priceperunit} 
      onChange={handleFilter()}
  // onChange={calculate} 
  />
  <br></br>
  <br></br>
  <Button variant="contained" onSubmit={HandleFilterSubmit()}   >
  Filter
</Button>
          </AccordionDetails >
          </Accordion>
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

