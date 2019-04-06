import React, { Component } from 'react'

import { PropTypes } from 'prop-types'
import Moment from 'react-moment';

import { Link } from 'react-router-dom'



class ProductItem extends Component {

    render() {
        const { product } = this.props;

        return (

            <div className="row border-top">
                <div className="col-2 text-center">{product.name}</div>
                <div className="col-2 text-center">{product.category}</div>
                <div className="col text-center">{product.price}</div>
                <div className="col text-center">{product.quantity}</div>
                <div className="col text-center">{product.image}</div>
                <div className="col-2 text-center">{product.company} </div>
                <div className="col-2 text-center"><Moment format="MM-DD-YYYY">{product.createdDate}</Moment> </div>
                <Link

                    to={`/view-product/${product._id}`}
                    className="btn"
                >
                    View Product
          </Link>
            </div>

        )
    }
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductItem;