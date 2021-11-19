const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages.controller');

router.get('/', async function(req, res, next){
    try{
        if(req.query.id){
            res.json(await messageController.getMessageById(req.query.id))
        }else{
            res.json(await messageController.getMessages())
        }
    }catch(err){
        console.log(`Error getting messages ${err.message}`);
        res.json(err.message)
    }
});

router.get('/conversation', async function(req, res, next){
    try{
        if(req.query.sender_id && req.query.receiver_id){
            res.json(await messageController.getConversation(req.query.sender_id, req.query.receiver_id))
        }
        else if(req.query.receiver_id){
            res.json(await messageController.getMessagesByReceiver(req.query.receiver_id))
        }else if(req.query.sender_id){
            res.json(await messageController.getMessagesBySender(req.query.sender_id))
        }
    }catch(err){
        console.log(`Error getting messages ${err.message}`);
        res.json(err.message)
    }
})

router.post('/', async function(req, res, next){
    try{
        res.json(await messageController.createMessage(req.body))
    }catch(err){
        console.log(`Error posting messages ${err.message}`);
        res.json(err.message)
    }
});

// Export router so our app can use it
module.exports = router;