import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase-config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async() => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(err) {
        console.error(err);
    }   
  }
  
  const signInWithGoogle = async() => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch(err) {
        console.error(err);
    }   
  }

  const signOut = () => { 
    console.log("Click");
  }


  return (
    <div className='userLogin'>
        <input placeholder="Email" type="text" className="userInput" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" className="userInput" onChange={(e) => setPassword(e.target.value)}/>
        <button className="userBtn" onClick={signIn}>Sign In</button>
        <button className="userBtn" onClick={signInWithGoogle}>Sign In With Google</button>
        <button className="userBtn" onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default Auth;