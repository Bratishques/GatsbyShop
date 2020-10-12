import React, { useState } from "react"
import AddWareImage from "./addWareImage"
import AddWareInput from "./addWareInput"
import CategoryInput from "./categoryInput"
import config from "../config"

export const UpdateWareModal = props => {
  const {
    name,
    image,
    price,
    inStock,
    description,
    isUpdating,
    setIsUpdating,
    category,
    wares,
    setWares
  } = props
  const [loading, setLoading] = useState(false)
  const { baseUrl } = config
  console.log(description)

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
      value: () => { if (category.name) return category.name 
        else return ""},
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

  const replaceWare = (
    name,
    image,
    price,
    inStock,
    description,
    category
  ) => {
    const newWares = wares.map(a => {
      if (a._id === props._id) {
        console.log(file.image.preview)
        if (!file.preview) {
          image = props.image
      
        }
        console.log(description)
        a.name = name
        a.image = image
        a.price = price
        a.inStock = inStock
        a.description = description
        a.category = category
        return a
      
      } else return a
    })
    setWares(newWares)
    return newWares
  }

  const closeWindow = () => {
 
    setIsUpdating(!isUpdating)
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
    const { Name, Category, Price, Description } = form

    

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
       
    replaceWare(
      Name.value,
      file.preview,
      Price.value,
      form["In Stock"].value,
      Description.value,
      Category.value,
    )
    console.log(respData)
    setLoading(false)
    closeWindow()
  }

  if (isUpdating) {
    return (
      <div className="modal">
        <div className="modal-wrapper">
          <div className="modal-container">
            <div className={`top-modal-container`}>
              <h4 className={`modal-top`}>Choose an Item to Add</h4>
              <button
                className={`closeModal`}
                onClick={closeWindow}
                disabled={loading}
              >
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
