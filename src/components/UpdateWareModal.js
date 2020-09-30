import React, { useState} from "react"
import AddWareImage from "./AddWareImage"
import AddWareInput from "./AddWareInput"
import CategoryInput from "./CategoryInput"
import config from "../config"

export const UpdateWareModal = props => {
  const { name, image, price, inStock , description, isUpdating, setIsUpdating, category} = props
  const [loading, setLoading] = useState(false)
  const {baseUrl} = config

  const defForm = {
    Name: {
      value: name,
      isValid: true,
    },
    Description: {
      value: description,
      isValid: true,
    },
    Category: {
      value: category.name,
      isValid: true,
    },
    Price: {
      value: price,
      isValid: true,
    },
    "In Stock": {
      value: inStock,
      isValid: true,
    },
  }
  const [file, setFile] = useState({
    image: false,
    preview: image,
  })

  const [form, setForm] = useState(defForm)

  const addWareFormValid = (file, form) => {
    const formValid = (form, file) => {
      for (let prop in form) {
        if (!form[prop].isValid) return false
      }
      if (file.image === false) {
      }
      return true
    }
    if (!formValid(form, file)) {
      return true
    } else return false
  }

  const closeWindow = () => {
    setIsUpdating(!isUpdating)
    setForm(defForm)
    setFile({
      image: false,
      preview: image,
    })
  }
  const changeFile = event => {
    const candidate = event.target.files[0]
    if (candidate) {
      if (
        candidate.size <= 2 * 1024 * 1024 &&
        (candidate.type === "image/png" || candidate.type === "image/jpeg")
      ) {
        setFile({
          image: event.target.files[0],
          preview: URL.createObjectURL(event.target.files[0]),
        })
      }
    }
  }
  const uploadFile = async () => {
    setLoading(true)
    const data = new FormData()
    const {Name} = form

    if (file.image) {
    data.append("file", file.image, Name["value"])
    }
    for (let key in form) {
      data.append(key, form[key]["value"])
    }
    for (let key in defForm) {
      data.append("def" + key, defForm[key]["value"])
    }
    console.log(data)
    const response = await fetch(`${baseUrl}api/products/update/`, {
      method: "POST",
      body: data,
    })
    const respData = await response.json()
    console.log(respData)
    await fetch(`http://localhost:8000/__refresh`, {method: "POST"})
    setLoading(false)
  }

  if (isUpdating) {
    return (
      <div className="modal">
        <div className="modal-wrapper">
          <div className="modal-container">
            <div className={`top-modal-container`}>
              <h4 className={`modal-top`}>Choose an Item to Add</h4>
              <button className={`closeModal`} onClick={closeWindow} disabled = {loading}>
                Close
              </button>
            </div>
            <div className={`input-grid`}>
              <div class="img">
                <AddWareImage changeFile={changeFile} wareImg={file} />
                <div className={`input-send`}>
                  <button
                    disabled={addWareFormValid(file, form)}
                    onClick={uploadFile}
                  >
                    Send Data
                  </button>
                </div>
              </div>
              <div class="data">
                <AddWareInput
                  className={"input-name"}
                  inputName={`Name`}
                  form={form}
                  setForm={setForm}
                />
                <AddWareInput
                  className={"input-description"}
                  inputName={`Description`}
                  form={form}
                  setForm={setForm}
                />
                <CategoryInput
                  className={"input-category"}
                  inputName={`Category`}
                  form={form}
                  setForm={setForm}
                />
                <AddWareInput
                  className={"input-price"}
                  inputName={`Price`}
                  form={form}
                  setForm={setForm}
                />
                <AddWareInput
                  className={"input-in-stock"}
                  inputName={`In Stock`}
                  form={form}
                  setForm={setForm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}