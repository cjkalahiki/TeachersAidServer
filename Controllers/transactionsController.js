const router = require('express').Router();
const { models } = require('../Models');

//make new transaction
router.post('/transaction', /* validateJWT, */ async (req, res) => {
    const {amount} = req.body.transaction;
    
    // try {
    //     await models.TransactionsModel.create({
    //         amount: amount,
    //         // campaignId: req.campaign.id ,
    //         userId: req.user.id
    //     })
    // }
    //this is the develop branch that I will
});

// get all transactions by a specific user
router.get('/', async (req, res) => {
    
});

module.exports = router;