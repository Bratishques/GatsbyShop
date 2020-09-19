import React, { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AddWareImage from "./AddWareImage"
import AddWareInput from "./AddWareInput"
import CategoryInput from "./CategoryInput"

export const AddWareModal = props => {
  const { idee } = useContext(AuthContext)
  const [file, setFile] = useState({
    image: false,
    preview: false,
  })
  const { isAdding, setIsAdding } = props
  const [form, setForm] = useState({
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
  })

  const closeWindow = () => {
    setIsAdding(!isAdding)
    setFile({
      image: false,
      preview: false,
    })
  }
  const changeFile = event => {
    setFile({
      image: false,
      preview: false,
    })
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
    data.append("file", file.image, file.image.name)
    data.append("id", idee)
    console.log(data)
    setFile(null)
    const response = await fetch(`/api/profile/setimg/${idee}`, {
      method: "POST",
      body: data,
    })
    const respData = await response.json()
    console.log(respData)
    window.location.reload()
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
                  <button disabled={!file.image} onClick={uploadFile}>
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
