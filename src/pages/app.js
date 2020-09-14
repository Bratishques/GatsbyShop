import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import SecondPage from "../pagepriv/page-2"
import PrivateRoute from "../components/privateRoute"
import {ItemPage} from "../components/ItemPage"

const App = () => (
  <Layout>
    <Router>
    <PrivateRoute path="/app/page2" component={SecondPage}/>
    <ItemPage path = "/app/ware/:id"/>
    </Router>
  </Layout>
)
export default App