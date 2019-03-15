import axios from 'axios';

import { PRODUCT_LOADING, GET_PRODUCT, CLEAR_CURRENT_PRODUCT, GET_ERRORS, SET_CURRENT_USER } from './types';
//import AddExperience from '../components/add-credentaials/AddExperience';


// get current product
export const getCurrentProduct = () => dispatch => {
    dispatch(setProductLoading());
    axios.get('api/product')
        .then(res =>
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_PRODUCT,
                payload: {}
            })
        );
};
// Create profile

export const createProduct = (produtData, history) => dispatch => {
    axios
        .post('/api/product', productData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};


// Delete Account & Profile

export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone')) {
        axios
            .delete('/api/product')
            .then(res =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            ).catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }));
    };
};

// Profile loading
export const setProductLoading = () => {
    return {
        type: PRODUCT_LOADING
    };
};

//Clear profile

export const clearProduct = () => {
    return {
        type: CLEAR_CURRENT_PRODUCT
    };
};