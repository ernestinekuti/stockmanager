const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load product model
const Product = require("../../models/Product");

// Load User model
const User = require("../../models/User");

// validation

const validateProductInput = require("../../validation/products");

//@route  Get api/product/test
//@desc   Test profile route
//@access Public

router.get("/test", (req, res) => res.json({ msg: "Product Works" }));

//@route POST api/products
//@descr CREATE post route
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.product);
    const { errors, isValid } = validateProductInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log("body",req.body.id);
    const productFields = {}
    productFields.user = req.user.id;
    if (req.body.name) productFields.name = req.body.name;
    if (req.body.category) productFields.category = req.body.category;
    if (req.body.price) productFields.price = req.body.price;
    if (req.body.quantity) productFields.quantity = req.body.quantity;
    if (req.body.image) productFields.image = req.body.image;
    if (req.body.company) productFields.company = req.body.company;
    if (req.body.id) {
      console.log("updating");
      // Update
      Product.findOneAndUpdate(
        { _id: req.body.id },
        { $set: productFields },
        { new: true } )
      .then(product => {
        console.log("in Updating", product);
        res.json(product);
      })
    } else {
      console.log("creating new");
      new Product(productFields).save().then(product => res.json(product));
    }
  });


// get all products
//@route GET api/products
//@descr GET product route
//@access PUBLIC
/* 
router.get('/', (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then(products => res.json(products))
        .catch(err => res.status(404).json({ noproductsfound: 'No posts found ' }));
}); */

//@route GET api/profile
//@descr Get current users profile route
//@access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Product.find({ user: req.user.id })
      .then(products => {
        if (!products) {
          errors.noproduct = "There are no products for this user";
          return res.status(404).json(errors);
        }
        res.json(products);
      })
      .catch(err => res.status(404).json(err));
  }
);

// get all user  products
//@route GET api/products/:id
//@descr GET products route
//@access PUBLIC

router.get(
  "/product",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  
    Product.find({ user: req.params.user_id })
      .then(products => {
        if (!products) {
          errors.noproduct = "There are no products";
          return res.status(404).json(errors);
        }

        res.json(products);
      })
      .catch(err =>
        res.status(404).json({ profile: " There are no products found" })
      );
  }
);

// get one post
//@route GET api/products/:id
//@descr GET products route
//@access PUBLIC

router.get("/:id", (req, res) => {
  Product.findById(req.params.id)

    .then(product => res.json(product))
    .catch(err =>
      res.status(404).json({ noproductfound: "No product found with that ID" })
    );
});

//@route DELETE api/products/:id
//@descr Delete product by id
//@access Private

router.delete("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("in here 2" , req.params.id);
Product.findOneAndDelete({ _id: req.params.id })
.then(() =>
      res.json({ success: true })
    )   .catch(err => res.status(404).json(err));

  }
);

//@route get api/products/:productName
//@descr getproduct by name
//@access Private

router.get("/product/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("in here 2" , req.params.name);
Product.findOne({ name: req.params.name })

.then(product => {
  console.log("this is the product", product);
   res.json(product);}

)
.catch(err =>
  res.status(404).json({ noproductfound: "No product found with that name" })
); 
}
);


//@route DELETE api/poducts
//@descr Deletes Account and Product
//@access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   
    Product.find({ user: req.user.id })
    .then(products => {
     
      products.delete ({ user: req.user.id  });
      console.log("in here6", products.length);
    }

    )
      User.findOneAndDelete({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
   
  }
);


module.exports = router;
