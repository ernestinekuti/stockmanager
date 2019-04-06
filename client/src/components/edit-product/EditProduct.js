import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
//import InputGroup from "../common/InputGroup;";
import { createProduct, getProductById } from "../../actions/productActions";
import isEmpty from '../../validation/is-empty';

class EditProduct extends Component {
  state = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
    company: "",
    id:"",

    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  componentDidMount() {
    console.log("loading props ", this.props);
    if (this.props.match.params.id) {
      this.props.getProductById(this.props.match.params.id);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.product.product) {
      const product = nextProps.product.product;

      product.name = !isEmpty(product.name) ? product.name : '';
      product.category = !isEmpty(product.category) ? product.category : '';
      product.price = !isEmpty(product.price) ? product.price : '';
      product.quantity = !isEmpty(product.quantity) ? product.quantity : '';
      product.image = !isEmpty(product.image) ? product.image : '';
      product.company = !isEmpty(product.company) ? product.company : '';
      product.id = !isEmpty(product.id) ? product.id : '';

      this.setState({
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        company: product.company,
        id:this.props.product.product._id
      });



    }
  }

  onSubmit = e => {
    e.preventDefault();
console.log("the id is ", this.props);
    const productData = {
      name: this.state.name,
      category: this.state.category,
      price: this.state.price,
      quantity: this.state.quantity,
      image: this.state.image,
      company: this.state.company,
   id:this.state.id
    
    };
    this.props.createProduct(productData, this.props.history);
  };



  render() {
    const { errors } = this.state;


    // select options for category

    const options = [
      { label: "* Select Product Category ", value: 0 },
      { label: "Electrical", value: "Electrical" },
      { label: " Clothes", value: " Clothes" },
      { label: "Automobile", value: "Automobile" },
      { label: " Tech ", value: " Tech " },
      { label: "Toys", value: "Toys" }
    ];

    return (
      <div className="create-product">
        <div className="container">
          <div className="addPro col-md-8 m-auto">
            <h2 className="display-4 text-center">EditProduct</h2>
            <div className="card">
              <div className="container">
                <p className="lead text-center">
                  Edit Product
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="text"
                    placeholder={this.state.name}
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                    info="Enter the Product Name"
                  />

                  <SelectListGroup
                    placeholder="Product Category"
                    name="category"
                    options={options}
                    value={this.state.category}
                    onChange={this.onChange}
                    error={errors.category}
                    info="choose the most suitable product category"
                  />
                  {/* <label class="col-md-4">Product Price</label> */}
                  <TextFieldGroup
                    type="text"
                    placeholder="Product Price"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChange}
                    error={errors.price}
                    info="Enter the Product price"
                  />
                  {/* <label class="col-md-4">Product Quantity</label> */}
                  <TextFieldGroup
                    type="text"
                    placeholder="Product Quantity"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.onChange}
                    error={errors.quantity}
                    info="Enter the Product Quantity"
                  />
                  {/* <label class="col-md-4">Product Image</label> */}
                  <TextFieldGroup
                    type="text"
                    placeholder="Product Image"
                    name="image"
                    value={this.state.image}
                    onChange={this.onChange}
                    error={errors.image}
                    info="Enter the Product image"
                  />
                  {/* <label class="col-md-4">Product Source</label> */}
                  <TextFieldGroup
                    type="text"
                    placeholder="Source Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Enter the Product Source Company"
                  />
                  <input
                    type="submit"
                    className="btn text-light btn-sub btn-block mt-6"
                    value="Save Product"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  errors: state.errors
});

export default connect(mapStateToProps, { createProduct, getProductById })(withRouter(EditProduct));
