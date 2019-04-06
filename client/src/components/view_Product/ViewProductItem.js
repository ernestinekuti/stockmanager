import React, { Component } from 'react'


import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class ViewProductItem extends Component {


  render() {
    const { product } = this.props;

    return (
      <div className="create-product">
        <div className="container">
          <div className="addPro col-md-12 m-auto">
            <h2 className="display-4 text-center">View Product</h2>
            <div className="card">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <Link to="/dashboard" className="btn btn-sub text-light float-left">
                      Back To Dashboard
              </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">

                    <div className="col-3 font-weight-bold ">Product Name:</div>
                    <div className="col-5 ">{product.name}</div>
                  </div>
                  <div className="row">

                    <div className="col-3 font-weight-bold ">Product Category</div>
                    <div className="col-5 ">{product.category}</div>
                  </div>
                  <div className="row">

                    <div className="col-3 font-weight-bold ">Product Price</div>
                    <div className="col-5">£{product.price}</div>
                  </div>
                  <div className="row">

                    <div className="col-3 font-weight-bold ">Product Quantity</div>
                    <div className="col-5">{product.quantity}</div>
                  </div>
                  <div className="row">

                    <div className="col-3 font-weight-bold ">Product Image</div>
                    <div className="col-5 ">{product.image}</div>
                  </div>
                  <div className="row">

                    <div className="col-3 font-weight-bold ">Source Company</div>
                    <div className="col-5 ">{product.company}</div>
                  </div>

                  <div className="row">

                    <div className="col-3 font-weight-bold ">Date Added</div>
                    <div className="col-5 "><Moment format="MM-DD-YYYY">{product.createdDate}</Moment></div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    )
  }
}

ViewProductItem.propTypes = {
  product: PropTypes.object.isRequired
}
export default ViewProductItem;