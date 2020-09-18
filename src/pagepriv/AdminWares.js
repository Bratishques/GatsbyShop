import React, { useState } from "react"
import "./Profile.css"
import "./AdminPage.css"
import {AddWareModal} from "../components/AddWareModal"

const AdminWares = () => {

    const [isAdding, setIsAdding] = useState(false)

    const addNewItem = () => {
        setIsAdding(!isAdding)
    }

    return (
        <div>
            <AddWareModal isAdding = {isAdding} setIsAdding = {setIsAdding} />
            <button onClick={addNewItem}>
                Add a new Item ++
            </button>
            <br/>
            Browse and Modify
        </div>
    )
}

export default AdminWares