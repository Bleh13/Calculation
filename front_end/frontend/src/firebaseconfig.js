import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdpQvr85hhcTOMkk9WZJZklgl4U8cCnoE",
  authDomain: "signin-48fdf.firebaseapp.com",
  projectId: "signin-48fdf",
  storageBucket: "signin-48fdf.appspot.com",
  messagingSenderId: "189600967479",
  appId: "1:189600967479:web:45eeedf296910a313fc8b2"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export default app;

