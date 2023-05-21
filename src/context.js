import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

let initialstate = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate)

  let clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }
  let removeCartItem = (id) => {
    dispatch({type: 'REMOVE', payload: id})
  }
  let increaseItemAmount = (id) => {
    dispatch({type: 'INCREASE', payload: id})
  }
  let decreaseItemAmount = (id) => {
    dispatch({type: 'DECREASE', payload: id})
  }

  let fetchData = async () => {
    dispatch({type: 'LOADING'})
    let response = await fetch(url);
    let cart = await response.json();
    dispatch({type: 'DISPLAY_ITEMS', payload: cart})
  } 

  let toggleAmount = (id, kind) => {
    dispatch({type: 'TOGGLE_AMOUNT', payload: {id, kind}})
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    dispatch({type: 'ADD_TOTALS'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCartItem,
        increaseItemAmount,
        decreaseItemAmount,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }