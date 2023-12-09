'use client'

import { useContext, createContext, useState, useEffect, ReactNode } from "react"
import { User, emptyUser } from "@/types/User"
import { useRouter } from "next/navigation"

interface AuthContextType {
    user: User | null
    logout: () => void
    login: (token: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(emptyUser)
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser(decodedToken);
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push("/")
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser(decodedToken);
        router.push("/book/gallery")
    }

    const value: AuthContextType = {
    user,
    logout,
    login
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