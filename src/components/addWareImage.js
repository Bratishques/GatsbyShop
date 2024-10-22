import React from "react"

const AddWareImage = props => {
  const { changeFile, wareImg } = props
  console.log(wareImg.preview)

  const preview = () => {
    if (!wareImg.preview) {
      return <div className="img-input-blank">There is no file</div>
    } else {
      return <img className="img-input-blank" src={wareImg.preview} alt="preview"></img>
    }
  }
  return (
    <div className="input-img">
      {preview()}
      <label className ="file-label" htmlFor="file">
        Select file
      
      <input type="file" onChange={changeFile} id="file" />
      </label>
    </div>
  )
}

export default AddWareImage
