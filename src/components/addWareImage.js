import React from "react"

const AddWareImage = props => {
  const { changeFile, wareImg } = props
  console.log(wareImg.preview)

  const preview = () => {
    if (!wareImg.preview) {
      return <div className="img-input-blank">There is no file</div>
    } else {
      return <img className="img-input-blank" src={wareImg.preview}></img>
    }
  }
  return (
    <div className="input-img">
      {preview()}
      <label class="file-label" for="file">
        Select file
      </label>
      <input type="file" onChange={changeFile} id="file" />
    </div>
  )
}

export default AddWareImage
