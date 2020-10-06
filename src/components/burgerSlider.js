import React, { useEffect, useState } from "react"
import "./burger.scss"

const BurgerSlider = ({children, open, click}) => {
    
    

    // useEffect(() => {
    //     async function delayAnim(ms) {
    //       function sleep(ms) {
    //         return new Promise(resolve => setTimeout(resolve, ms));
    //       }
    //       console.log("it's a me, Window!")
    //       await sleep(ms)
    //       setHidden(false)
    //     }
        
    //     document.addEventListener('DOMContentLoaded', delayAnim(1000))
    //   }, [])

    return <div className = {`burger-slider-wrap ${click > 0 ? (open ? `open` : `closed`) : null} `}>
        <div className = {`burger-slider ${click > 0 ? (open ? `open` : `closed`) : null} ` }>
        <div className = {`burger-children-grid`}>
       {children.props.children}
       </div>
       </div>
    </div>
}

export default BurgerSlider