WELCOME TO TEACHERS' AID SERVER!

Authorization:
There are two types of users: donors and teachers. Teachers act as admins, creating new campaigns to raise money that they can also update, read, and delete. 
Donors can create new transactions for campaigns (also updating, deleting, and reading these transactions). Donors do not have access to creating, reading,
updating, or deleting campaigns. Teachers cannot do the same for transactions. 

--> SessionToken
  • a SessionToken is created when registering/logging into an account. This token lasts for 24 hours and enables access to a specific user (and specific 
    role's) and their permissions. 
--> Additional Middleware
  • Headers ensures that the proper headers on pre-flight and regular request are present. If not, authorization is not granted.
  • Roles.js is where we define RBAC.
  • Index controls all middleware files

Models:
--> UserModel
  • unique IDs created with UUID
  • role is an Enum set to either donor or teacher
  • firstName string
  • lastName string
  • username string
  • email string
  • passsword string that gets hashed in UserController
--> CampaignsModel
  • unique IDs that is an integer value
  • title string
  • description string
  • endDate string
  • amount integer
--> TransactionsModel
  • unique ID
  • amount integer
  
Data Associations:
The User has many Campaigns, Campaigns belongsTo User, Campaign has many transactions, Transactions belongsTo Campaign

Controllers:
--> UserController
  • users have the ability to create a new account as either a donor or a teacher. 
  • they have the ability to log into an existing an account using a username and password.
--> TransactionsController
  • donors can create, delete, update, and read their transactions.
  • teachers do not have access to this functionality
--> CampaignsController
  • teachers can create, delete, update, and read their transactions
  • campaigns can be read without signing in
  • /allCampaigns endpoint is for client-side's search bar
