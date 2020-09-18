import React, { useEffect, useState } from "react"

const AddWareInput = props => {
  const { className, inputName, form, setForm } = props
  
  const changeForm = (event) => {
    setForm({...form, 
        [event.target.name]:event.target.value
    })
  }

  if (inputName === "Category") {

   

    return (
      <div className={`${className}`}>
        {inputName}
        <div className="category-flex">
          <input type="text" name={`${inputName}`} className={`text-input`} />
          <button>+</button>
        </div>
      </div>
    )
  }

  if ((inputName === "Description")) {
    return (
      <div className={`${className}`}>
        {inputName}
        <textarea type="text" name={`${inputName}`} value={form[inputName]}  onChange={changeForm}/>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {inputName}
      <input type="text" name={`${inputName}`} className={`text-input`} value={form[inputName]} onChange={changeForm}/>
    </div>
  )
}

export default AddWareInput
