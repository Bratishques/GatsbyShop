import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import AdminRoute from "../components/adminRoute"
import AdminPage from "../pagepriv/adminPage"
import AdminWares from "../pagepriv/adminWares"
import AdminCategories from "../pagepriv/adminCategories"

const admin = () => (
  <Layout>
    <Router>
    <AdminRoute path="/admin/main" component={AdminPage}/>
    <AdminRoute path="/admin/wares" component={AdminWares}/>
    <AdminRoute path="/admin/categories" component={AdminCategories}/>
    </Router>
  </Layout>
)
export default admin