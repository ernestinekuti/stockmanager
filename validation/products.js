const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data){
    let errors ={};
    data.name  = !isEmpty(data.name) ? data.name: '';
    data.category  = !isEmpty(data.category) ? data.category: '';
    data.price  = !isEmpty(data.price) ? data.price: '';
    data.quantity  = !isEmpty(data.quantity) ? data.quantity: '';
    data.company  = !isEmpty(data.company) ? data.company: '';
    

    if(!Validator.isLength(data.name, {min:2, max:2000})){
        errors.name = 'Product Name must be greater than 2 character';
    }
    if(Validator.isEmpty(data.name)){
        errors.name = 'Product Name is required';
    }

    if(Validator.isEmpty(data.category)){
        errors.category = 'Product Category is required';
    }

    if(Validator.isEmpty(data.price)){
        errors.price = 'Price is required';
    }

    if(Validator.isEmpty(data.price)){
        errors.price= 'Price is required';
    }

    if(Validator.isEmpty(data.company)){
        errors.company = 'Company is required';
    }


    if(Validator.isEmpty(data.quantity)){
        errors.quantity = 'Product Quantity is required';
    } 




    return {
        errors, 
        isValid: isEmpty(errors)
    }
}