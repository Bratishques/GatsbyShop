import React from "react"
import "./burger.scss"

const BurgerSlider = ({children, open}) => {
    console.log(children)
    return <div className = {`burger-slider-wrap ${open ? `open` : `closed`}`}>
        <div className = {`burger-slider`}>
        <div className = {`burger-children-grid`}>
       {children.props.children}
       </div>
       </div>
    </div>
}

export default BurgerSlider