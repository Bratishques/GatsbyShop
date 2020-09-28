import React from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import "./ware.css"
const Ware = ({total, addItem, a, cart, increaseAmount, decreaseAmount}) => {

    const wareButton = () => {
        const find = () => {
            for (let elem of cart) {
                if (elem.id === a._id && elem.count > 0) {
                    return true
                }
            }
            return false
        }

        const amount = () => {
            for (let elem of cart) {
                if (elem.id === a._id) {
                    return elem.count
                }
            }
        }
        
        if (!find()) {
            return (
            <>
            <button onClick={addItem}>{`ADD TO CART`}</button>
            </>
            )
        }
        if (find()) {
            return (
                <>
            <button onClick={increaseAmount}>{`ADD MORE ${total}`}</button>
            {amount()}
            <button onClick={decreaseAmount}>{`DELETE SHIT`}</button>
            </>
            )
        }
    }

    return (
        <div className = "ware">
        <Link to={`/app/ware/${a._id}`} style = {
            {
                textDecoration: "none",

            }
        }>
        <img className = "wareImage" src={a.image} alt={a.name}/>
        <div className = "price">{a.price}</div>
        
        
        </Link>
        <div>{a.name}
        {wareButton()}
        </div>
        </div>
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
            }),
            increaseAmount: () => dispatch({
                type: `INCREASE_AMOUNT`,
                payload: a
            }),
            decreaseAmount: () => dispatch({
                type: `DECREASE_AMOUNT`,
                payload: a
            })
}
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Ware)