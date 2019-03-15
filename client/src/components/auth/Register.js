import React, { Component } from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
 import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../actions/authActions';

 class Register extends Component {
    state = {
             name: '',
             email: '',
             password: '',
             password2:'',
             errors: {}
         };
        
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

     onChange = (e) => {
         this.setState({[e.target.name]: e.target.value });
     
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
/* 
    axios.post('/api/users/register', newUser)
    .then(res => console.log(res.data))
    .catch(err => this.setState({errors: err.response.data})); */

    this.props.registerUser(newUser, this.props.history);
    }

  render() {
     const {errors} = this.state;
    return (
        <div className="register">

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="card">
                                    <div className="card-body">
                                        <h1 className="display-4 text-center">Sign Up</h1>
                                            <p className="lead text-center">Create your Stockerly account</p>
                                                <form onSubmit={this.onSubmit}>
                                                    <div className="form-group">
                                                <label  className="font-weight-bold"> Full Name</label>
                                                    <TextFieldGroup 
                                                    type="Name" 
                                                    placeholder="Name"
                                                    name="name"
                                                    value={this.state.name} 
                                                    onChange={this.onChange}
                                                    error={errors.name}
                                                    />
                                                  
                                                    </div>
                                                    <div className="form-group">
                                                            <label  className="font-weight-bold"> Email</label>
                                                        <TextFieldGroup
                                                         type="email" 
                                                         name="email" placeholder="Email Address"
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                        error={errors.email}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                    <label  className="font-weight-bold"> Password</label>
                                                    <TextFieldGroup 
                                                    type="password" 
                                                     placeholder="Password"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                    error={errors.password}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <label className="font-weight-bold"> Confirm Password</label>
                                                    <TextFieldGroup
                                    placeholder=" Confirm Password"
                                    name="password2"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                                    </div>
                                                    <input type="submit" className="btn btn-sub btn-block mt-4" />
                                                
                                                
                                                    <div className="space text-center"> or login if you already have an account</div>
                                                </form>
                                    </div>
                            
                             </div>
                        </div>
                    </div>
                   
                </div>
        </div>
    )
  }
}
 Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}; 

 const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
}); 

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
