const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load product model
const Product = require('../../models/Product');

// Load User model
const User = require('../../models/User');

// validation

const validateProductInput = require('../../validation/products');

//@route  Get api/product/test
//@desc   Test profile route
//@access Public

router.get('/test', (req, res) => res.json({msg: 'Product Works'}));


//@route  Get api/product
//@desc   
//@access Private

//@route POST api/products
//@descr CREATE post route
//@access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newProduct = new Product({
        
        name: req.body.name,
        category: req.body.category,
        user: req.user.id,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image,
        company: req.body.company
    });
    newProduct.save().then(product => res.json(product));

});


// get all products
//@route GET api/products
//@descr GET product route
//@access PUBLIC

router.get('/', (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then(products => res.json(products))
        .catch(err => res.status(404).json({ noproductsfound: 'No posts found ' }));
});

// get one post
//@route GET api/products/:id
//@descr GET products route
//@access PUBLIC

router.get('/:id', (req, res) => {
    Product.findById(req.params.id)

        .then(product => res.json(product))
        .catch(err => res.status(404).json({ noproductfound: 'No product found with that ID' }));
});

//@route Delete api/products/:id
//@descr Delete post route
//@access Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   console.log('in here');
            Product.findById(req.params.id)
                .then(product => {
                    if (product.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized' })

                    }
                    product.remove().then(() => res.json({ success: ' Product removed Success' }))
                        .catch(err => res.status(404).json({ productnotfound: 'No product found' }));
                })
       
}
);

module.exports = router;