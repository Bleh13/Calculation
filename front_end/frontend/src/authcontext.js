import {  GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword ,signOut} from 'firebase/auth'
import { auth } from './firebaseconfig';
import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'


const provider = new GoogleAuthProvider();

export const AuthContext = createContext()

export function AuthContextProvider({children}){
  const [User, setUser] = useState()
  const [loading, setloading] = useState(true)

async function CreateUser (registername,registeremail,registerphone,registerpassword){
    try{
      const userfirebase= await createUserWithEmailAndPassword(auth,registeremail,registerpassword,registerphone);
      console.log(userfirebase);
      return userfirebase;
      }
      catch(error){console.log(error)}
     finally{
       
       const registered={
       name:registername,
       email:registeremail,
       password:registerpassword,
       phonenumber:registerphone
           }
   
     axios.post('http://localhost:5001/users/registration',registered).then(res=>(console.log(res.data)))
     

   }

  
}

function Googlesignup(){

 return(
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user.email)
  
    axios.post('http://localhost:5001/users/registration',{email:user.email, name:user.displayName}).then(
     
      res=>(console.log(res.data))
        )
   
        
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  })
  
 )
}
function LoginWithGoogle (){
  
  return(
signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user.email)
 
    
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    })
    ) }
    function Logout(){
      return signOut(auth);
          }

          function Update(currentemailid,id,newemail,name,phonenumber){
            const registered = {
              id:id,
 currentemail:currentemailid,
              name: name,
              phonenumber: phonenumber,
              newemail: newemail
            }
            console.log(id);
            axios.put(`http://localhost:5001/users/update/${id}`,registered).then(res => (setUser(res.data)
            ))
         
         return registered; }

   useEffect(() => {
    
     auth.onAuthStateChanged(user=>{ 
      setUser(user)
        setloading(false)
      console.log(user)
      console.log(loading)
    })
    console.log(User)
  }
 ) 

  const complete={
    User ,Googlesignup,LoginWithGoogle,CreateUser,Logout,Update
  }
  console.log(complete)
  return (<AuthContext.Provider value={complete} >
  {!loading && children} 
  </AuthContext.Provider>
  )}

export function useAuthState  ()  {
  return useContext(AuthContext)
  
}
