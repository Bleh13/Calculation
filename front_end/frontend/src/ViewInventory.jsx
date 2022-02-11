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
  const Producttype= [{id:1,value:'vegie'},{id:2,value:'fruit'},{id:3,value:'addanother type'} ]
  const [x, setx] = useState([]);
  const { User } = useAuthState();
  const Searchvalue={
    email:User.email,
    Value:undefined
  }
  const [searchresults, setsearchresults] = useState([])
 const [data, setdata] = useState(true);
 const [filtervalue,setfiltervalue] =useState({
   email:User.email,
  ProductDescription:undefined,
Producttype:undefined,
quantity :undefined,
Discount:undefined,
Priceperunit:undefined
 })



useEffect(() => {
  axios.get('http://localhost:5001/items/',{params:{email:filtervalue.email}})
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
async function handleFilter(e){
const{name,value}=e.target;
setfiltervalue(previousstate=>({
  ...previousstate,
[name]:value
}
)

)
console.log(filtervalue)
}
function HandleFilterSubmit(e){
e.preventDefault();
axios.get('http://localhost:5001/items/filter',{params:{body:filtervalue}}).then(res=>{
  setx(res.data)
})
}

async function handleSearch(e){
  e.preventDefault();
await axios.get(`http://localhost:5001/items/search`,{params:{toJSON: () =>Searchvalue}}).then(res=>{
  setsearchresults(res.data)
  console.log(searchresults)
})
}
return(
  <div>
    <Accordion square={false} >
  <AccordionSummary   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">Filter</AccordionSummary>
          <AccordionDetails sx={{display:'table'}}>
          <InputLabel sx={{textAlign:'center' }}>Product Description</InputLabel> 
     <Input name="ProductDescription" value={filtervalue.ProductDescription} type="string"
      onDoubleClick={e=>handleFilter(e)}
      multiline  />    
      <br></br>
  <TextField 
  onChange={e=>{setfiltervalue({ProductType:[e.target.value]})}} 
  select  label="type of product"    color='' variant='filled' focused fullWidth  multiline>
{Producttype.map(option=>(
  <MenuItem key={option.id} value={option.value}>
    {option.value}
  </MenuItem>
))}
  </TextField>
 <InputLabel >quantity</InputLabel>   
 <Input type="number" name="quantity" value={filtervalue.quantity} 
      onChange={e=>handleFilter(e)}  
//  onChange={e=>setQuantity(e.target.value)}
  />     
 <br></br>
 <InputLabel >Discount</InputLabel>   
 <Input type="number"  name="Discount" value={filtervalue.Discount} 
      onChange={e=>handleFilter(e)}
//  onChange={e=>{
//    setDiscount(e.target.value)}} 
   />    
    <br></br>
 <InputLabel >Price per unit</InputLabel>   
 <Input type="number" name="Priceperunit" value={filtervalue.Priceperunit} 
      onChange={e=>handleFilter(e)}
  // onChange={calculate} 
  />
  <br></br>
  <br></br>
  <Button variant="contained" onClick={e=> HandleFilterSubmit()}   >
  Filter
</Button>
          </AccordionDetails >
          </Accordion>
  <Input sx={{ ml:50 }} placeholder="search" type="string"  multiline  onDoubleClick={e=>{console.log(e.target.value);Searchvalue.Value=e.target.value}}>
   </Input>
   <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
  <SearchIcon onClick={e=>{ handleSearch(e)}}  />
</IconButton>
 
    {data? 
    x.map(({Date,ProductDescription,Quantity,ProductType,Price,Value,Discount})=>{
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
           Quantity:{Quantity}<br></br><Divider/>
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

