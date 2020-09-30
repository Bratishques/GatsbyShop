import React, { useState, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"

export const ItemPage = props => {
  const { request, loading } = useHttp()
  const [ware, setWare] = useState({})
  let id = props.id

  useEffect(() => {
    async function getInfo() {
      try {
        const info = await request(`/api/item/${id}`, "PUT")
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
      Hello!
      <br />
      {itemData()}
    </>
  )
}
