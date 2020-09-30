import React, { useState, useEffect } from "react"
import config from "../config"
import { useHttp } from "../hooks/http.hook"

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
    return <>{ware.description}</>
  }
  return (
    <>
      Hello! This a description of Ware that you have clicked on
      <br />
      {itemData()}
    </>
  )
}
