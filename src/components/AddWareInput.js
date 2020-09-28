import React, { useState } from "react"

const AddWareInput = props => {
  const { className, inputName, form, setForm } = props

  const changeForm = event => {
    checkValidity(event)
  }

  const [valid, setValid] = useState({
    isValid: true,
    error: "",
  })

  const checkValidity = event => {
    const floatReg = /^[1-9]{1}\d*\.\d{2}$/gi
    const intReg = /^[1-9]{1}\d*$/gi
    const validated = event.target.value
    const setFormValidity = bool => {
      setForm({
        ...form,
        [inputName]: {
          value: event.target.value,
          isValid: bool,
        },
      })
    }
    if (validated.length === 0) {
      setValid({
        isValid: false,
        error: `${inputName} is required`,
      })
      setFormValidity(false)
      return
    }
    if (inputName === "Price" && !floatReg.test(validated)) {
      setValid({
        isValid: false,
        error: `${inputName} must be in a readable format`,
      })
      setFormValidity(false)
      return
    }

    if (inputName === "In Stock" && !intReg.test(validated)) {
      setValid({
        isValid: false,
        error: `${inputName} must be an integer`,
      })
      setFormValidity(false)
      return
    }

  
    setValid({
      isValid: true,
      error: "",
    })
    setFormValidity(true)

  }

  const errField = (isValid, error) => {
    if (!isValid) {
      return <div className="input-error">{error}</div>
    }
    return null
  }

  if (inputName === "Description") {
    return (
      <div className={`${className}`}>
        {inputName}
        <textarea
          type="text"
          name={`${inputName}`}
          value={form[inputName]["value"]}
          onChange={changeForm}
        />
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {inputName}
      <div>
        <input
          type="text"
          name={`${inputName}`}
          className={`text-input`}
          value={form[inputName]["value"]}
          onChange={changeForm}
        />
        {errField(valid.isValid, valid.error)}
      </div>
    </div>
  )
}

export default AddWareInput
