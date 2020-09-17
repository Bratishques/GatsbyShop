import React, { useContext } from "react"

import { AuthContext } from "../context/AuthContext"

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
