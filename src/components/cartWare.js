import React from "react"
import { connect } from "react-redux"


const CartWare = (props) => {
    console.log(props)
    
    const count = props.count
    const ware = props.ware
    const {image, name, price} = ware
    const preCount = () => {
        return Number(count * price).toFixed(2)
    }

    return (
        <div className={`cart-ware-grid`}>
        <img src={image} className={`cart-ware-image`} alt={name}></img>
        <div className={`cart-ware-middle`}>
            <div>{name} costs {price}</div>
            <div className={`cart-ware-buttons-div`}><button>+</button> {preCount()} <button>-</button></div>
        </div>
        </div>
    )
}

const mapStateToProps = ({ }) => {
    return { }
  }

const mapDispatchToProps = (dispatch, ownProps) => {
    const a = ownProps.a
    return {
      addItem: () =>
        dispatch({
          type: `ADD_ITEM`,
          payload: a,
        }),
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(CartWare)