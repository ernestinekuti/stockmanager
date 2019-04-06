import axios from 'axios'

import {
  PRODUCT_LOADING,
  GET_PRODUCT,
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_CURRENT_PRODUCT
} from './types'
// import AddExperience from '../components/add-credentaials/AddExperience';

// get current product
export const getUserProducts = () => dispatch => {
  dispatch(setProductLoading())
  axios
    .get('api/products')
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: {}
      })
    )
}

// get By Id

export const getProductById = id => dispatch => {
  console.log(" get action" ,id); 
  dispatch(setProductLoading());
  axios
    .get(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      }));
};

// get by Product Name



export const getProductByName = name => dispatch => {
  console.log(" get Name action" ,name); 
  dispatch(setProductLoading());
  console.log(" loading " ,name); 
  axios
    .get(`/api/products/product/${name}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      }));
};

// get current product
export const getCurrentProduct = () => dispatch => {
  dispatch(setProductLoading())
  axios
    .get('api/products')
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: {}
      })
    )
}
// Create profile

export const createProduct = (productData, history) => dispatch => {
  axios
    .post('/api/products', productData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete Account & Profile

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone')) {
    axios
      .delete('/api/products')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

// Delete Product

export const deleteProduct = id => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone')) { 
   axios
  .delete(`/api/products/${id}`)
      .then(res =>
       dispatch({
          type: SET_CURRENT_PRODUCT,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

// Get all Products for user
// get current product
export const getProducts = () => dispatch => {
  dispatch(setProductLoading())
  axios
    .get('api/products')
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: null
      })
    );
};

// Profile loading
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  }
}

// Clear profile

export const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS
  }
}
