import React, { useContext } from "react"
import { navigate } from "gatsby"
import { AuthContext } from "../context/AuthContext"

const AdminRoute = ({ component: Component, location, ...rest }) => {
    const auth = useContext(AuthContext)
    if (!auth.isAuthenticated && location.pathname !== `/` && !auth.admin) {
      navigate("/")
      return null
    }
    return <Component {...rest} />
  }

  export default AdminRoute