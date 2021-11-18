const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages.controller');
const contactsController = require('../controllers/contacts.controller.js');
const faker = require('faker');



/**
 * Seed some contacts
 */
// for(let i =0; i < 4; i++){
//     var randomUsername = faker.internet.userName(); 
//     var randomEmail = faker.internet.email();

//     let contact = {
//         username: randomUsername,
//         email: randomEmail
//     };

//     contactsController.createContact(contact)
// }

/**
 * Seed some messages
 */

for(let i =0; i < 20; i++){
    var contact_id_min = 1;
    var contact_id_max = 4;

    var randomSentence = faker.lorem.sentence(6, 2);


    let msg = {
        content: randomSentence,
        sender_id : faker.datatype.number(10),
        receiver_id : faker.datatype.number(8, 14)
    }

    messageController.createMessage(msg).then(() => {
        console.log('new message inserted');
    });

}

