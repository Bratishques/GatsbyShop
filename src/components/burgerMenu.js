import React, { useState } from "react"
import menuIcon from '../images/menu.svg'

const BurgerMenu = (props) => {
    const {setOpen, open} = props
    const clickHandler = () => {
        setOpen(!open)
        console.log("I'm clicked")
    }
    
    return (
        <div className = {`burger-menu-trigger`} onClick = {clickHandler}>
        <img src={menuIcon} style = {{
            width: "30px",
            height: "30px",
            marginBottom: "0"
        }}/>
        </div>

    )
}

export default BurgerMenu