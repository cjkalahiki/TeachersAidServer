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
router.get('/', validateJWT, async (req, res) => {
    const id = req.user.id;

    try {
        const donorTransactions = await models.TransactionsModel.findAll({
            where: {
                userId: id
            }
        })
        res.status(200).json(donorTransactions);
    } catch (err) {
        res.status(500).json({error: err})
    }
});

//get transaction by id; for diving deeper into the info of a transaction, displaying one transaction 
router.get('/:id', async (req,res) => {
    const transactionId = req.params.id;

    try {
        const query = await models.TransactionsModel.findOne({
            where: {
                id: transactionId
            }
        });
        if (!query){
            res.status(400).json({
                message: 'Transaction does not exist'
            })
        } else {
            res.status(200).json({
                message: 'Transaction successfully retrieved.',
                transaction: query
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

//update by transaction id
router.put('/:id', validateJWT, async (req, res) => {
    const {amount} = req.body.transaction;
    const transactionId = req.params.id;
    const donorId = req.user.id;

    const query = {
        where: {
            id: transactionId,
            userId: donorId
        }
    }

    const updatedTransaction = {
        amount: amount
    }

    try {
        await models.TransactionsModel.update(updatedTransaction, query);
        res.status(200).json({
            message: 'Transaction successfully updated'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

//delete transaction
router.delete('/:id', validateJWT, async (req, res) => {
    const donorId = req.user.id;
    const transactionId = req.params.id;

    try {
        const query = {
            where: {
                id: transactionId,
                userId: donorId
            }
        };

        const deleteQuery = await models.TransactionsModel.destroy(query);

        if (deleteQuery) {
            res.status(200).json({
                message: 'Transaction removed.'
            })
        } else {
            res.status(400).json({
                message: 'Error, transaction does not exist.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

module.exports = router;