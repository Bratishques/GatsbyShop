import React, { useState } from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import {Auth} from "../components/auth"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Cart from "../components/cart"

const IndexPage = () => (



  <Layout>
    <SEO title="Home" />
    <Auth/>
    <Cart/>
  </Layout>
 
)

export default IndexPage
