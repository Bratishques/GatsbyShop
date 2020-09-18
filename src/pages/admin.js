import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import AdminRoute from "../components/AdminRoute"
import AdminPage from "../pagepriv/AdminPage"
import AdminWares from "../pagepriv/AdminWares"

const admin = () => (
  <Layout>
    <Router>
    <AdminRoute path="/admin/main" component={AdminPage}/>
    <AdminRoute path="/admin/wares" component={AdminWares}/>
    </Router>
  </Layout>
)
export default admin