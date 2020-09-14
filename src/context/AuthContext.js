import React,{createContext, useState, useEffect} from "react"
import { useHttp } from "../hooks/http.hook"
import { Location } from '@reach/router'
import { useAuth } from "../hooks/auth.hook"

export const AuthContext = createContext()
export const isBrowser = () => typeof window !== "undefined"



const storageName = "accdata"


const noop = () => {}




const GlobalContextProvider = ({ children}) => {
    const data = (() => {
        if (isBrowser() && window.localStorage.getItem(storageName)) {
            return JSON.parse(window.localStorage.getItem(storageName))
        }
        else return false
    
    })()
    const { request, error } = useHttp() 
    const [token, setToken] = useState(null)
    const [isAuthenticated,setisAuthenticated] = useState(!!data.token)
   


    
    useEffect(
        
        () => {

        async function callVerify() {
            if (data.token) {
                const verify = await request("/api/auth/token", "POST", "", {authorization: `Bearer ${data.token}`,})
                if (verify.message === "valid") {
                    console.log(verify.message)
                }
                if (verify.message === "invalid") {
                    console.log(verify.message)
                    localStorage.removeItem(storageName)
                    window.location.reload()
                }
  
            }
    }

    callVerify()
},[isAuthenticated])


    return (
      <AuthContext.Provider value={{isAuthenticated,setisAuthenticated}}>
          {children}
      </AuthContext.Provider>
    )
  }
  
  export default GlobalContextProvider