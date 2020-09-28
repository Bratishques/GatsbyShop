import React, { useState } from "react"
import { UpdateWareModal } from "./UpdateWareModal"

import "./ware.css"

const AdminWare = props => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [loading, setLoadng] = useState(false)
  const { name, image, price, wares, setWares } = props
  console.log(process.env)
  const openModal = () => {
      setIsUpdating(true)
  }

  const deleteProduct = async () => {
    setLoadng(true)
    const data = new FormData()
    for (let key in props) {
      data.append(key, props[key])
    }
    const response = await fetch(`/api/products/delete/`, {
      method: "POST",
      body: data,
    })
    const respData = await response.json()
    console.log(respData)
    await fetch(`http://localhost:8000/__refresh`, {method: "POST"})
    setLoadng(false)
    const newWares = wares.filter(a => {
      if (a.name === name) {
        return
      }
      return a
    })
    setWares(newWares)
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
        <div >{name} <button onClick={openModal} disabled={loading} >Update</button> <button onClick={deleteProduct} disabled={loading}>Delete</button></div>
      </div>
    </div>
  )
}

export default AdminWare
