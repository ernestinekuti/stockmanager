import { PRODUCT_LOADING, GET_PRODUCT, GET_PRODUCTS, CLEAR_PRODUCTS, PRODUCT_NOT_FOUND } from '../actions/types';


const initialState = {
    product: null,
    products: null,
    loading: false

};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }   
             case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }

        
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: null
            }

        default:
            return state;
    }
}