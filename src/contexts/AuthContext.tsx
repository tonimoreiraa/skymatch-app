import React, { createContext, useContext } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { UserType } from "../types/UserTypes";
interface AuthContextType {
    user: UserType,
    token: string,
    authenticated: boolean,
    signIn: (user: UserType, token: string, clientToken: string) => void,
    signOut: () => void,
    setUser: (user: UserType) => void,
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = (props: any) => {
    
    const [user, setUser] = useAsyncStorage('@auth-user-data', undefined)
    const [token, setToken] = useAsyncStorage('@auth-user-token', undefined)
    const [clientToken, setClientToken] = useAsyncStorage('@auth-client-token', undefined)
    const authenticated = !!token && !!user

    function signIn(user: UserType, token: string, clientToken: string) {
        setUser(user)
        setClientToken(clientToken)
        setToken(token)
    }

    function signOut() {
        setUser(null)
        setToken(null)
        setClientToken(null)
    }
    
    return <AuthContext.Provider value={{user, token, authenticated, signIn, signOut, setUser}}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)