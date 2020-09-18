import React, { useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { Link } from "gatsby"
import styled from 'styled-components';
import "./AdminPage.css"

const AdminPage = () => {
  const auth = useContext(AuthContext)

  const AdminLink = styled(Link)`
    text-decoration: none;
    color: green;
  `

  
  return (
    <div>
      Please choose what do you need to do
      <br />
      <br />
      <div className="admin-buttons">
        <button>
          <AdminLink to={`/admin/wares`}>Change the displayed wares</AdminLink>
        </button>
        <button>
          <AdminLink to={`/admin/users`}>
            Promote, delete and change users
          </AdminLink>
        </button>
      </div>
    </div>
  )
}

export default AdminPage