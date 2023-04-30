import React from 'react'

const Auth = () => {
  return (
    <div className='userLogin'>
        <input placeholder="Email" type="text" className="userInput" />
        <input placeholder="Password" type="text" className="userInput" />
        <button className="userBtn">Sign In</button>
        <button className="userBtn">Sign In With Google</button>
        <button className="userBtn">Sign Out</button>
    </div>
  )
}

export default Auth;