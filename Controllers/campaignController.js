const router = require('express').Router();
const { models } = require('../Models');
const validateJWT = require('../Middleware/validate-session');

//make new campaign
router.post('/campaign', validateJWT, async (req, res) => {

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

//get all campaigns (no validate here)
router.get('/', async (req, res) => {
    try {
        await models.CampaignsModel.findAll()
        .then(
            campaigns => {
                res.status(200).json({
                    campaigns: campaigns
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve users: ${err}`
        });
    };
});

module.exports = router;