import { createStore as reduxCreateStore } from "redux"
import {loadState} from "../components/localstorage"

export const reducer = (state, action) => {
  let ware = action.payload

  if (action.type == `LOAD_CART`) {
    return Object.assign({}, state, {
      cart: [...ware]
    })
  }

  if (action.type === `ADD_ITEM`) {
    return Object.assign({}, state, {
      cart: [...state.cart, 
      {
      ware: ware,
      id: ware._id,
      count: 1
    }
      ]
    })
  }

  if (action.type === `INCREASE_AMOUNT`) {
    return Object.assign({}, state, {
      cart: state.cart.map(obj => {
          if (ware._id === obj.id) {
            return {...obj, count: obj.count + 1}
          }
          return obj
        }).filter(obj => Object.keys(obj).length !== 0)
      
    })
  }

  if (action.type === `DECREASE_AMOUNT`) {
    return Object.assign({}, state, {
      cart: state.cart.map(obj => {
          if (ware._id === obj.id && obj.count > 1) {
            return {...obj, count: obj.count - 1}
          }
          if (ware._id === obj.id) {
            return {}
          }
          return obj
        }).filter(obj => Object.keys(obj).length !== 0)
    })
  }

  return state
}

const persistedState = loadState()





const createStore =  () => reduxCreateStore(reducer, persistedState)
export default createStore