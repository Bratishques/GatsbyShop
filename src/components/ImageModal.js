import React, { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const ImageModal = props => {
  const {idee} = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const { isUploading, setIsUploading } = props
  const closeWindow = () => {
    setIsUploading(!isUploading)
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
    data.append('file', file, file.name)
    data.append('id',idee)
    console.log(data)
    setFile(null)
    const response = await fetch(`/api/profile/setimg/${idee}`, {method: "POST", body: data}, )
    const respData = await response.json()
    console.log(respData)
    window.location.reload()
  }

  if (isUploading) {
    return (
      <div className="modal">
        <div className="modal-wrapper">
          <div className="modal-container">
            <div className={`top-modal-container`}>
              <h4 className={`modal-top`}>Choose an Image to Upload</h4>
              <button className={`closeModal`} onClick={closeWindow}>
                Close
              </button>
            </div>
            <label class="file-label" for="name">
              Select file
              </label>
            <input type="file" id="name" onChange={changeFile}/>
            <button disabled = {!file} onClick = {uploadFile}>Send File!</button>
          </div>
        </div>
      </div>
    )
  }
  return null
}
