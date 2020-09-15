import React from "react"

export const ImageModal = props => {
    const {isUploading, setIsUploading} = props
    if (isUploading) {
    return (
        <div class="modal" v-show="setName">
            <div class="modal-wrapper">
            <div class="modal-container">
            <h4>This is modal</h4>
            <input type="text" name="Name" id="name" />
            </div>
         </div>
        </div>
  )}
  return null
}
