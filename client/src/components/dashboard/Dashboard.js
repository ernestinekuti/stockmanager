import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProducts, deleteAccount, getProductByName } from "../../actions/productActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import InputGroup from "../common/InputGroup";
import { withRouter } from "react-router-dom";
import ProductActions from "./ProductActions";
import Products from '../products/Products'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      product: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

 
  componentDidMount() {
    this.props.getUserProducts();
    console.log(" in here", this.props);
  
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const search =  this.state.search;
    console.log("search is " , search);
    this.props.getProductByName(search);
   
    console.log("search is 2 " , this.props);
   // console.log("waht the hell" , this.props.getProductByName(search) );
   // this.props.history.push('/view-product/');
   
  }
  render() {
    // const { user } = this.props.auth;
    const { products, loading, product} = this.props.products;
    console.log("this is the product", product);
    const { errors } = this.state;

    let dashboardContent;

    if (products === null || loading) {
      dashboardContent = <Spinner />;
    } 
    else if(product !== null ) {
      console.log("this is the product", product);
    }else {
      // Check if user has product data
      if (Object.keys(products).length > 0) {
        dashboardContent = <Products />;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted" />
            <p>
              You do not have any products at the moments. Please add Products
            </p>
          </div>
        );
      }
    }
    return (
      /*    <div className="dashboard">
        <div className="container">
        <div className="row">
        <div className="col-md-12">
        <div className="display-4">
        <h1>Dashboard</h1>
        {dashboardContent}
        </div></div></div></div>
      </div> */
      <div className="addPro col-md-10 m-auto ">
        <div className="container text-center">
          <form className="search" onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="col-9">
                <InputGroup
                  type="text"
                  name="search"
                  placeholder="Search Products By Product name"
                  value={this.state.search}
                  onChange={this.onChange}
                  error={errors.search}
                />{" "}
              </div>
              <div className="new-btn col-3">
                <input
                  type="submit"
                  className="btn btn-sub text-light btn-block "
                  value="Find Product"
                />
              </div>
            </div>
          </form>
          <ProductActions />
          <div className="col text-center">
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div></div>
        {dashboardContent}

      </div>
    );
  }
}

Dashboard.propTypes = {
  getUserProducts: PropTypes.func.isRequired,
  getProductByName: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.product,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getUserProducts, deleteAccount, getProductByName}
)(Dashboard);
