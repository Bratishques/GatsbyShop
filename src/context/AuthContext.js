import React, { createContext, useState, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import config from "../config"
import { connect } from "react-redux"
import { useAuth } from "../hooks/auth.hook"
export const AuthContext = createContext()
export const isBrowser = () => typeof window !== "undefined"

const storageName = "accdata"

const GlobalContextProvider = ({ children, loadCart, cart }) => {
  const data = (() => {
    if (isBrowser() && window.localStorage.getItem(storageName)) {
      return JSON.parse(window.localStorage.getItem(storageName))
    } else return false
  })()
  const { request, error } = useHttp()
  const [isAuthenticated, setisAuthenticated] = useState(!!data.token)
  const [idee, setIdee] = useState(null)
  const [admin, setAdmin] = useState(false)
  const {logout} = useAuth()
  const { baseUrl } = config

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
          logout()
        }
      }
    }

    callVerify()
  }, [isAuthenticated])

  useEffect(() => {
    async function getCart() {
      if (isAuthenticated && cart.length === 0) {
        const id = JSON.parse(localStorage.getItem("accdata")).userId
        const data = await fetch(`${baseUrl}api/profile/getcart/${id}`, {
          method: "GET",
        })
        const response = await data.json()
        console.log(response)
        loadCart(response.cart)
      } else if (isAuthenticated && cart.length !== 0) {
        const id = JSON.parse(localStorage.getItem("accdata")).userId
        let body = {
          cart: cart,
          id: id,
        }
        const data = await fetch(`${baseUrl}api/profile/cart`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const response = await data.json()
        console.log(response)
      }
    }
    getCart()
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

const mapStateToProps = ({ cart }) => {
  return { cart }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCart: cart =>
      dispatch({
        type: `LOAD_CART`,
        payload: cart,
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalContextProvider)
