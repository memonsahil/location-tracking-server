const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');    //Importing the User model.

//Route handler for authentication requests.
const router = express.Router();

//Signup request
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    /*
    Creating a new user instance by 
    passing in the email and password
    to the User model.
    */

    try {
        
    const user = new User({ email, password });
    await user.save();
    //Save the user through an asynchronous operation.

    /*
    jwt creates a token that is used for
    authentication and for any follow-up requests.
    */
   
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token: token });

    } catch (err) {

    /*
    Code 422 means that the data (email, password)
    passed to create a new user appears to be invalid,
    i.e. a user with that data already exists or no data
    is provided. Also send the relavant error message.
    */

    return res.status(422).send(err.message);

    }
});

//Signin request
router.post('/Signin', async (req, res) => {
    const { email, password } = req.body;

    //Opaque error messages for secracy.
    if (!email || !password) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email'});
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY'); //Updating the token.
        res.send ({ token: token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
 
});

module.exports = router;