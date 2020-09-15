import React, { useState, useEffect, useContext } from "react"
import { Link, navigate } from "gatsby"
import {Auth} from "../components/auth"
import Layout from "../components/layout"

import SEO from "../components/seo"
import Cart from "../components/cart"
import { AuthContext } from "../context/AuthContext"

const IndexPage = () => {

  const auth = useContext(AuthContext)
  
useEffect(() => {
  if (auth.isAuthenticated) {
    navigate(`/browse`)
  }
})

return (
  <Layout>
    <SEO title="Home" />
    <Auth/>
    <Cart/>
  </Layout>
  )

 
}

export default IndexPage
