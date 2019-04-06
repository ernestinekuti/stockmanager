import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearProducts } from './actions/productActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import PrivateRoute from './components/common/PrivateRoute'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import CreateProduct from './components/create-product/CreateProduct'
import EditProduct from './components/edit-product/EditProduct'
import ViewProduct from './components/view_Product/ViewProduct'
import Products from './components/products/Products'

import './App.css'

// Check for token

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // decode token and get details
  const decoded = jwt_decode(localStorage.jwtToken)

  // set user is authenticated

  store.dispatch(setCurrentUser(decoded))
  // check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser())

    // Clear current products
    store.dispatch(clearProducts())
    // Redirect to login

    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='div'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-product'
                  component={CreateProduct}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-product/:id'
                  component={EditProduct}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/view-product/:id'
                  component={ViewProduct}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/products' component={Products} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
