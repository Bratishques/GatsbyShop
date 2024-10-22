import React from "react"
import { connect } from "react-redux"
import Price from "./price"

const CartWare = props => {
  console.log(props)
  const { increaseAmount, decreaseAmount } = props
  const count = props.count
  const ware = props.ware
  const { image, name, price, inStock } = ware
  const preCount = () => {
    return Number(count * price).toFixed(2)
  }
  const notInStock = () => {
    if (count === inStock) {
      return true
    }
    return false
  }
  return (
    <div className={`cart-ware-grid`}>
      <img src={image} className={`cart-ware-image`} alt={name}></img>
      <div className={`cart-ware-middle`}>
        <div>
          <h4 className={`cart-ware-name`}>{name}</h4> costs {price}
        </div>
        <div className={`cart-ware-buttons-div`}>
          <button onClick={increaseAmount} disabled = {notInStock()} style ={{
            marginRight: "10px"
          }}>+</button> { <Price  price = {preCount()}/>}
          <button onClick={decreaseAmount} style ={{
            marginLeft: "10px"
          }}>-</button>
        </div>
      </div>
      <div className={`cart-ware-count-flex`}>{count}</div>
     
    </div>
  )
}

const mapStateToProps = ({}) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const a = ownProps.ware
  return {
    increaseAmount: () =>
      dispatch({
        type: `INCREASE_AMOUNT`,
        payload: a,
      }),
    decreaseAmount: () =>
      dispatch({
        type: `DECREASE_AMOUNT`,
        payload: a,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWare)
