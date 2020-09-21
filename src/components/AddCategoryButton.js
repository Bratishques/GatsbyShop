import React from "react"

const AddCategoryButton = (props) => {
    const {categoryAdder, setCategoryAdder} = props
    const clickHandler = () => {
        setCategoryAdder(!categoryAdder)
    }

    return (
        <button onClick = {clickHandler}>+</button>
    )
}

export default AddCategoryButton