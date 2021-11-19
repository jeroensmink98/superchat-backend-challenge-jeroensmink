const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts.controller');


router.get('/', async function(req, res, next){
    try{
        if(req.query.username){
            /**
             * @returns a contact based on the ?username paramater
             */
            res.json(await contactsController.getContactByUsername(req.query.username))
        }else if(req.query.id){
            /**
             * @returns a single contact based on the ?id parameter
             */
            res.json(await contactsController.getContact(req.query.id));
        }else{
            /**
             * @returns all contacts in the database
             */
            res.json(await contactsController.getContacts() );
        }
    }
    catch(err)
    {
        console.log(`Error getting contacts ${err.message}`);
        res.json(err.message)
    }
});


router.post('/', async function(req, res, next){
    try{
        res.json(await contactsController.createContact(req.body))
    }catch(err){
        console.log(`Error posting contacts ${err.message}`);
        res.json(err.message)
    }
})

// Export router so our app can use it
module.exports = router;