import React, { useState } from "react"
import config from "../config"
import { useHttp } from "../hooks/http.hook"

const AdminCategory = (props) => {
    const {name} = props
    const [updating, setIsUpdating] = useState(false)
    const [updatedValue, setUpdatingValue] = useState(name)
  
    const {baseUrl} = config
    const {request} = useHttp()

    const inputHandler = (e) => {
        setUpdatingValue(updatedValue)
    }
    const clickHandler = () => {
        setIsUpdating(true)
    }
    const updateHandler = async () => {
        if (updatedValue !== name) {
            console.log(name,updatedValue)
            const data = await request(`${baseUrl}api/categories/update`, "POST", {
                oldcategory: name,
                newcategory: updatedValue
            })
            console.log(data.json())
        }
        setIsUpdating(false)
    }

    return (
        <div style= {{
            marginBottom: "20px"
        }}>
            <input type="text" disabled = {!updating} value={updatedValue} onChange={inputHandler} style={{
                width: "50%"
            }}/>
            {!updating ? <button onClick = {clickHandler}>
                Update
            </button> : <button onClick = {updateHandler}>
                Finish
            </button>}
            <button>
                Delete
            </button>
        </div>
    )
}

export default AdminCategory