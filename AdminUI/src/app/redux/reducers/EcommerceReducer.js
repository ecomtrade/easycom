import {
    GET_PRODUCT_LIST,
    GET_CART_LIST,
    GET_BRAND_LIST,
} from '../actions/EcommerceActions'

const initialState = {
    productList: [],
    brandList: [],
    cartList: [],
}

const EcommerceReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST: {
            return {
                ...state,
                productList: [...action.payload],
            }
        }
        case GET_BRAND_LIST: {
            return {
                ...state,
                brandList: [...action.payload],
            }
        }
        case GET_CART_LIST: {
            return {
                ...state,
                cartList: [...action.payload],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default EcommerceReducer
