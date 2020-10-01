import React from "react"

const DroppedCategory = props => {
  const { catName, changeForm } = props
  return (

    <button className="category-dropped" onClick={changeForm} value = {catName}>
      {catName}
    </button>

  )
}

export default DroppedCategory