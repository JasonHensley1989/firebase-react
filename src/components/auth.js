import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase-config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async() => {
    try {
      if (email && password) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        alert("Please enter your email and password");
      }
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

  const handleSignOut = async() => {
    try {
        await signOut(auth);
    } catch(err) {
        console.error(err);
    }   
  }

  return (
    <div className='userLogin'>
      <form className='userLogin' noValidate>
        <input required placeholder="Email" type="text" className="userInput" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required placeholder="Password" type="password" className="userInput" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="userBtn" type="button" onClick={signIn}>Sign In</button>
        <button className="userBtn" type="button" onClick={signInWithGoogle}>Sign In With Google</button>
        <button className="userBtn" type="button" onClick={handleSignOut}>Sign Out</button>
      </form>
    </div>
  )
}

export default Auth;