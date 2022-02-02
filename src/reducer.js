const reducer = (state, action) => {

    //type we a searching for, and it equals, 
    // we have state, be careful what we return
    if(action.type === 'CLEAR_CART'){
        return {...state,cart: [] }  //returning the oldstate sprreading, only the clearCart we wanna change to a empty array
    }
    if(action.type === 'REMOVE_ITEM'){
        return {...state, 
            cart: state.cart.filter((item) => item.id !== action.payload
             )} // we filter, if it dosent match 
    } 
    if(action.type === 'INCREASE') {
        //iterate through the cart before update, we map
        //if cartItem.id matches the id i pass in then we increae
        let tempCart = state.cart.map((cartItem) => {
            if(cartItem.id === action.payload) {
                //we return a object, old cart, then we update the new amount 
                return {...cartItem, amount: cartItem.amount++}
            }
            return cartItem;
        })
        return {...state, cart: tempCart}
    } 
    if(action.type === 'DECREASE') {

        let tempCart = state.cart.map((cartItem) => {
            if(cartItem.id === action.payload) {
                //we return a object, old cart, then we update the new amount 
                return {...cartItem, amount: cartItem.amount--}
            }
            return cartItem;
        }).filter((cartItem) => cartItem.amount !== 0) //if it's below zero the item disepears
        return {...state, cart: tempCart}

    }
    // we have total && amount
    if(action.type === 'GET_TOTALS') {

        //reduce, who returns object,
        //right away destructure
        //cartItem reprexent each item we iterate over
        // cartTotal is what we are returning
        let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
            //we looking for the price and amount from data(API)

            const {price, amount} = cartItem;
            const itemTotal = price * amount; 
            console.log(price, amount);
            //every time we iterate over, we want to add to amount
            cartTotal.amount += amount; //added value from each item
            cartTotal.total += itemTotal;
            return cartTotal

        }, {
            total: 0,
            amount: 0,
        })
        total = parseFloat(total.toFixed(2))

        return{...state, total, amount}
    }

    if(action.type === 'LOADING') {
        return{...state, loading: true, loading: false}
    }
    if(action.type === 'DISPLAY_ITEMS') {
        //our cart is set and were we fetch from api
        return {...state, cart: action.payload}
    }

    return state
}

export default reducer; 