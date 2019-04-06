import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
//import InputGroup from "../common/InputGroup;";
import { createProduct } from "../../actions/productActions";

class CreateProduct extends Component {
  state = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
    company: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const productData = {
      name: this.state.name,
      category: this.state.category,
      price: this.state.price,
      quantity: this.state.quantity,
      image: this.state.image,
      company: this.state.company
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
            <h2 className="display-4 text-center">Add Product</h2>
            <div className="card">
              <div className="container">
                <p className="lead text-center">
                  Create a new product with as much information as possible
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="text"
                    placeholder="Product Name"
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
                    value="Add Product"
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
CreateProduct.propTypes = {
  product: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProduct }
)(withRouter(CreateProduct));
