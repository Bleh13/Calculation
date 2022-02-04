import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import { Link, useNavigate,Navigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { InputLabel } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Input  from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { useAuthState } from './authcontext';

export default function Additems() {
    const Producttype= [{id:1,value:'fruit'},{id:2,value:'addanother type'} ]
    const [datevalue, setdate] = React.useState();
    const [description, setDescription] = React.useState();
    const [type, settype] = React.useState();
    const [quantity, setQuantity] = React.useState();
    const [price, setPrice] = React.useState();
    const [discount, setDiscount] = React.useState();
    const [Value, setValue] = React.useState(0);
    const { User } = useAuthState();
    const [Useremail, setUseremail] =  React.useState();

    useEffect(() => {
      if(quantity&&discount&&price){
      setValue(quantity*(price-(price*(discount/100))))}
      else if(quantity&&price){
        setValue(quantity*price)
      }
      else{setValue("Please enter price to calculate value")}
    });
    axios.get('http://localhost:5001/users/').then(res => {
      var arraydet = res.data
      var Userresult = arraydet.filter(function (data) {
        return data.email == User.email
      }
      ) 
      setUseremail(Userresult[0].email);  
      console.log(Useremail)
    })
function calculate(e){
  setPrice(e.target.value)
  // setPrice(e.target.value, () => {
  //   setValue(quantity*(price-(price*(discount/100))))
  // })
}
    function createInventory(e){
      e.preventDefault();
      const inventory= {
        ProductType:type,
        ProductDescription:description,
        Quantity:quantity,
        Price:price,
        Discount:discount,
        Value:Value,
        Date:datevalue,
        Email:Useremail
      }
console.log(inventory)
axios.post('http://localhost:5001/items/newItem',inventory)
    }
  
  return <div>
      
     <Box sx={{display:'flex',bgcolor:'black'}}>
     <Box component="form" sx={{bgcolor:'cornsilk',borderRadius:20, width:1/2, p:2,boxShadow: 10,display:'grid',
        alignItems: 'center',borderColor: 'primary.main'}}>   
       <InputLabel sx={{ ml:25, fontSize:20}}>Add inventory</InputLabel> 

     <InputLabel sx={{ }}>Product Description</InputLabel> 
     <Input sx={{  }} type="string" onChange={e=>{
      setDescription(e.target.value)}} multiline  />    
  <TextField onChange={e=>{settype(e.target.value)}} select  label="type of product"    color='' variant='filled' focused  multiline>
{Producttype.map(option=>(
  <MenuItem key={option.id} value={option.value}>
    {option.value}
  </MenuItem>
))}
  </TextField>
 <InputLabel sx={{ }}>quantity</InputLabel>   
 <Input sx={{  }} type="number"  onChange={e=>setQuantity(e.target.value)} />     
 <br></br>
 <InputLabel sx={{ }}>Discount</InputLabel>   
 <Input sx={{  }}type="number"  onChange={e=>{
   setDiscount(e.target.value)}} />    
    <br></br>
 <InputLabel sx={{ }}>Price per unit</InputLabel>   
 <Input sx={{  }}type="number"  onChange={calculate} />
  <br></br>
 <LocalizationProvider focused dateAdapter={AdapterDateFns} >
      <DateTimePicker
     
      toolbarTitle= "Select Date and Time"
        renderInput={(props) => <TextField {...props} />}
        label="Select Date and Time"
        value={datevalue}
        onChange={(newValue) => {
          setdate(newValue.toString());
          console.log(datevalue)
        }}
      />
    </LocalizationProvider>
    <br></br>
    
 </Box> 


 <Box component='summary' sx={{bgcolor:'cornsilk', width:1/2, p:2,boxShadow: 10,display:'grid',
        alignItems: 'center', borderRadius:30,borderColor: 'secondary.main'}}>
           <InputLabel sx={{ ml:35, fontSize:20}}>Summarry</InputLabel> 
      <List sx={{mx:25,textAlign:'center'}}>
        <ListItem >
        <ListItemText inset={true} sx={{fontSize:50}} primary='PRODUCT DESCRIPTION' secondary={description}/>
        </ListItem>
        <Divider/>
        <ListItem>
        <ListItemText inset={true} primary='type' secondary={type}/>
        </ListItem>
        <Divider/>
        <ListItem>
        <ListItemText inset={true} primary='qty' secondary={quantity}/>
        </ListItem>
        <Divider/>
        <ListItem>
        <ListItemText inset={true} primary='price' secondary={price}/>
        </ListItem>
        <Divider/>
        <ListItem>
        <ListItemText inset={true}primary='Discount' secondary={discount}/>
        </ListItem>
        <Divider/>
        <ListItem>
        <ListItemText inset={true} primary='Value' secondary={Value}/>
        </ListItem>
        <Divider/>
        <ListItem>
        <ListItemText inset={true} primary='date and time' secondary={datevalue} />
        </ListItem>
      </List>
 <Button sx={{mx:25}}variant="contained"  onClick={createInventory} >
  Create inventory
</Button>
 </Box>
 </Box>
 </div>
}
