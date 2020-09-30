import { useState, useCallback, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const storageName = "accdata"
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const auth = useContext(AuthContext)

  const login = useCallback((jwtToken, id, admin) => {
    if (jwtToken && id ) {
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
    if (admin) {
      console.log(admin)
      auth.setAdmin(true)
    }
  }
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
    auth.setisAuthenticated(false)
    auth.setIdee(null)
    auth.setAdmin(false)
  }, [])


  return { login, logout, token, userId }
}
