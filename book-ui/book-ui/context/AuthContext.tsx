'use client'

import { useContext, createContext, useState, useEffect, ReactNode } from "react"
import { User, emptyUser } from "@/types/User"
import axios from "axios"

interface AuthContextType {
    user: User | null
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(emptyUser)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            axios.get(`http://localhost:3001/api/v1/users/${decodedToken.id}`)
                .then(response => {
                    // console.log(response.data.result.user)
                    setUser(response.data.result.user)
                })
                .catch(error => console.log(error))
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value: AuthContextType = {
    user,
    logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };