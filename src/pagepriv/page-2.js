import React, { useContext } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { AuthContext } from "../context/AuthContext"

const SecondPage = () => {
  const auth = useContext(AuthContext)
  const message = () => {
    if (auth.isAuthenticated) {
      return (
      <div>Hello, neighbour!</div>
      )
    }
  }

  return (

    <div>
    {message()}

    </div>

   
  )
}

export default SecondPage
