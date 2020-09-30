import React from "react"
import { connect } from "react-redux"

const CartCount = ({cart}) => {

    return (
        <div>
            {`Cart ${cart.length}`}
        </div>
    )
}

const mapStateToProps = ({cart}) => {
    return {cart}
}

export default connect(mapStateToProps)(CartCount)