import React, { useState } from "react"
import { UpdateWareModal } from "./UpdateWareModal"
import { StaticQuery, graphql } from "gatsby"
import "./ware.css"

const AdminWare = props => {
  const [isUpdating, setIsUpdating] = useState(false)
  const { name, image, price, inStock, description, category } = props

  const openModal = () => {
      setIsUpdating(true)
  }

  return (
    <div>
      <UpdateWareModal
        {...props}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
      />
      <div className="ware">
        <img className="wareImage" src={image} />
        <div className="price">{price}</div>
        <div>{name} <button onClick={openModal}>Update</button></div>
      </div>
    </div>
  )
}

export default AdminWare
