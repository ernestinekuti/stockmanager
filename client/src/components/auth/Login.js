import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

 class Login extends Component {
    state = {
       
        email: '',
        password: '',
        errors: {}
    };
   


onChange = (e) => {
    this.setState({[e.target.name]: e.target.value });

}

componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

onSubmit = (e) => {
   e.preventDefault();
   
   const userData = {
     
       email: this.state.email,
       password: this.state.password
   }

   this.props.loginUser(userData)
}
  render() {
    const { errors } = this.state;
    return (


        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <div className="card">
                        <div className="card-body">
                    <h1 className="display-4 text-center">Login</h1>
                    <p className="lead text-center">Login to  your Stockerly account</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label  className="font-weight-bold"> Email</label>
                            <TextFieldGroup 
                            type="email"
                            placeholder="Email Address"
                            name="email"
                             value={this.state.email} 
                             onChange={this.onChange}
                             error={errors.email}/>
                          </div>
                        <div className="form-group">
                        <label  className="font-weight-bold"> Password</label>
                          <TextFieldGroup type="password"
                          name="password"
                           placeholder="Password"
                           value={this.state.password} 
                           onChange={this.onChange}
                           error={errors.email}/>
                        </div>
                      
                    
                       
                        <input type="submit" className="btn btn-sub btn-block mt-4" />
                      </form>
                </div>
                </div>
                </div>
            </div>
        </div>
  
)
  }
  
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps,{loginUser})(Login);