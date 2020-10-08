import React, { useState } from "react"
import config from "../config"
import { UpdateWareModal } from "./updateWareModal"

import "./ware.css"

const AdminWare = props => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [loading, setLoadng] = useState(false)
  const { name, image, price, wares, setWares, _id } = props
  const { baseUrl } = config
  const openModal = () => {
    setIsUpdating(true)
  }

  const deleteProduct = async () => {
    setLoadng(true)
    const data = new FormData()
    for (let key in props) {
      data.append(key, props[key])
    }
    const response = await fetch(`${baseUrl}api/products/delete/`, {
      method: "POST",
      body: data,
    })
    const respData = await response.json()
    console.log(respData)
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
        setWares={setWares}
        wares={wares}
      />
      <div className="ware">
        <img className="wareImage" src={image} />
        <div className="ware-pricename-grid">

          <div className="ware-pricename-name">
            <h4 style={{marginBottom: "0"}}>{name}</h4>
          </div>
          <div className="ware-pricename-price">{price}</div>
        </div>
        <div className={`ware-buttons`} style={{ width: "auto" }}>
          {" "}
          <button onClick={openModal} disabled={loading}>
            Update
          </button>{" "}
          <button onClick={deleteProduct} disabled={loading}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminWare
