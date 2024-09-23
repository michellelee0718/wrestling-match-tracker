import {SignedIn, SignedOut, SignInButton, SignUpButton} from '@clerk/clerk-react'
import { Navigate } from "react-router-dom"

export const Auth = () => {
    return(
     <div className="sign-in-contaner">
        <SignedOut>
            <h1>Rate the wrestling matches you've watched!</h1>
            <SignUpButton mode="modal"/>
            <SignInButton mode="modal"/>
        </SignedOut>
        <SignedIn>
            <Navigate to="/" />
        </SignedIn>
    </div>
    )
}