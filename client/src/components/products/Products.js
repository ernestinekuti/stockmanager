import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Spinner from '../common/Spinner'
import { getProducts } from '../..//actions/productActions'
import ProductItem from './ProductItem'

class Products extends Component {
  /*   componentDidMount() {
      this.props.getProducts()
    } */
  render() {
    const { products, loading } = this.props.product
    let productItems

    if (products === null || loading) {
      productItems = <Spinner />
    } else {
      if (products.length > 0) {
        productItems = products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))
      } else {
        productItems = <h4>No Products found.......</h4>
      }
    }
    return (
      <div className='products'>

        <div className='row'>

          <div className="card card-body bg-light mb-3 mt-4">
            <h1 className='display-4 text-center'>List of Products</h1>
            <p className='lead text-center'>View and Edit Products</p>

            <div className="row">
              <div className="col-2 text-center font-weight-bold">Product Name</div>
              <div className="col-2 text-center font-weight-bold">Category</div>
              <div className="col text-center font-weight-bold">Price</div>
              <div className="col text-center font-weight-bold">Quantity</div>
              <div className="col text-center font-weight-bold">Image</div>
              <div className="col-2 text-center font-weight-bold">Source </div>
              <div className="col-2 text-center font-weight-bold">Date</div>
              <div className="col text-center font-weight-bold">button</div>

            </div>
            {productItems}
          </div>

        </div>
      </div >
    )
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  product: state.product
})
export default connect(
  mapStateToProps,
  { getProducts }
)(Products)
