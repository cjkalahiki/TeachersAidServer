const router = require('express').Router();
const { models } = require('../Models');
const validateJWT = require('../Middleware/validate-session');

//make new transaction
router.post('/transaction', validateJWT, async (req, res) => {
    const {amount, campaignId} = req.body.transaction;

    try {
        await models.TransactionsModel.create({
            amount: amount,
            campaignId: campaignId,
            userId: req.user.id
        })
        .then(
            transaction => {
                res.status(201).json({
                    transaction: transaction,
                    message: 'transaction successfully created'
                })
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to make transaction: ${err}`
        })
    }
    
});

// get all transactions by a specific user
router.get('/', async (req, res) => {
    
});

module.exports = router;