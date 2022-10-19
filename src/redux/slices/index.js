import { createSlice } from '@reduxjs/toolkit'


import data_c from '../../data/categories.json'
import data_p from '../../data/products.json'

const localStorageCart = window.localStorage.getItem('cart')
const cart = JSON.parse(localStorageCart)

const initialState = {
    categories: data_c.categories,
    products: data_p.products,
    cart: cart,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addCart: (state, actions) => {
            console.log(actions.type)
            const { id, quantity, price } = actions.payload
            actions.payload.price = price * quantity;
            const foundInCart = state.cart.find(product => product.id === id)

            if (foundInCart) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === id ? {
                            ...item, quantity: Number(item.quantity) + Number(quantity),
                            price: price * (Number(item.quantity) + Number(quantity))
                        } : item),
                    products: state.products.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity - actions.payload.quantity } : item)
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, actions.payload],
                    products: state.products.map((item) =>
                        item.id === id ? { ...item, quantity: Number(item.quantity) - Number(actions.payload.quantity) } : item)
                }
            }
        },

        deletItemCart: (state, actions) => {
            const { id } = actions.payload
            const copyCart = [...state.cart]
            const foundInCart = copyCart.find(product => product.id === id)
            if (foundInCart) {
                const filterCart = copyCart.filter((element) => element.id !== foundInCart.id)
                return {
                    ...state,
                    cart: [...filterCart],
                    products: state.products.map((item) =>
                        item.id === foundInCart.id ? { ...item, quantity: Number(item.quantity) + Number(foundInCart.quantity) } : item)
                }
            }
        },

        decrementQuantity: (state, actions) => {
            const { id } = actions.payload
            const foundInCart = state.cart.find(product => product.id === id)
            if (foundInCart) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === id ? {
                            ...item, quantity: Number(item.quantity) - 1,
                            price: ((item.price * (item.quantity - 1)) / foundInCart.quantity)
                        } : item),
                    products: state.products.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
                }
            }
        },
        incrementQuantity: (state, actions) => {
            const { id } = actions.payload
            const foundInCart = state.cart.find(product => product.id === id)

            if (foundInCart) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === id ? {
                            ...item, quantity: Number(item.quantity) + 1,
                            price: ((item.price * (item.quantity + 1)) / foundInCart.quantity)
                        } : item),
                    products: state.products.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                }
            }
        },
        filterByNameCartegories: (state, actions) => {
            console.log(actions.payload)
        },
        orderByPrice: (state, actions) => {
            const regex = /[$,]/g;
            const filterPrice = actions.payload === "Mayor Precio" ?
                state.products.sort(function (a, b) {
                    a = a.price.replace(regex, "")
                    b = b.price.replace(regex, "")
                    if (Number(a) > Number(b)) return -1
                    if (Number(a) < Number(b)) return 1
                    else return 0
                }) :
                state.products.sort(function (a, b) {
                    a = a.price.replace(regex, "")
                    b = b.price.replace(regex, "")
                    if (Number(a) < Number(b)) return -1
                    if (Number(a) > Number(b)) return 1
                    else return 0
                })
            state.products = [...filterPrice]
        },
        orderByQuantity: (state, actions) => {

            const filterQuantity = actions.payload === "Mayor Cantidad" ?
                state.products.sort(function (a, b) {
                    if (a.quantity < b.quantity) return 1
                    if (a.quantity > b.quantity) return -1
                    else return 0
                }) : state.products.sort(function (a, b) {
                    if (a.quantity < b.quantity) return -1
                    if (a.quantity > b.quantity) return 1
                    else return 0
                })
            state.products = [...filterQuantity]
        },
        orderByAvailability: (state, actions) => {

            const filterAvailability = actions.payload === "Disponible" ?
                state.products.sort(function (a, b) {
                    if (a.available === true) return -1
                    else if (b.available === true) return 1
                    else return 0
                }) : state.products.sort(function (a, b) {
                    if (a.available === true) return 1
                    else if (b.available === true) return -1
                    else return 0
                })
            state.products = [...filterAvailability]
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    addCart, deletItemCart,
    decrementQuantity, incrementQuantity,
    orderByPrice,
    orderByQuantity,
    orderByAvailability,
    filterByNameCartegories,
} = productsSlice.actions

export default productsSlice.reducer