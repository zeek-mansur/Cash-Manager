
// styles
import styles from './Login.module.css'

import React from 'react'
import { useState } from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {

      e.preventDefault()
      console.log(email, password);
    }

  return (
  <form className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input type="emial"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label>
       <span>Password:</span>
       </label>
       <input 
       type="password"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
       />
      
       <button onClick={handleSubmit} className="btn">Login</button>
  </form>
  )
}
