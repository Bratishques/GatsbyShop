import { useState, useCallback, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const storageName = "accdata"
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const auth = useContext(AuthContext)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    )
    auth.setisAuthenticated(true)
    auth.setIdee(id)
    console.log(auth.isAuthenticated)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
    auth.setisAuthenticated(false)
    auth.setIdee(null)
    auth.setAdmin(false)
    console.log(auth.isAuthenticated)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

  }, [login])

  return { login, logout, token, userId }
}
