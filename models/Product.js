const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ProductSchema = new Schema({
user:{
    type: Schema.Types.ObjectId,
    ref:'users'
    }, 
  
    name: {
        type: String,
        required:true
    },
category: {
    type: String,
    required : true
},
price: {
    type: String,
    required: true
}, 
quantity : {
    type: Number,
    required: true
},
image: {type: String,
required: true},

company: {type: String,
required: true},

createdDate: {
    type: Date,
    default: Date.now
}


});

module.exports = Product = mongoose.model('product', ProductSchema);