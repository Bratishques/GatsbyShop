import React, { useState } from "react"
import { UpdateWareModal } from "./UpdateWareModal"
import "./ware.css"

const AdminWare = (props) => {
    const [isUpdating, setIsUpdating] = useState(false)
    
    
    return (
        <div>
        <UpdateWareModal/>

        </div>

    )
}