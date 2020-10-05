import React from "react"

const adminCategory = (props) => {

    const {name} = props
    return (
        <div>
            <div>{name}</div>
            
            <button>
                Update
            </button>
            <button>
                Delete
            </button>
        </div>
    )
}

export default adminCategory