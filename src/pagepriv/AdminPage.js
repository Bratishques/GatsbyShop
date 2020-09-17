import React, { useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { Link } from "gatsby"

const AdminPage = () => {
  const auth = useContext(AuthContext)

  const AdminLink = () => {
      
  }
  const message = () => {
    if (auth.admin) {
      return <div>This is an Admin Panel and I'm too lazy to do it!</div>
    }
  }

  return <div>
  {message()}<br/>

  Please choose what do you need to do
  <br/>
  <br/>
  <div>
  <button>
  <Link to={`/admin/wares`}>Change the displayed wares</Link>
  </button>
  <button>
  <Link to={`/admin/users`}>Promote, delete and change users</Link>
  </button>
  </div>

  </div>
}

export default AdminPage