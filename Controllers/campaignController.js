const router = require('express').Router();
const { models } = require('../Models');

router.post('/campaign', async (req, res) => {

    const {title, description, endDate, amount} = req.body.campaign;

    try {
        await models.CampaignsModel.create({
            title: title,
            description: description,
            endDate: endDate,
            amount: amount,
            userId: req.user.id
        })
        .then(
            campaign => {
                res.status(201).json({
                    campaign: campaign,
                    message: 'campaign successfully created'
                })
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create campaign: ${err}`
        });
    };
});

module.exports = router;