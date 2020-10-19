import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import "./adminPage.css"

const AdminPage = () => {

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
        <AdminLink to={`/admin/categories`}>
          <button>Change the categories</button>
        </AdminLink>
        <AdminLink to={`/admin/users`}>
          <button>Promote, delete and change users</button>
        </AdminLink>
      </div>
    </div>
  )
}

export default AdminPage
