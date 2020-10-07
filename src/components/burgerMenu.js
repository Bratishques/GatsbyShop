import React, { useState } from "react"
import menuIcon from '../images/menu.svg'

const BurgerMenu = (props) => {
    const {setOpen, open, setClick} = props
    const clickHandler = async () => {
        setOpen(!open)
        console.log("I'm clicked")
        setClick(1)
    }
    
    return (
        <div className = {`burger-menu-trigger`} onClick = {clickHandler}>
        <img src="https://gatsbyshop.hb.bizmrg.com/menu.svg" style = {{
            width: "30px",
            height: "30px",
            marginBottom: "0"
        }}/>
        </div>

    )
}

export default BurgerMenu