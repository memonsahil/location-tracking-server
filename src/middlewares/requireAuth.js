const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

//jwt middleware for verifying the authentication.
requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    //authorization = "Bearer token_created"

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }

    const token = authorization.replace('Bearer ', '');
    
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }

        const { userId } = payload;

        const user = await User.findById( userId );
        req.user = user; //Assign that user instance to req for any other request handlers further.
        next()  //Go to the next middleware or proceed.
    });
};

module.exports = requireAuth;