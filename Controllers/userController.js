const router = require('express').Router();
const { models } = require('../Models');
const {UniqueConstraintError} = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//New User (donor or teacher)
router.post('/register', async(req, res) => {
    const {role, firstName, lastName, username, email, password} = req.body.user;
    try {
        await models.UserModel.create({
            role: role,
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })
        .then(
            user => {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.status(201).json({
                    user: user,
                    message: 'user created',
                    sessionToken: `Bearer ${token}`
                });
            }
        )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            });
        } else {
            res.status(500).json({
                message: `Failed to register user: ${err}`
            });
        };
    };
});

// Login User (one endpoint for both)
router.post('/login', async (req, res) => {
    const {username, password} = req.body.user;

    try {
        await models.UserModel.findOne({
            where: {
                username: username
            }
        })
        .then(
            user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                            res.json({
                                user: user,
                                message: 'logged in',
                                sessionToken: `Bearer ${token}`
                            })
                        } else {
                            res.status(502).send({
                                error: 'bad getaway'
                            })
                        }
                    })
                } else {
                    res.status(500).send({
                        error: 'failed to authenticate'
                    })
                }
            }
        )
    } catch (err) {
        res.status(501).send({
            error: 'server does not support this functionality'
        })
    }
})

module.exports = router;