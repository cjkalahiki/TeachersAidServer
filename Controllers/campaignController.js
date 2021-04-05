const router = require('express').Router();
const { models } = require('../Models');
const validateJWT = require('../Middleware/validate-session');
const access = require('../Middleware/roles');

//make new campaign
router.post('/campaign', validateJWT, async (req, res) => {

    const permission = access.can(req.user.role).createOwn('campaign');

    if (permission.granted) {
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
    } else {
        res.status(403).json({
            message: 'Permission not granted'
        })
    }


});

//get all campaigns (no validate here)
router.get('/allCampaigns', async (req, res) => {
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

//get campaign by userID
router.get('/', validateJWT, async (req,res) => {
    const id = req.user.id;
    
    try {
        const teacherCampaigns = await models.CampaignsModel.findAll({
            where: {
                userId: id
            }
        })
        res.status(200).json(teacherCampaigns);
    } catch (err) {
        res.status(500).json({error: err})
    }
})

//get campaign by ID
//this will be the fetch that occurs during search after user clicks on specific campaign
router.get('/:id', async(req,res) => {
    const campaignId = req.params.id;

    try {
       const query = await models.CampaignsModel.findOne({
           where: {
               id: campaignId
           }
       });
       if (!query){
            res.status(400).json({
                message: 'Campaign does not exist.'
            });
       } else {
           res.status(200).json({
               message: 'Campaign successfully found',
               campaign: query
           });
       }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    };
});

//update campaign by campaign ID
router.put('/:id', validateJWT, async (req, res) => {
    const {description, endDate, amount} = req.body.campaign;
    const teacherId = req.user.id;
    const campaignId = req.params.id;

    const query = {
        where: {
            id: campaignId,
            userId: teacherId
        }
    }

    const updatedCampaign = {
        description: description,
        endDate: endDate,
        amount: amount
    }

    try {
        await models.CampaignsModel.update(updatedCampaign, query);
        res.status(200).json({
            message: `Campaign successfully updated.`
        });
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

//delete by id
router.delete('/:id', validateJWT, async (req, res) => {
    const teacherId = req.user.id;
    const campaignId = req.params.id;

    try {
        const query = {
            where: {
                id: campaignId,
                userId: teacherId
            }
        };

        await models.CampaignsModel.destroy(query);
        res.status(200).json({
            message: 'Campaign removed.'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        })
    };
});

module.exports = router;