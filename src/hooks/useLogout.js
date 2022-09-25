import { useState } from "react"
import { projectAuth } from "../components/firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {

    const [error, setError]= useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    
    const logout = async() => {
        setError(null)
        setIsPending(true)

        // sign the user out

        try {

            await projectAuth.signOut()

            // dispatch logout 
            dispatch({type: 'LOGOUT'})
            setIsPending(false)
            setError(null)
               
    } 
    catch(err) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
    }
    
}
    return {logout, error, isPending}
}