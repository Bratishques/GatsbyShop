import React, { useEffect, useState } from "react"
import LocaleCurrency from "locale-currency"

const Price = props => {
  const [price, setPrice] = useState(props.price)
  const [currency, setCurrency] = useState("USD")
  const userLang = navigator.language || navigator.userLanguage
  console.log("mounted")

//   const conversion = () => {
//     const resultCurrency = LocaleCurrency.getCurrency(userLang)
//     setCurrency(resultCurrency)
//   }

//   useEffect(() => {
//     conversion()
//   }, [])
  const className = props.className

  return (
    <div className={className}>
      {" "}
      {Intl.NumberFormat(userLang, {
        style: "currency",
        currency: currency,
      }).format(price)}{" "}
    </div>
  )
}

export default Price
