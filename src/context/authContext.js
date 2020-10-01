import React, { createContext, useState, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import config from "../config"
export const AuthContext = createContext()
export const isBrowser = () => typeof window !== "undefined"


const storageName = "accdata"

const GlobalContextProvider = ({ children }) => {
  const data = (() => {
    if (isBrowser() && window.localStorage.getItem(storageName)) {
      return JSON.parse(window.localStorage.getItem(storageName))
    } else return false
  })()
  const { request, error } = useHttp()
  const [isAuthenticated, setisAuthenticated] = useState(!!data.token)
  const [idee, setIdee] = useState(null)
  const [admin, setAdmin] = useState(false)
  const {baseUrl} = config

  useEffect(() => {
    async function callVerify() {
      if (data.token) {
        console.log(data.userId)
        const verify = await request(`${baseUrl}api/auth/token`, "POST", "", {
          authorization: `Bearer ${data.token}`,
          userId: data.userId,
        })
        if (verify.message === "valid") {
          setIdee(data.userId)
          console.log(verify.message)
        }
        if (verify.message === "valid admin") {
          setIdee(data.userId)
          setAdmin(true)
          console.log(verify.message)
        }
        if (verify.message === "invalid") {
          console.log(verify.message)
          localStorage.removeItem(storageName)
        }
      }
    }

    callVerify()
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        idee,
        setIdee,
        admin,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default GlobalContextProvider