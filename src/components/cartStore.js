import React, { useContext, useState, useEffect } from "react"
import { connect } from "react-redux"

const Cart = ({cart, addItem, total}) => {
    const [myCart, setmMyCart] = useState([])

    useEffect(() => {
        setmMyCart([...myCart, ...cart])
    },[cart])

    const items = () => {
        return (
            <>
            {myCart.map(a => {
                return (
                    <div>
                        
                        <br/>
                        {a.id}
                    </div>
                )
            })}
            </>
        )
    }
    return (
        <>
        {items()}
        {total}
        </>
    )
}

const mapStateToProps = ({total, cart}) => {
    return {total, cart}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const a = ownProps.a
    return { addItem: () => dispatch({ 
        type: `ADD_ITEM`,
        payload: a
    }) }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Cart)