import React, { useState } from "react"

const ModalWindow = props => {
    
  const { children } = props
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-container">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
