import React, { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AddWareInput from "./AddWareInput"
import CategoryInput from "./CategoryInput"

export const AddWareModal = props => {
  const { idee } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const { isAdding, setIsAdding } = props
  const [form, setForm] = useState({
      Name: "",
      Description: "",
      Category: "Category is not selected",
      Price: "",
      "In Stock": "",
  })
  const closeWindow = () => {
    setIsAdding(!isAdding)
    setFile(null)
  }
  const changeFile = event => {
    setFile(null)
    const candidate = event.target.files[0]
    if (candidate) {
      if (
        candidate.size <= 2 * 1024 * 1024 &&
        (candidate.type === "image/png" || candidate.type === "image/jpeg")
      ) {
        setFile(event.target.files[0])
      }
    }
  }
  const uploadFile = async () => {
    const data = new FormData()
    data.append("file", file, file.name)
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
                <div className = "input-img">
                <label class="file-label" for="file">
                    Yess
                </label>
                <input type="file" onChange={changeFile} id = "file"/>
                </div>
                <div className = {`input-send`}>
                <button disabled={!file} onClick={uploadFile}>
                  Send Data
                </button>
                </div>
              </div>
              <div class="data">
              <AddWareInput className = {"input-name"} inputName = {`Name`} form = {form} setForm = {setForm}/>
              <AddWareInput className = {"input-description"} inputName = {`Description`} form = {form} setForm = {setForm}/>
              <CategoryInput className = {"input-category"} inputName = {`Category`} form = {form} setForm = {setForm}/>
              <AddWareInput className = {"input-price"} inputName = {`Price`} form = {form} setForm = {setForm}/>
              <AddWareInput className = {"input-in-stock"} inputName = {`In Stock`} form = {form} setForm = {setForm} />
              
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}