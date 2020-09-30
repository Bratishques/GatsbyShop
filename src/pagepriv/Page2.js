import React, { useContext } from "react"

import { AuthContext } from "../context/authContext"

const SecondPage = () => {
  const auth = useContext(AuthContext)
  const message = () => {
    if (auth.isAuthenticated) {
      return <div>Hello, neighbour!</div>
    }
  }

  return <div>{message()}</div>
}

export default SecondPage
