import React, { useContext } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { AuthContext } from "../context/AuthContext"

const SecondPage = () => {
  const auth = useContext(AuthContext)
  const message = () => {
    if (auth.authenticated) {
      return (
      <div>Hello, neighbour!</div>
      )
    }
  }

  return (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    {message()}
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
  )
}

export default SecondPage
