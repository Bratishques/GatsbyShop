import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import SecondPage from "../pagepriv/Page2"
import {Profile} from "../pagepriv/Profile"
import PrivateRoute from "../components/privateRoute"
import {ItemPage} from "../components/ItemPage"
import AdminRoute from "../components/AdminRoute"
import AdminPage from "../pagepriv/AdminPage"

const admin = () => (
  <Layout>
    <Router>
    <AdminRoute path="/admin/main" component={AdminPage}/>
    </Router>
  </Layout>
)
export default admin