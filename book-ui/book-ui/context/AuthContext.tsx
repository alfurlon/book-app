import { useContext, createContext, useState, useEffect } from "react"
import { User, emptyUser } from "@/types/User"
import axios from "axios"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(emptyUser)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            axios.get(`http://localhost:3001/api/v1/users/${decodedToken.id}`)
                .then(data => console.log(data))
                .catch(error => console.log(error))
        }
    })
}