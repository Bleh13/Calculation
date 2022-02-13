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
  const { User } = useAuthState();
  const [Searchvalue, SetSearchvalue] = useState({
    email: User.email,
    Value: ""
  });
  const [data, setdata] = useState(true);
  const [filtervalue, setfiltervalue] = useState({
    email: User.email,
    Producttype: undefined,
    minquantity: undefined,
    maxquantity: undefined,
    minDiscount: undefined,
    maxDiscount: undefined,
    minPriceperunit: undefined,
    maxPriceperunit: undefined
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
        }

      }).catch(error => console.log(error))

  }
    , []);
  async function handleFilter(e) {
    const { name, value } = e.target;
    setfiltervalue(previousstate => ({
      ...previousstate,
      [name]: value
    }
    )

    )
    console.log(filtervalue)
  }
  function HandleFilterSubmit(e) {
    e.preventDefault();
    axios.get('http://localhost:5001/items/filter', { params: { body: filtervalue } }).then(res => {
      setx(res.data.doc)
    })
  }

  async function handleSearch(e) {
    e.preventDefault();
    await axios.post(`http://localhost:5001/items/search`, Searchvalue).then(res => {
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
      <Box sx={{ display: 'block',  bgcolor: 'lightgoldenrodyellow', p: 1 }}>
       <Box sx={{ alignItems: 'center',display: 'flow', mx: 20, mt: 1, p: 1 }}>
       <Box component="form" sx={{mx: 20,display:'flex',bgcolor:'cornsilk',borderRadius:20, width:1/2, p:2,display:'grid',
        alignItems: 'center'}}> 
        <Grid container spacing={2}>
      <Accordion  square={false} >
        <AccordionSummary  expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">Filter</AccordionSummary>
        <AccordionDetails sx={{ display: 'table',alignItems:'center' }}>
          <TextField 
            onChange={e => { setfiltervalue({ ProductType: [e.target.value] }) }}
            select label="type of product" color='' variant='filled' focused fullWidth multiline>
            {Producttype.map(option => (
              <MenuItem key={Math.random} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <InputLabel sx={{  textAlign:'center'}} >quantity</InputLabel>
          <Input sx={{  textAlign:'center'}} placeholder="minimum" type="number" name="minquantity" value={filtervalue.minquantity}
            onChange={e => handleFilter(e)}
          />
           <Input placeholder="maximum" type="number" name="maxquantity" value={filtervalue.maxquantity}
            onChange={e => handleFilter(e)}
          />
          <br></br>
          <InputLabel sx={{  textAlign:'center'}}>Discount</InputLabel>
          <Input placeholder="minimum" type="number" name="minDiscount" value={filtervalue.minDiscount}
            onChange={e => handleFilter(e)}
          />
            <Input placeholder="maximum"  type="number" name="maxDiscount" value={filtervalue.maxDiscount}
            onChange={e => handleFilter(e)}
          />
          <br></br>
          <InputLabel sx={{  textAlign:'center'}} >Price per unit</InputLabel>
          <Input placeholder="minimum" type="number" name="minPriceperunit" value={filtervalue.minPriceperunit}
            onChange={e => handleFilter(e)}
          />
            <Input placeholder="maximum"  type="number" name="maxPriceperunit" value={filtervalue.maxPriceperunit}
            onChange={e => handleFilter(e)}
          />
          <br></br>
          <br></br>
          <Button variant="contained" onClick={e => HandleFilterSubmit()}   >
            Filter
          </Button>
        </AccordionDetails >
      </Accordion>
    <br></br>

      
      <Input sx={{textAlign: 'center'}} id="Searchfield"  placeholder="search" type="string" value={Searchvalue.Value} onChange={e => { console.log(e.target.value);  SetSearchvalue(prevstate=>({...prevstate,
      Value:e.target.value}) ) }}>
      </Input>
      <IconButton type="submit" sx={{  }} aria-label="search">
        <SearchIcon onClick={e => { handleSearch(e) }} />
      </IconButton>
      <Button size="small" color="warning" variant="contained" onClick={e => HandleSearchReset(e)}   >
            Reset search
          </Button>
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

