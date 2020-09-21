import React, { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "gatsby"
import styled from "styled-components"
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
        <AdminLink to={`/admin/wares`}>
          <button>Change the displayed wares</button>
        </AdminLink>

        <AdminLink to={`/admin/users`}>
          <button>Promote, delete and change users</button>
        </AdminLink>
      </div>
    </div>
  )
}

export default AdminPage
