import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../components/firebase/config";


let initialState = {

    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {

    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, success: false, error: null}
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null} 
        case 'DELETED_DOCUMENT':
            return { isPending:false, document: null, success: false, error: action.payload}  
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}
         
        default:
            return state
    }
}
export const useFirestore = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = projectFirestore.collection(collection)

    // only dispitch if not cancelled
    const dispatchIfNotCancelled = (action) => {

        if(!isCancelled) {
                dispatch(action)
        }
    }
    // add document 
    const addDocument = async (doc) => {
        dispatch({ typeof: 'IS_PENDING'})

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        }
        catch(err){
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message})

        }
    }
    // delete a document 
    const deleteDocument = async(id) => {

            dispatch({type:'ISPENDING'})

            try{

                    await ref.doc(id).delete()
                    dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})

            } catch(err) {
                    dispatchIfNotCancelled({type: 'ERROR', payload: 'Could not delete'})

            }
    }

    useEffect(() => {

        return () => setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, response}
}
