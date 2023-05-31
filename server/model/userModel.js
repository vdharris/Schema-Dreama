//require mongoose
const mongoose = require('mongoose');


//declare Schema
const Schema = mongoose.Schema;



// declare login schema
const userSchema = new Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true},
    savedSchema: [{ 
        title: String,
        formId: {type: Schema.Types.ObjectId, ref: 'formSchema', required: false}}]
});

// create model for loginSchema

module.exports = mongoose.model('userSchema', userSchema)