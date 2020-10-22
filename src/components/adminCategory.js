import React, { useState } from "react"
import config from "../config"
import { useHttp } from "../hooks/http.hook"

const AdminCategory = props => {
  const { name, categories, setCategories } = props
  const [updating, setIsUpdating] = useState(false)
  const [updatedValue, setUpdatingValue] = useState(name)

  const { baseUrl } = config
  const { request } = useHttp()

  const inputHandler = e => {
    setUpdatingValue(e.target.value)
  }
  const clickHandler = () => {
    setIsUpdating(true)
  }
  const updateHandler = async () => {
    if (updatedValue !== name) {
      try {
        const data = await request(`${baseUrl}api/categories/update`, "POST", {
          oldcategory: name,
          newcategory: updatedValue,
        })
        console.log(data)
        const newCategories = categories.map(a => {
          if (a === name) {
            a = updatedValue
          }
        })
        setCategories([...newCategories])
      } catch (e) {
        console.log(e)
      }
    }
    setIsUpdating(false)
  }

  const deleteHandler = async () => {
    try {
      const data = await request(`${baseUrl}api/categories/delete`, "POST", {
        oldcategory: name,
      })
      console.log(data)
      const newCategories = categories.filter(a => {
        if (a === name) {
          return
        }
        return a
      })
      setCategories([...newCategories])
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        disabled={!updating}
        value={updatedValue}
        onChange={inputHandler}
        style={{
          width: "50%",
        }}
      />
      {!updating ? (
        <button onClick={clickHandler}>Update</button>
      ) : (
        <button onClick={updateHandler}>Finish</button>
      )}
      <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default AdminCategory
