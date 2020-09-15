import React from "react"
import { connect } from "react-redux"

const CartCount = ({cart}) => {

    return (
        <div>
            {`Cart ${cart.length}`}
        </div>
    )
}

const mapStateToProps = ({total, cart}) => {
    return {total, cart}
}

export default connect(mapStateToProps)(CartCount)