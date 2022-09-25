import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../components/firebase/config"



export const useCollection = (collection, _query) => {

    const [documents, setDocuments] = useState( null)
    const [error, setError] = useState(null)

    // if we dont use a ref --> infinite lop in useEffect
    // _query is an array and is "different" on every function call
    const query = useRef(_query).current

    useEffect (()  => {

        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }

            const unsubscribe = ref.onSnapshot((snapshot) => {

                let results = []
                snapshot.docs.forEach(doc => {

                    results.push({...doc.data(), id: doc.id})
                })
                // update state
                setDocuments(results)
                setError(null)

            }, (error) => {
                console.log(error)
                setError('could not fetch the data')
            })
            // unsubscribe on unmount

                return () => unsubscribe()
    
    }, [collection, query])

    return {documents, error}

}