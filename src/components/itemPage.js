import React, { useState, useEffect } from "react"
import config from "../config"
import { useHttp } from "../hooks/http.hook"
import "./itemPage.css"

export const ItemPage = props => {
  const { request, loading } = useHttp()
  const [ware, setWare] = useState({})
  const {baseUrl} = config

  let id = props.id

  useEffect(() => {
    async function getInfo() {
      try {
        const info = await request(`${baseUrl}api/item/${id}`, "PUT")
        setWare({ ...info })
      } catch (e) {}
    }
    getInfo()
  }, [])

  const itemData = () => {
    return <div className="item-page-ware">
    <img src={ware.image} className="item-page-ware-image"/>
    <div>
    <h4>{ware.name}</h4>
    {ware.description}<br/>
    Category: {ware.category.name}
    </div>
    </div>
  }
  return (
    <>
      <br />
      <br />
      {ware.name && itemData()}
    </>
  )
}
