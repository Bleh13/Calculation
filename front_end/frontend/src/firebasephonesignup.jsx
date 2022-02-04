import React from 'react'
import {getAuth} from "firebase/auth";

import {  signInWithPhoneNumber, GoogleAuthProvider,RecaptchaVerifier  } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'


export default function Firebasephonesignup() {
  
  const navigate=useNavigate()
const [phonenumber, setphonenumber] = useState("")
const [otp, setotp] = useState("")

  // const phoneNumber = getPhoneNumberFromUserInput();
let appVerifier = window.recaptchaVerifier;

// const auth = getAuth();

async function recaptchafunc(){
  
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    
    'size': 'invisible',
    'callback': (response) => {
      console.log("captcharesolved")
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  }, getAuth());
}
  async function onSignInSubmit(e){
    e.preventDefault()
    recaptchafunc();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(getAuth(), phonenumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...

    }).catch((error) => {
      console.log(error)
      // ...
    });
  }
  async function onotpfunc(){
    const code = otp
window.confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  navigate("/dashboard")
  setotp("");
  setphonenumber("")
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
});

  }
    return (
        <div>
          bleh
         <form class="container text-primary bg-light position-absolute top-50 start-50 translate-middle"  >
   <div class="mb-3 ">
    
     <label for="exampleInputEmail1" className="form-label">Phonenumber</label>
     <input type="tel" className="form-control" id="phonenumber" value={phonenumber} aria-describedby="emailHelp" onChange={(e)=>{setphonenumber(e.target.value)}} />
    
   </div>
   <br></br>
   <div id="recaptcha-container"></div>   
   <button type="submit" className="btn btn-primary"  onClick={onSignInSubmit}>Get otp </button>
   <div class="mb-3 ">
    
     <label for="exampleInputEmail1" className="form-label">Enter otp</label>
     <input type="tel" className="form-control" id="otp" value={otp} aria-describedby="emailHelp" onChange={(e)=>{setotp(e.target.value)}} />
     <button type="submit" className="btn btn-primary"  onClick={onotpfunc}>Signup </button>
   </div>
   </form>
        </div>
    )
}

