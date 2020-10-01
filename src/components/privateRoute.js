import React, { useContext } from "react"
import { navigate } from "gatsby"
import { AuthContext } from "../context/authContext"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const auth = useContext(AuthContext)
    if (!auth.isAuthenticated && location.pathname !== `/`) {
      navigate("/")
      return null
    }
    return <Component {...rest} />
  }

  export default PrivateRoute