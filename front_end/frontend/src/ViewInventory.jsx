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
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';


export default function ViewInventory() {
  const [x, setx] = useState([]);
  const [Producttype, setProducttype] = useState([]);
  const [DefaultMaxvalues,setDefaultMaxvalues]= useState([]);
  const { User } = useAuthState();
  const [Searchvalue, SetSearchvalue] = useState({
    email: User.email,
    Value: ""
  });
  const [data, setdata] = useState(true);
  const [filtervalue, setfiltervalue] = useState({
    email: User.email,
    ProductType: undefined,
    minQuantity: 0,
    maxQuantity: DefaultMaxvalues.Quantity,
    minDiscount: 0,
    maxDiscount:DefaultMaxvalues.Discount,
    minPriceperunit: 0,
    maxPriceperunit: DefaultMaxvalues.Price,
  })
  useEffect(() => {
    axios.get('http://localhost:5001/items/', { params: { email: filtervalue.email } })
      .then(res => {
        console.log(res.data.Producttypefilter)
        if (!res.data.doc.length) {
          setdata(false)
        }
        else {
          setdata(true)
          setx(res.data.doc)
          setProducttype(res.data.Producttypefilter)
          setfiltervalue(prevvalue=>({...prevvalue,maxPriceperunit:res.data.maxProductPrice,
            maxQuantity:res.data.maxProductQuantity,maxDiscount:res.data.maxProductDiscount}))
          setDefaultMaxvalues(prevvalue=>({...prevvalue,Price:res.data.maxProductPrice,
            Quantity:res.data.maxProductQuantity,Discount:res.data.maxProductDiscount
        }))
      }}).catch(error => console.log(error))

  }
    ,[]);
  async function HandleFilterSubmit(e) {
    e.preventDefault();
    await axios.put('http://localhost:5001/items/filter', filtervalue).then(res => {
      console.log(res.data)
      setx(res.data)
    })
  }
  async function handleSearch(e) {
    e.preventDefault();
    await axios.put(`http://localhost:5001/items/search`, Searchvalue).then(res => {
      console.log(res.data)
      setx(res.data)
      SetSearchvalue(prevvalue=>({...prevvalue,Value:""}))
    })
  }
  async function HandleSearchReset(e){
    e.preventDefault();
    axios.get('http://localhost:5001/items/', { params: { email: filtervalue.email } })
    .then(res => {
      console.log(res.data.Producttypefilter)
      if (!res.data.doc.length) {
        setdata(false)
      }
      else {
        setdata(true)
        setx(res.data.doc)
        setProducttype(res.data.Producttypefilter)
      }

    }).catch(error => console.log(error))


  }
  return (
    <div>
      <Box sx={{ display: 'block',  bgcolor: 'lightgoldenrodyellow', }}>
       <Box sx={{ alignItems: 'center', p: 1 }}>
       <Box component="form" sx={{mx:'auto' ,bgcolor:'cornsilk',borderRadius:20, width:1/2, p:2,display:'flow',
        alignItems: 'center'}}> 
        <Grid container spacing={1}>
      <Accordion  square={false} >
        <AccordionSummary  expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">Filter</AccordionSummary>
        <AccordionDetails sx={{ alignItems:'center' }}>
          <TextField 
            onChange={e => { setfiltervalue(prevstate=> ({...prevstate, ProductType: e.target.value })); console.log(filtervalue)}}
            select label="type of product" color='' variant='filled' focused fullWidth multiline>
            {Producttype.map(option => (
              <MenuItem value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <InputLabel sx={{  textAlign:'center'}} >quantity</InputLabel>
          <br></br>
          <TextField sx={{  mx:.5}}InputLabelProps={{
            shrink: true,
          }}
           label="minimum" type="number" name="minQuantity" value={filtervalue.minQuantity}
           onChange={e => { if(!e.target.value){ setfiltervalue(prevstate=> ({...prevstate, minQuantity: 0 }))}else{setfiltervalue(prevstate=> ({...prevstate, minQuantity: e.target.value }))}}}
          />
           <TextField  sx={{  mx:.5}} InputLabelProps={{
            shrink: true,
          }}
           label="maximum" type="number" name="maxQuantity" value={filtervalue.maxQuantity}
           onChange={e => { if(!e.target.value){ setfiltervalue(prevstate=> ({...prevstate, maxQuantity: DefaultMaxvalues.Quantity }))}else{setfiltervalue(prevstate=> ({...prevstate, maxQuantity: e.target.value }))}}}
          />
          <br></br>
          <InputLabel sx={{  textAlign:'center'}}>Discount</InputLabel>
          <br></br>
          <TextField  sx={{  mx:.5}} InputLabelProps={{
            shrink: true,
          }}
 label="minimum" type="number" name="minDiscount" value={filtervalue.minDiscount}
 onChange={e => { if(!e.target.value){ setfiltervalue(prevstate=> ({...prevstate, minDiscount: 0 }))}else{setfiltervalue(prevstate=> ({...prevstate, minDiscount: e.target.value }))}}}
          />
             <TextField  sx={{  mx:.5}} InputLabelProps={{
            shrink: true,
          }}
           label="maximum" type="number" name="maxDiscount" value={filtervalue.maxDiscount}
           onChange={e => { if(!e.target.value){ setfiltervalue(prevstate=> ({...prevstate, maxDiscount: DefaultMaxvalues.Discount}))}else{setfiltervalue(prevstate=> ({...prevstate, maxDiscount: e.target.value }))}}}
          />
          <br></br>
          <InputLabel sx={{  textAlign:'center'}} >Price per unit</InputLabel>
          <br></br>
          <TextField  sx={{  mx:.5}} InputLabelProps={{
            shrink: true,
          }}
label="minimum" type="number" name="minPriceperunit" value={filtervalue.minPriceperunit}
            onChange={e => { if(!e.target.value){ setfiltervalue(prevstate=> ({...prevstate, minPriceperunit: 0 }))}else{setfiltervalue(prevstate=> ({...prevstate, minPriceperunit: e.target.value }))}}}
          />
            <TextField  sx={{  mx:.5}} InputLabelProps={{
            shrink: true,
          }}
 label="maximum"  type="number" name="maxPriceperunit" value={filtervalue.maxPriceperunit}
 onChange={e => { if(!e.target.value){ setfiltervalue(prevstate=> ({...prevstate, maxPriceperunit: DefaultMaxvalues.Price }))}else{setfiltervalue(prevstate=> ({...prevstate, maxPriceperunit: e.target.value }))}}}
          />
          <br></br>
          <br></br>

          <Grid container spacing={1} >
          <Grid ms={2} sx={{mx:'auto',}} >
          <Button sx={{mx:1,}} variant="contained" color='warning' onClick={e => HandleFilterSubmit(e)}   >
            Filter
          </Button> 
          <Button  variant="contained" color='warning' onClick={e => HandleSearchReset(e)}   >
            Clear Filters
          </Button>
          </Grid>
          </Grid>
        </AccordionDetails >
        
      </Accordion>
     
    <br></br>

    <Grid xs={6}>
      <Input sx={{}} id="Searchfield"  placeholder="search" type="string" value={Searchvalue.Value} onChange={e => { console.log(e.target.value);  SetSearchvalue(prevstate=>({...prevstate,
      Value:e.target.value}) ) }}>
      </Input>
      </Grid>
      <Grid >
      <IconButton type="submit" aria-label="search">
        <SearchIcon onClick={e => { handleSearch(e) }} />
      </IconButton>
      </Grid>
      <Grid ms={2}>
      <Button size="small" color="warning" variant="contained" onClick={e => HandleSearchReset(e)}   >
            Reset search
          </Button>
          </Grid>
          </Grid>
          </Box>
      </Box>

      {data ?
        x.map(({ Date, ProductDescription, Quantity, ProductType, Price, Value, Discount }) => {
          return (
            <div>
              <Box sx={{ display: 'flow', mx: 20, mt: 1, bgcolor: 'darkgray', p: 1 }}>
                <Accordion >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">Date:{Date}</AccordionSummary>
                  <AccordionDetails>
                    Product Description:{ProductDescription}<br></br><Divider />
                    Product Type:{ProductType}<br></br><Divider />
                    Quantity:{Quantity}<br></br><Divider />
                    Product Price:{Price}<br></br><Divider />
                    Discount:{Discount}<br></br><Divider />
                    Value:{Value}<br></br><Divider />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </div>
          )

        }

        )

        : <h1>no inventory</h1>}
</Box>
    </div>
  )
}

