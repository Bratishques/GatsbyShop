import React from "react"

const DroppedCategory = props => {
  const { catName, changeForm } = props
  return (

    <button className="category-dropped" onClick={changeForm} value = {catName} style={{
      color:"black"
    }}>
      {catName}
    </button>

  )
}

export default DroppedCategory