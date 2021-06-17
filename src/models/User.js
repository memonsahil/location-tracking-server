const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/*
UserSchema.pre (pre-save hook) - this function will run before saving a user instance.

Using the function() keyword for the second argument since the user instance is stored
in "this". Alternatively, if an arrow function is used then the value of "this" will be
set within the context of this file.
*/

userSchema.pre("save", function (next) {
  const user = this;

  // If password is modified, generate a new hash.
  if (!user.isModified("password")) {
    return next();
  }

  /*
bcrypt algorithm used for hashing the password.

Salt - randomly generated characters.
Hash - mixture of password and salt.

First argument for genSalt is the complexity of the salt.
*/

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

/*
Comparing the password (candidatePassword) that the user enters to sign in
with its previous saved instance.
*/

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

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

mongoose.model("User", userSchema);
