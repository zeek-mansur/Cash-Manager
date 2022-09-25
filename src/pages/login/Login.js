
// styles
import styles from './Login.module.css'
import { useLogin} from '../../hooks/useLogin'

import React from 'react'
import { useState } from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isPending} = useLogin()

    const handleSubmit = (e) => {

      e.preventDefault()
      login(email, password)
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
      
       {!isPending && <button onClick={handleSubmit} className="btn">Login</button>}
       {isPending && <button className='btn' disabled>Loading..</button>}
       {error && <p>{error}</p>}
  </form>
  )
}
