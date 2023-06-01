//require mongoose
const mongoose = require('mongoose');


//declare Schema
const Schema = mongoose.Schema;

//require bcrypt items
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// declare login schema
const userSchema = new Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true},
    savedSchema: [
        {type: Schema.Types.ObjectId, ref: 'formSchema'}
    ],
    // savedSchema: [{ 
    //     title: String,
    //     formId: {type: Schema.Types.ObjectId, ref: 'formSchema', required: false}}]
});

// create model for loginSchema

//bcrypt the password before saving to database
userSchema.pre('save', async function (next) {
    console.log('password before bcrypt:',this.password);
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    console.log('password after brcrypt in middleware:', this.password);
    return next();
})

module.exports = mongoose.model('userSchema', userSchema)