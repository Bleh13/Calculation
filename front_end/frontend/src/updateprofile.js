import React, { useEffect, useState,useRef } from 'react'
import { useAuthState } from './authcontext';
import axios from "axios"
import { async } from '@firebase/util';


export default function Updateprofile() {
 
  const [phonenumber, setphonenumber] = useState();
  const [name, setname] = useState(" ");
  const [emailid, setemailid] = useState(" ");
  const { User } = useAuthState();
  var y=User.email;
  console.log(User.email)
  const { Update } = useAuthState();
  const{registered}=useAuthState();
  const [id,setid] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users/usersupdate',{params:{email:y}}).then(res => {
      setid(res.data); 
      
      console.log(res.data)
  })
  }, []);

  async function onsubmitForm(e) {
    
    e.preventDefault();
await Update(id[0].email,id[0]._id,emailid,name,phonenumber);

  

  }

  return (

    <div>
  
      {/* <h1>{id[0].name}</h1>
      <h1>{id[0].phonenuber}</h1>
      <h1>{id[0].email}</h1>   */}
    
      <form class="container text-primary bg-light position-absolute top-50 start-50 translate-middle" onSubmit={onsubmitForm}>
        <div class="mb-3">
          <label for="exampleInputname" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={e => { setname(e.target.value) }} />
        </div>
        <div class="mb-3">
          <label for="exampleInputname" className="form-label">Phonenumber</label>
          <input type="integer" className="form-control" id="phonenumber" value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} />
        </div>
        <div class="mb-3">
          <label for="exampleInputname" className="form-label">Email</label>
          <input type="integer" className="form-control" id="phonenumber" value={emailid} onChange={(e) => { setemailid(e.target.value) }} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onsubmitForm}>Update</button>
      </form>
    </div>
  )

}