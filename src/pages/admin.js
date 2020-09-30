import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import AdminRoute from "../components/adminRoute"
import AdminPage from "../pagepriv/adminPage"
import AdminWares from "../pagepriv/adminWares"

const admin = () => (
  <Layout>
    <Router>
    <AdminRoute path="/admin/main" component={AdminPage}/>
    <AdminRoute path="/admin/wares" component={AdminWares}/>
    </Router>
  </Layout>
)
export default admin