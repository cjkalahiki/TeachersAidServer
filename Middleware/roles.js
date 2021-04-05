const {AccessControl} = require('../node_modules/accesscontrol');

// let grantObjects = {
//     donor: {
//             transactions: {
//                 'create:own': ['*'],
//                 'read:own': ['*'],
//                 'update:own': ['*'],
//                 'delete:own': ['*']
//             }
//     },
//     teacher: {
//         campaigns: {
//             'create:own': ['*'],
//             'read:own': ['*'],
//             'update:own': ['*'],
//             'delete:own': ['*']
//         }
//     }
// }

// const ac = new AccessControl(grantObjects);

const access = new AccessControl();
access.grant('donor')
        .createOwn('transaction')
        .deleteOwn('transaction')
        .readOwn('transaction')
        .updateOwn('transaction', ['amount'])
    .grant('teacher')
        .createOwn('campaign')
        .deleteOwn('campaign')
        .readOwn('campaign')
        .updateOwn('campaign', ['description', 'endDate', 'amount'])

module.exports = access;