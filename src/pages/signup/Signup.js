

import { useState } from 'react'
// style
import styles from './Signup.module.css'

import React from 'react'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const {signup, isPending, error} = useSignup()
    

    const handleSubmit = (e) => {

      e.preventDefault()
      signup( email, password,displayName);
    }


  return (
    <div>
      <form className={styles['signup-form']}>
      <h2>Signup</h2>
      
      <label>
        <span>email:</span>
        <input type="emial"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label>
       <span>Password:</span></label>
       <input 
       type="password"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
       />
       <label>
        <span>Display Name:</span>
        <input type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
        />
      </label>
      
       {!isPending && <button onClick={handleSubmit} className="btn">Sign up</button>}
       {isPending && <button className="btn" disabled>Loading..</button>}
       {error && <p>{error}</p>}
  </form>
    </div>
  )
}
