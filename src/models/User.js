const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Data associated with a user.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,   //To only accept unique email addresses.
        required: true  //email is required.
    },
    password: {
        type: String,
        required: true  //password is required.
    }
});

/*
Pre-save hook - this function will
run before saving a user instance.

Using the function() keyword since
since the user instance is stored in 'this'.

If an arrow function is used then the value
of 'this' will be set within the context of
this file.
*/

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    };
    
    /*
    bcrypt algorithm used for hashing the password.

    Salt - randomly generated characters.
    Hash - mixture of the password and salt.
    
    First argument for genSalt is the 
    complexity of the salt.
    */

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;   //Assigning the hash to the password.
            next(); //Saving the user.
        })
    });

});

/*
Comparing the password (candidatePassword)
when the user logs in with the one within
the previous saved instance.
*/

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;

    //resolve === boolean
    //reject === boolean
    return new Promise((resolve, reject) => {

        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });
};

/*
Creates a model for that associated data (userSchema)
and links it to the relavant mongoDB collection.
*/

mongoose.model('User', userSchema);
