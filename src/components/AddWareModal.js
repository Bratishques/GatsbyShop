import React, { useState} from "react"
import AddWareImage from "./AddWareImage"
import AddWareInput from "./AddWareInput"
import CategoryInput from "./CategoryInput"

export const AddWareModal = props => {
  const defForm = {
    Name: {
      value: "",
      isValid: false,
    },
    Description: {
      value: "",
      isValid: false,
    },
    Category: {
      value: "No category selected",
      isValid: false,
    },
    Price: {
      value: "",
      isValid: false,
    },
    "In Stock": {
      value: "",
      isValid: false,
    },
  }
  const [file, setFile] = useState({
    image: false,
    preview: false,
  })
  const { isAdding, setIsAdding, wares, setWares } = props
  const [form, setForm] = useState(defForm)

  const addWareFormValid = (file, form) => {
    const formValid = (form, file) => {
      for (let prop in form) {
        if (!form[prop].isValid) return false
      }
      if (file.image === false) {
        return false
      }
      return true
    }
    if (!formValid(form, file)) {
      return true
    } else return false
  }

  const closeWindow = () => {
    setIsAdding(!isAdding)
    setFile({
      image: false,
      preview: false,
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
    const data = new FormData()
    const { Name, Description, Category, Price } = form
    const inStock = form["In Stock"]
    data.append("file", file.image, Name["value"])
    console.log(Name, Description, Category, Price, inStock)
    for (let key in form) {
      console.log(key)
      data.append(key, form[key]["value"])
    }
    setFile({
      image: false,
      preview: false,
    })
    console.log(data)
    const response = await fetch(`/api/products/add/`, {
      method: "POST",
      body: data,
    })
    const respData = await response.json()
    console.log(respData)
    setWares([...wares, respData._doc])
    setFile({
      image: false,
      preview: false,
    })
    setForm(defForm)
  }

  if (isAdding) {
    return (
      <div className="modal">
        <div className="modal-wrapper">
          <div className="modal-container">
            <div className={`top-modal-container`}>
              <h4 className={`modal-top`}>Choose an Item to Add</h4>
              <button className={`closeModal`} onClick={closeWindow}>
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
