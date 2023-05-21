const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART'){
        return {...state, cart: []}
    }
    if(action.type === 'REMOVE'){
        return {...state, cart: state.cart.filter((item) => {
            return item.id !== action.payload
        })}
    }

    // if(action.type === 'INCREASE'){
    //     let tempcart = state.cart.map((cartItem) => {
    //         if(cartItem.id === action.payload){
    //             return {...cartItem, amount: cartItem.amount + 1}
    //         }
    //         return cartItem;
    //     })
    //     return {...state, cart: tempcart}
    // }

    // if(action.type === 'DECREASE'){
    //     let tempcart = state.cart.map((cartItem) => {
    //         if(cartItem.id === action.payload){
    //             return {...cartItem, amount: cartItem.amount - 1}
    //         }
    //         return cartItem
    //     }).filter((cartItem) => cartItem.amount >= 1);
    //     return {...state, cart: tempcart}
    // }

    if(action.type === 'ADD_TOTALS'){
        let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
            const {price, amount} = cartItem;
            cartTotal.amount += amount;
            cartTotal.total += amount * price;
            return cartTotal
        }, {
            total: 0,
            amount: 0
        })
        return {...state, total, amount}
    }

    if(action.type === 'LOADING'){
        return {...state, loading: true}
    }

    if(action.type === 'DISPLAY_ITEMS'){
        return {...state, cart: action.payload, loading: false}
    }

    if(action.type === 'TOGGLE_AMOUNT'){
        let tempcart = state.cart.map((cartItem) => {
            let {id, kind} = action.payload
            if(cartItem.id === id){
                if(kind == 'inc'){
                    return {...cartItem, amount: cartItem.amount + 1}
                } else {
                    return {...cartItem, amount: cartItem.amount - 1}
                }
            }
            return cartItem;
        }).filter((cartItem) => cartItem.amount >= 1)
        return {...state, cart: tempcart}
    }
    return state;
}

export default reducer; 