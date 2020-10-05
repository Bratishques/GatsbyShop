import config from "../config"

const { baseUrl } = config

export const loadState = () => {

  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) {
      return { cart: [] }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = async state => {
  try {
 
    const serializedState = JSON.stringify(state)
    if (localStorage.getItem("accdata")) {
        var id = JSON.parse(localStorage.getItem("accdata")).userId
    }
    
    if (id) {
        let body = {
            cart: state.cart,
            id: id,
        }
      const data = await fetch(`${baseUrl}api/profile/cart`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
          },
      })
      const response = await data.json()
      console.log(response)
    }
    localStorage.setItem("state", serializedState)



  } catch (err) {
      console.log(err)
  }
}
