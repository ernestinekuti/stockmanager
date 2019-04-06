import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProductById,  deleteProduct } from '../../actions/productActions'
import Spinner from '../common/Spinner';
import ProductActions from '../dashboard/ProductActions';
import ViewProductItem from './ViewProductItem'
import { Link } from 'react-router-dom';

class ViewProduct extends Component {

    componentDidMount() {
       

      console.log("in props", this.props)

        if (this.props.match.params.id) {
            this.props.getProductById(this.props.match.params.id);
          
            

        }
    }
    onDeleteClick(e) {
        console.log("in view", this.props.match.params.id);
       this.props.deleteProduct(this.props.match.params.id, this.props.history.push('/dashboard'));
      }

    render() {
        const { product, loading } = this.props.product;

        let productContent;

        if (product === null || loading) {
            productContent = <Spinner />;
        } else {
            productContent = <ViewProductItem product={product} />
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{productContent}</div>
                    </div>
                    <div className="chartis col-8 row mt-6">
                    <div className="col-4 ">
                      <div className="ct-chart-area ct-golden-section">
                        <Link
                          to={`/edit-product/${productContent.id}`}
                          className="btn text-light btn-sub "
                        >
                          Edit Product
            </Link>
                      </div>
                    </div>
                    <div className="col-4 ">
                    <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete Product
            </button>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

ProductActions.propTypes = {
    getProductById: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    product: state.product

});



export default connect(mapStateToProps, { getProductById, deleteProduct })(ViewProduct);
