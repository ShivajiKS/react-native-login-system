import React, { useState, useEffect } from 'react'
import { auth } from '../configurations/firebase-config'
import SignedInStack from './SignedInStack'
import { LoginStack } from './stacks'
import { onAuthStateChanged } from 'firebase/auth'

const MainAuthStack = () => {
    const [currentUser, setcurrentUser] = useState(null)
    const setUser = (user) => {
        // this function is called inside in the useEffect hook
        user ? setcurrentUser(user) : setcurrentUser(user)
    }
    useEffect(() => {
        onAuthStateChanged(auth, user => setUser(user))
    }, [])
    return (
        <>
            {
                currentUser ? <SignedInStack /> : <LoginStack />
            }
        </>
    )
}
export default MainAuthStack;



